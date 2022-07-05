import styles from "./Column.module.scss";
import { Droppable } from "react-beautiful-dnd";
import Ticket from "./Ticket";
export default function Column({
  column,
  tickets,
  onClickPlusMinus,
  onCliceColumnTitle,
}) {
  return (
    <div className={styles.container}>
      <textarea
        onClick={onCliceColumnTitle}
        className={styles.title}
        placeholder="リストのタイトルを入力..."
        defaultValue={column.title}
        colus="1"
      />
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className={styles.task_list}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tickets.map((ticket, index) => (
              <Ticket
                key={ticket.id}
                ticket={ticket}
                index={index}
                onClickPlusMinus={onClickPlusMinus}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
