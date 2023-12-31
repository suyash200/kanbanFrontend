import { Draggable, Droppable } from "@hello-pangea/dnd";
import Chip from "../../common/chip/chip";
import Card from "../card/card";
import "./column.css";
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { task } from "../../../types/globalInterface";
import { v4 as uuidv4 } from "uuid";
import { BoardT } from "../../../pages/dashboard/dashboard";

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
  DropId: string;
  task: task[];
  handleChange?: any;
  Title: string;
  color: string;
}
export default function Column({
  id,
  DropId,
  task,
  handleChange,
  Title,
  color,
}: columprops) {
  var todo = structuredClone(task);
  const [modal, setModal] = useState<boolean>(false);

  const [newtask, setNewTask] = useState<task>({
    id: uuidv4(),
    name: "",
    description: "",
  });
  const addItem = async () => {
    const newTaskId = uuidv4();
    setNewTask({
      id: newTaskId,
      name: newtask.name,
      description: newtask.description,
    });
    task.push(newtask);
    handleChange();
  };

  const handleDelete = (id: number) => {
    task.splice(id, 1);

    handleChange();
  };

  const handleEdit = (id: number, buffer: task) => {
    task[id] = buffer;
    handleChange();
    console.log(task);
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
          }}
          size={32}
        />
      </div>

      <Droppable droppableId={DropId} key={DropId}>
        {(provided) => (
          <div
            className="todo"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ justifyContent: "start", alignItems: "flex-start" }}
          >
            {" "}
            {provided.placeholder}
            {task?.map(({ id, name, description }, index) => {
              if (id === undefined) {
                console.log('id undefined')
                id= name 
               return <></>;
              }
              return (
                <Draggable key={uuidv4()} draggableId={id} index={index}>
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
                      <Card
                        Title={name}
                        description={description}
                        handleDelete={handleDelete}
                        index={index}
                        handleEdit={handleEdit}
                      />
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
