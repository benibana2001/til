import styles from "./Ticket.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";

export default function Ticket({ ticket, index }) {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          className={styles.ticket}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.title}>{ticket.content}</div>
          {/* <div className={styles.main}>
            <div className={styles.title}>{ticket.content}</div>
            <div className={styles.avatar}></div>
          </div>
          <div className={styles.sub}>
            <div className={styles.hours}>6</div>
            <div className={styles.hours}>24</div>
          </div> */}
        </div>
      )}
    </Draggable>
  );
}
