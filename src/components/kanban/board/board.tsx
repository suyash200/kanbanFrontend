import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../column/column";
import "./board.css";
import { DragStart, DragUpdate, DropResult } from "react-beautiful-dnd";
import { BoardT } from "../../../pages/dashboard/dashboard";
import { EditBoard } from "../../../api/auth/kanban";

export default function Board({ name, description, kanban, reload }: BoardT) {
  var sIndex: string | number;
  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    const items = Object(kanban);
    if (!destination) {
      return;
    }

    if (destination?.droppableId === undefined) {
      console.log("undefined");
      // destination.droppableId = source.droppableId;
      // destination.index = source.index;
      return;
    }
    const res = EditBoard(name, kanban);
  };
  const OnDragUpdate = (update: DragUpdate) => {
    var { destination, source } = update;
    const items = Object(kanban);
    if (!destination) {
      console.log("destination not valid");
      reload();
      return;
    }
    if (
      source.droppableId !== destination.droppableId &&
      source.index > destination.index
    ) {
      console.log("samerow dif col");
      // to avoid undefined id bug while dropping and pulling an card
      const buffer = items[`${source.droppableId}`][`${source.index}`];
      items[`${source.droppableId}`].slice(source.index, 1);
      const len = (items[`${destination.droppableId}`].length as number) - 1;
      const buffer2 = items[`${destination.droppableId}`][len];
      items[`${destination.droppableId}`][len] =
        items[`${destination.droppableId}`][`${destination.index}`];
      items[`${destination.droppableId}`][`${destination.index}`] = buffer2;
      kanban = items;

      return;
    }
    if (
      source.droppableId !== destination.droppableId &&
      source.index < destination.index
    ) {
      console.log("samerow dif col bottom approach");
      if (!destination) return;
      // to avoid undefined id bug while dropping and pulling an card
      if (
        destination.index ===
        items[`${destination.droppableId}`].length - 1
      ) {
        return;
      }
      // if(destination.index ===items[`${destination.droppableId}`].length){
      //   console.log("errp")
      // }
      const buffer = items[`${source.droppableId}`][`${source.index}`];
      items[`${source.droppableId}`].splice(source.index, 1);
      items[`${destination.droppableId}`].push(buffer);
      const length = items[`${destination.droppableId}`].length as number;
      const buffer2 = items[`${destination.droppableId}`][length];
      // items[`${destination.droppableId}`][`${length}`] =
      //   items[`${destination.droppableId}`][`${destination.index}`];
      // items[`${destination.droppableId}`][`${destination.index}`] = buffer2;

      console.log(items, length);
      kanban = items;

      return;
    }
    if (
      source.droppableId !== destination.droppableId &&
      source.index > destination.index
    ) {
      console.log("samerow dif col bottom approach");
      // to avoid undefined id bug while dropping and pulling an card
      console.log(
        destination.index === items[`${destination.droppableId}`].length
      );
      // if(destination.index ===items[`${destination.droppableId}`].length){
      //   console.log("errp")
      // }
      console.log(source.index === items[`${source.droppableId}`].length - 1);
      if (source.index === items[`${source.droppableId}`].length - 1) {
        console.log("got");
      }
      // items[`${destination.droppableId}`].push(buffer);
      // const length = (items[`${destination.droppableId}`].length as number) - 1;
      // const buffer2 = items[`${destination.droppableId}`][length];
      // items[`${destination.droppableId}`][`${length}`] =
      //   items[`${destination.droppableId}`][`${destination.index}`];
      // items[`${destination.droppableId}`][`${destination.index}`] = buffer2;

      console.log(items);
      kanban = items;

      return;
    }
    if (source.droppableId === destination.droppableId) {
      console.log("samerow");
      const buffer = items[`${source.droppableId}`][`${source.index}`];
      items[`${source.droppableId}`][`${source.index}`] =
        items[`${destination.droppableId}`][`${destination.index}`];
      items[`${destination.droppableId}`][`${destination.index}`] = buffer;
      kanban = items;
      return;
    }
    const buffer = items[`${source.droppableId}`][`${source.index}`];
    items[`${destination.droppableId}`].splice(destination.index, 0, buffer);
    // kanban = items;
    items[`${source.droppableId}`].splice(source.index, 1);
    kanban = items;
  };

  const handleChange = async () => {
    const res = await EditBoard(name, kanban);
  };

  return (
    <div className="boardMain">
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={OnDragUpdate}>
        <div className="column">
          <Column
            id={69}
            task={kanban?.todo}
            handleChange={handleChange}
            Title="Todo"
            color="white"
            DropId="todo"
          />
          <Column
            DropId="inProgress"
            id={1}
            task={kanban?.inProgress}
            handleChange={handleChange}
            Title="In Progress"
            color="Lavender"
          />
          <Column
            DropId="done"
            id={2}
            task={kanban?.done}
            handleChange={handleChange}
            Title="Completed"
            color="#FFDCE0"
          />
        </div>
      </DragDropContext>
    </div>
  );
}
