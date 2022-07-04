export const initialData = {
    tickets: {
      "ticket_1": { id: "ticket_1", content: "Todo 1" },
      "ticket_2": { id: "ticket_2", content: "Todo 2" },
      "ticket_3": { id: "ticket_3", content: "Todo 3" },
      "ticket_4": { id: "ticket_4", content: "Todo 4" },
    },
    columns: {
      "column_1": {
        id: "column_1",
        title: "List 1",
        ticketIds: ["ticket_1", "ticket_2", "ticket_3", "ticket_4"]
      },
    },
    coloumnOrder: ["column_1"],
    count: 0,
  };