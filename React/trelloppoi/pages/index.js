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
  const column = (id) => state.columns[id];
  const tasks = (id) =>
    column(id).ticketIds.map((ticketId) => state.tickets[ticketId]);
  const addCount = () => {
    setState((prevState) => ({
      ...prevState,
      count: prevState.count + 1,
    }));
  };

  const onClickConsume = (ticket, obj) => {
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
      console.log(newState);
      return newState;
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newTicketIds = Array.from(column.ticketIds); // create a copy
    newTicketIds.splice(source.index, 1); // remove a ticket
    newTicketIds.splice(destination.index, 0, draggableId); // add a ticket

    const newColumn = {
      ...column,
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

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DragDropContext onDragEnd={onDragEnd}>
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
              onClickConsume={onClickConsume}
            />
          );
        })}
      </DragDropContext>

      {/* <Ticket title="TITLE_TICKET" /> */}
      {/* <Menu recipes={recipeData} /> */}
    </Layout>
  );
}
