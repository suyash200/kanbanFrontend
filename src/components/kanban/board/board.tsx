import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../column/column";
import "./board.css";
import { DragStart, DragUpdate, DropResult } from "react-beautiful-dnd";
import { BoardT } from "../../../pages/dashboard/dashboard";
import { EditBoard } from "../../../api/auth/kanban";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  // background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  // border: `1px solid black`,
  fontSize: `20px`,
  // borderRadius: `5px`,

  ...draggableStyle,
});

export default function Board({ name, description, kanban }: BoardT) {
  var sIndex: string | number;
  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    const items = Object(kanban);
    if (destination === null || undefined) {
      console.log("he");

      return;
    }

    console.log(kanban);

     const res = EditBoard(name, kanban);
  };
  const OnDragUpdate = (update: DragUpdate) => {
    const { destination, source } = update;
    const items = Object(kanban);
    if (!destination) {
      console.log("he");
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const buffer = items[`${source.droppableId}`][`${destination.index}`];
      items[`${destination.droppableId}`].splice(destination.index, 1, buffer);
      // items[`${destination.droppableId}`].splice(destination.index, 0);
      kanban = items;
      return;
    }
    const buffer = items[`${source.droppableId}`][`${source.index}`];
    items[`${destination.droppableId}`].splice(destination.index, 0, buffer);
    kanban = items;
    items[`${source.droppableId}`].splice(source.index, 1);
    kanban = items;
  };

  const handleAddTask = (drag: DragStart) => {
    // const list = Array.from(todo);
    // list[sId].push({ id: "sf", name: "sdf", description: "sdf" });
  };

  return (
    <div className="boardMain">
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={OnDragUpdate}>
        <div className="column">
          <Column
            id={69}
            task={kanban?.todo}
            handleAdd={handleAddTask}
            Title="Todo"
            color="white"
            DropId="todo"
          />
          <Column
            DropId="inProgress"
            id={1}
            task={kanban?.inProgress}
            handleAdd={handleAddTask}
            Title="In Progress"
            color="Lavender"
          />
          <Column
            DropId="done"
            id={2}
            task={kanban?.done}
            handleAdd={handleAddTask}
            Title="Completed"
            color="#FFDCE0"
          />
        </div>
      </DragDropContext>
    </div>
  );
}
