import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import Trial from "./trial";
import { useState } from "react";
import Card from "./kanban/card/card";
const listItems = [
  {
    id: "12",
    name: "Study ",
  },
  {
    id: "45",
    name: "Wor",
  },
];
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
  
export default function MegaCombo() {
  const [todo, setTodo] = useState(listItems);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const items = Array.from(todo);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);
    setTodo(items)
  };
  return (
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
                      <Card Title={name} description={name} />
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
