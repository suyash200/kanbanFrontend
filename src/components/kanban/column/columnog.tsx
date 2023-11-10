import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
  } from "@hello-pangea/dnd";
  import Chip from "../../common/chip/chip";
  import Card from "../card/card";
  import "./column.css";
  import { useEffect, useState } from "react";
  
  const listItems = [
    {
      id: "12",
      name: "Study ",
      description: "some",
    },
    {
      id: "45",
      name: "Wor",
      description: "some",
    },
  ];
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 12,
    margin: `0 50px 15px 50px`,
    background: isDragging ? "--offwhite" : "white",
    // color: isDragging ? "white" : "black",
    // border: `1px solid black`,
    fontSize: `20px`,
    // borderRadius: `5px`,
  
    ...draggableStyle,
  });
  export default function ColumnOg() {
    const [todo, setTodo] = useState(listItems);
    const onDragEnd = (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) return;
      const items = Array.from(todo);
      const [newOrder] = items.splice(source.index, 1);
      items.splice(destination.index, 1, newOrder);
      setTodo(items);
    };
    useEffect(()=>{},[todo])
    const addItem = () => {
      listItems.push({ id: "sdf", name: "ssss", description: "sdfsdf" });
      
       setTodo(listItems)
    };
    return (
      <div className="ColumnMain">
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            gap: "200px",
          }}
        >
          {" "}
          <Chip title='To Do' color='' />{" "}
          <h3
            onClick={() => {
              addItem();
              console.log(todo)
            }}
          >
            add
          </h3>
        </div>
        <DragDropContext onDragEnd={onDragEnd} >
          <Droppable droppableId="Column">
            {(provided) => (
              <div
                className="todo"
                {...provided.droppableProps}
                
                ref={provided.innerRef}
              >
                {todo &&todo.map(({ id, name, description }, index) => {
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
                          <Card Title={name} description={description} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
  