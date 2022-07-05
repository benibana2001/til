export const initialData = {
  tickets: {
    ticket_1: { id: "ticket_1", content: "使っていて気持ちいUIを探る", consume: 12, estimate: 30 },
    ticket_2: {
      id: "ticket_2",
      content:
        "これは長いテキストです。これは長いテキストです。これは長いテキストです。これは長いテキストです。これは長いテキストです。",
      consume: 6,
      estimate: 4,
    },
    ticket_3: { id: "ticket_3", content: "猫を飼う", consume: 6, estimate: 12 },
    ticket_4: { id: "ticket_4", content: "大型二輪免許を取得する", consume: 0, estimate: 99 },
  },
  columns: {
    column_1: {
      id: "column_1",
      title: "List 1",
      ticketIds: ["ticket_1", "ticket_2", "ticket_3", "ticket_4"],
    },
    column_2: {
      id: "column_2",
      title: "Doing",
      ticketIds: [],
    },
    column_3: {
      id: "column_3",
      title: "DONE",
      ticketIds: [],
    },
  },
  coloumnOrder: ["column_1", "column_2", "column_3"],
  count: 0,
};
