import { Draggable, Droppable } from "@hello-pangea/dnd";
import Chip from "../../common/chip/chip";
import Card from "../card/card";
import "./column.css";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { task } from "../../../types/globalInterface";
import { v4 as uuidv4 } from "uuid";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 12,
  margin: `0 50px 15px 50px`,
  // background: isDragging ? "white" : "white",
  // color: isDragging ? "white" : "black",
  // border: `1px solid black`,
  fontSize: `20px`,
  // borderRadius: `5px`,

  ...draggableStyle,
});

interface columprops {
  id: number;
  key: string;
  task: task[];
  handleAdd: any;
  Title: string;
  color: string;
}
export default function Column({
  id,
  key,
  task,
  handleAdd,
  Title,
  color,
}: columprops) {
  const [todo, setTodo] = useState(task);
  const [modal, setModal] = useState<boolean>(false);
  const [newtask, setNewTask] = useState<task>({
    id: uuidv4(),
    name: "",
    description: "",
  });
  const addItem = async () => {
    const newTaskId = uuidv4();
    console.log(newTaskId);
    setNewTask({
      id: newTaskId,
      name: newtask.name,
      description: newtask.description,
    });

    task.push(newtask);
  };
  return (
    <div className="ColumnMain">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <Chip title={Title} color={color} />{" "}
        <IoAddOutline
          onClick={() => {
            setModal(!modal);
            console.log(todo);
          }}
          size={32}
        />
      </div>

      <Droppable droppableId={`${id}`} key={key}>
        {(provided) => (
          <div
            className="todo"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ justifyContent: "start", alignItems: "flex-start" }}
          >
            {" "}
            {provided.placeholder}
            {todo.map(({ id, name, description }, index) => {
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
          </div>
        )}
      </Droppable>
      {
        <dialog open={modal} className="dailog">
          <div className="dailogBox">
            <h3>Add task</h3>
            <div className="textInput">
              <h4>Title</h4>
              <input
                className="input"
                value={newtask?.name}
                onChange={(e) => {
                  e.preventDefault();
                  setNewTask({ ...newtask, name: e.target.value });
                }}
              />
            </div>
            <div className="textInput">
              <h4>Description</h4>
              <input
                className="input"
                value={newtask?.description}
                onChange={(e) => {
                  e.preventDefault();
                  setNewTask({ ...newtask, description: e.target.value });
                }}
              />
            </div>
            <center style={{ display: "flex", gap: "80px" }}>
              {" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem();
                  setModal(!modal);
                }}
                className="button"
              >
                Add
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModal(!modal);
                }}
                className="button"
              >
                close
              </button>
            </center>
          </div>
        </dialog>
      }
    </div>
  );
}
