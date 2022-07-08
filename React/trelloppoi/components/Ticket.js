import Image from "next/image";
import imgPlus from "../public/images/plus.svg";
import imgMinus from "../public/images/minus.svg";
import Plus from "./Image/Plus";
import styles from "./scss/Ticket.module.scss";
import { Draggable } from "react-beautiful-dnd";

export default function Ticket({ ticket, index, onClickPlusMinus }) {
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
                <div
                  className={styles.plus}
                  onClick={(e) => {
                    onClickPlusMinus(ticket, { consume: ticket.consume + 1 });
                  }}
                >
                  {/* <Image src={imgPlus} /> */}
                  <Plus size={"12"} fillColor={"#63E17F"} />
                </div>
                <div
                  className={`${styles.hours} ${
                    ticket.consume <= ticket.estimate
                      ? styles.hours__consume
                      : styles.hours__consume__over
                  }`}
                >
                  {ticket.consume}
                </div>
                <div
                  className={styles.minus}
                  onClick={() =>
                    onClickPlusMinus(ticket, { consume: ticket.consume - 1 })
                  }
                >
                  <Image src={imgMinus} />
                </div>
              </div>
              <div className={styles.time}>
                <div
                  className={styles.plus}
                  onClick={() =>
                    onClickPlusMinus(ticket, { estimate: ticket.estimate + 1 })
                  }
                >
                  <Image src={imgPlus} />
                </div>
                <div className={`${styles.hours} ${styles.hours__estimate}`}>
                  {ticket.estimate}
                </div>
                <div
                  className={styles.minus}
                  onClick={() =>
                    onClickPlusMinus(ticket, { estimate: ticket.estimate - 1 })
                  }
                >
                  <Image src={imgMinus} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
