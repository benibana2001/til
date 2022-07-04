import styles from "./Ticket.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";

export default function Ticket({ ticket, index }) {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={
            snapshot.isDragging
              ? `${styles.ticket} ${styles.ticket__dragging}`
              : styles.ticket
          }
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div class={styles.wrapper}>
            <div className={styles.left}>
              <span className={styles.content}>{ticket.content}</span>
              <div className={styles.avatar}></div>
            </div>
            <div className={styles.right}>
              <div>
                <div className={styles.plus}></div>
                <div className={`${styles.hours} ${styles.hours__consume}`}>6</div>
              </div>
              <div>
                <div className={`${styles.hours} ${styles.hours__estimate}`}>24</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
