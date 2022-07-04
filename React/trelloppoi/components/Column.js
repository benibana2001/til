import styles from "./Column.module.scss";
import { Droppable } from "react-beautiful-dnd";
import Ticket from "./Ticket";
export default function Column({ column, tickets }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{column.title}</p>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className={styles.task_list}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tickets.map((ticket, index) => (
              <Ticket key={ticket.id} ticket={ticket} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
