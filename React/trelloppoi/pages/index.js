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

  const onDragEnd = (result) => {
    // TODO: reorder our column
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
          return <Column key={column.id} column={column} tickets={tickets} />;
        })}
      </DragDropContext>

      {/* <Ticket title="TITLE_TICKET" /> */}
      {/* <Menu recipes={recipeData} /> */}
    </Layout>
  );
}
