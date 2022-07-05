import styles from "./Ticket.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { resetServerContext } from "react-beautiful-dnd";

export default function Ticket({ ticket, index, onClickConsume }) {
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
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <span className={styles.content}>{ticket.content}</span>
              <div className={styles.avatar}></div>
            </div>
            <div className={styles.right}>
              <div className={styles.time}>
                <div className={styles.plus} onClick={() => onClickConsume(ticket, {consume: ticket.consume + 1})}>＋</div>
                <div className={`${styles.hours} ${styles.hours__consume}`}>
                  {ticket.consume}
                </div>
                <div className={styles.minus} onClick={() => onClickConsume(ticket, {consume: ticket.consume - 1})}>ー</div>
              </div>
              <div className={styles.time}>
                <div className={styles.plus} onClick={() => onClickConsume(ticket, {estimate: ticket.estimate + 1})}>＋</div>
                <div className={`${styles.hours} ${styles.hours__estimate}`}>
                  {ticket.estimate}
                </div>
                <div className={styles.minus} onClick={() => onClickConsume(ticket, {estimate: ticket.estimate - 1})}>ー</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
