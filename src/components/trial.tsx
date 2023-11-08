import {
  DropResult,
  DragDropContext,
  Draggable,
  Droppable,
} from "@hello-pangea/dnd";
import React, { useState } from "react";
import Card from "./kanban/card/card";

const listItems = [
  {
    id: "1",
    name: <Card/>,
  },
  {
    id: "2",
    name: <Card/>,
  },
  {
    id: "3",
    name: <Card/>,
  },
  {
    id: "4",
    name: <Card/>,
  },
];
const listItems2 = [
  {
    id: "5",
    name: "Study ",
  },
  {
    id: "6",
    name: "Wor",
  },
  {
    id: "7",
    name: "Film ",
  },
  {
    id: "8",
    name: "Grocer",
  },
];

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  border: `1px solid black`,
  fontSize: `20px`,
  borderRadius: `5px`,

  ...draggableStyle,
});

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const style2: React.CSSProperties = {
  display: "flex",
};
function Trial() {
  const [todo, setTodo] = useState(listItems);
  const [todo2, setTodo2] = useState(listItems2);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(todo);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setTodo(items);
  };
  return (
    <div className="App">
      <h1>Drag and Drop</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className="todo"
              {...provided.droppableProps}
              ref={provided.innerRef}
        
            >
              {todo.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {name}
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Trial;
