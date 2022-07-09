import styles from "../components/scss/Index.module.scss";
import Head from "next/head";
import { useState } from "react";
import Layout, { siteTitle } from "../components/Layout";
import Column from "../components/Column";
import ColumnComposer from "../components/ColumnComposer";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { initialData } from "./initail-data";

export default function Home() {
  const [state, setState] = useState(initialData);

  const onClickPlusMinus = (ticket, obj) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        tickets: {
          ...prevState.tickets,
          [ticket.id]: {
            ...ticket,
            ...obj,
          },
        },
      };
      return newState;
    });
  };

  const addTicket = (column, { content, consume, estimate }) => {
    if (!content) {
      console.error("Ticket content is none");
      return;
    }

    setState((prevState) => {
      const newTicketId = `ticket_${Object.keys(prevState.tickets).length + 1}`;
      const newState = {
        ...prevState,
        tickets: {
          ...prevState.tickets,
          [newTicketId]: {
            id: newTicketId,
            content,
            consume,
            estimate,
          },
        },
        columns: {
          ...prevState.columns,
          [column.id]: {
            ...prevState.columns[column.id],
            ticketIds: prevState.columns[column.id].ticketIds.concat([
              newTicketId,
            ]),
          },
        },
      };
      return newState;
    });
  };

  const addColumn = (title) => {
    if(!title) {
        console.error("Column title is none")
        return;
    }

    setState((prevState) => {
      const newColumnId = `column_${Object.keys(prevState.columns).length + 1}`;
      const newState = {
        ...prevState,
        columns: {
          ...prevState.columns,
          [newColumnId]: {
            id: newColumnId,
            title,
            ticketIds: [],
          },
        },
        columnOrder: prevState.columnOrder.concat([newColumnId]),
      };
      return newState;
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    const sameColumn = destination.droppableId === source.droppableId;
    const sameIndex = destination.index === source.index;
    if (sameColumn && sameIndex) return;

    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    const newStateWithTicketAtSameColumn = () => {
      const newTicketIds = Array.from(startColumn.ticketIds); // create a copy

      newTicketIds.splice(source.index, 1); // remove a ticket
      newTicketIds.splice(destination.index, 0, draggableId); // add a ticket

      const newColumn = {
        ...startColumn,
        ticketIds: newTicketIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      return newState;
    };
    const newStateWithTicketAtAnotherColumn = () => {
      const startTicketIds = Array.from(startColumn.ticketIds);
      const finishTicketIds = Array.from(finishColumn.ticketIds);

      startTicketIds.splice(source.index, 1);
      finishTicketIds.splice(destination.index, 0, draggableId);

      const newStartColumn = {
        ...startColumn,
        ticketIds: startTicketIds,
      };
      const newFinishColumn = {
        ...finishColumn,
        ticketIds: finishTicketIds,
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [startColumn.id]: newStartColumn,
          [finishColumn.id]: newFinishColumn,
        },
      };
      return newState;
    };

    const newStateWithColumn = () => {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      return newState;
    };

    if (type === "column") {
      setState(newStateWithColumn());
      return;
    }

    if (startColumn === finishColumn) {
      setState(newStateWithTicketAtSameColumn());
      return;
    }

    setState(newStateWithTicketAtAnotherColumn());
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className={styles.column_container}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.columnOrder.map((columnId, index) => {
                  const column = state.columns[columnId];
                  const tickets = column.ticketIds.map(
                    (ticketId) => state.tickets[ticketId]
                  );
                  return (
                    <Column
                      key={column.id}
                      column={column}
                      tickets={tickets}
                      index={index}
                      onClickPlusMinus={onClickPlusMinus}
                      addTicket={addTicket}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <ColumnComposer addColumn={addColumn} />
      </div>
    </Layout>
  );
}
