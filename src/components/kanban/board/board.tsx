import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Column from "../column/column";
import "./board.css";
import Card from "../card/card";
import ColumnOg from "../column/columnog";
import {
  DragStart,
  DragUpdate,
  DropResult,
  OnBeforeDragStartResponder,
} from "react-beautiful-dnd";
import { useState } from "react";
import { number } from "yargs";

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

const task = [
  [
    {
      id: "12",
      name: "Study",
      description: "somesd",
    },
    {
      id: "45",
      name: "Wor",
      description: "some",
    },
  ],
  [
    {
      id: "34",
      name: "Studys",
      description: "somead",
    },
    {
      id: "4",
      name: "Wo2r",
      description: "some2",
    },
  ],
  [
    {
      id: "3",
      name: "Stud",
      description: "som3e",
    },
    {
      id: "5",
      name: "Wo2r3",
      description: "some32",
    },
  ],
];
export default function Board() {
  const [todo, setTodo] = useState(task);
  var sId: number;
  var sIndex: string;
  const onDragEnd = (result: DropResult) => {
    // const items = Array.from(todo);
    // const { source, destination } = result;
    // if (destination === null) {
    //   console.log(source, destination);
    //   todo[sId].push(items[+source.droppableId][source.index]);
    // }
    // if (!destination) return;
    // const [newOrder] = items.splice(destination.index, 1);
    // items.splice(destination?.index, 0, newOrder);
    // setTodo(items);
    // sIndex = result.destination?.droppableId as string;
    // sId = result.destination?.index as number;
  };
  const OnDragUpdate = (update: DragUpdate) => {
    const { destination, source } = update;
    sId = update.source.index;
    sIndex = update.source.droppableId;
    const items = Array.from(todo);
    if (!destination) return;
    if (destination === null) {
      console.log(sId, sIndex);
      items[sId].push(items[+source.droppableId][source.index]);
    }
    const buffer = items[+source.droppableId][source.index]; //buffer to note the element changed
    items[+source.droppableId].splice(source.index, 1);
    items[+destination.droppableId].push(buffer);
    // setTodo(items);
  };

  const handleAddTask = (drag: DragStart) => {
    const list = Array.from(todo);
    list[sId].push({ id: "sf", name: "sdf", description: "sdf" });
  };

  return (
    <div className="boardMain">
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={OnDragUpdate}>
        <div className="column">
          <Column
            key="start"
            id={0}
            task={task[0]}
            handleAdd={handleAddTask}
            Title="Todo"
            color="white"
          />
          <Column
            key="middle"
            id={1}
            task={task[1]}
            handleAdd={handleAddTask}
            Title="In Progress"
            color="Lavender"
          />
          <Column
            key="end"
            id={2}
            task={task[2]}
            handleAdd={handleAddTask}
            Title="Completed"
            color="#FFDCE0"
          />
        </div>
      </DragDropContext>
    </div>
  );
}
