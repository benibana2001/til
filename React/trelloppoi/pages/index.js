import style from "../components/Index.module.scss";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsDate } from "../lib/posts";
import Column from "../components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { initialData } from "./initail-data";

export async function getStaticProps() {
  const allPostsData = getSortedPostsDate();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
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
            // consume: ticket.consume + 1,
          },
        },
      };
      return newState;
    });
  };

  const onCliceColumnTitle = () => {
    console.log("hello");
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sameColumn = destination.droppableId === source.droppableId;
    const sameIndex = destination.index === source.index;
    if (sameColumn && sameIndex) return;

    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    const setStateWithSameColumn = () => {
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

      setState(newState);
    };
    const setStateWithAnotherColumn = () => {
      console.log("another");
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
      setState(newState);
    };

    if (startColumn === finishColumn) {
      setStateWithSameColumn();
      return;
    }

    setStateWithAnotherColumn();
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className={style.column_container}>
          {state.coloumnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tickets = column.ticketIds.map(
              (ticketId) => state.tickets[ticketId]
            );
            return (
              <Column
                key={column.id}
                column={column}
                tickets={tickets}
                onClickPlusMinus={onClickPlusMinus}
                onCliceColumnTitle={onCliceColumnTitle}
              />
            );
          })}
        </div>
      </DragDropContext>

      {/* <Ticket title="TITLE_TICKET" /> */}
      {/* <Menu recipes={recipeData} /> */}
    </Layout>
  );
}
