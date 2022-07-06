import styles from "./Column.module.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Ticket from "./Ticket";
export default function Column({
  column,
  tickets,
  index,
  onClickPlusMinus,
  onCliceColumnTitle,
}) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className={styles.container}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <p
            {...provided.dragHandleProps}
            onClick={onCliceColumnTitle}
            className={styles.title}
            placeholder="リストのタイトルを入力..."
            defaultValue={column.title}
            colus="1"
          />
          <Droppable droppableId={column.id} type="ticket">
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
      )}
    </Draggable>
  );
}
