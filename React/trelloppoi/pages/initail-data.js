export const initialData = {
  tickets: {
    ticket_1: {
      id: "ticket_1",
      content: "使っていて気持ちいUIを探る",
      consume: 12,
      estimate: 30,
    },
  },
  columns: {
    column_1: {
      id: "column_1",
      title: "List 1",
      ticketIds: ["ticket_1"],
    },
  },
  columnOrder: ["column_1"],
};
