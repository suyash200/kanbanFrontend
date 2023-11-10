import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./card.css";
import { useState, useEffect } from "react";
import { task } from "../../../types/globalInterface";
import { v4 as uuidv4 } from "uuid";
interface cardProps {
  Title?: string;
  description?: string;
  handleDelete?: any;
  index?: number;
  handleEdit?: any;
}
export default function Card({
  Title,
  description,
  handleDelete,
  index,
  handleEdit,
}: cardProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [task, setTask] = useState({
    id: index!,
    name: Title!,
    description: description !,
  });
  
  const [newtask, setNewTask] = useState<task>({
    id: uuidv4(),
    name: "",
    description: "",
  });

  return (
    <div className="cardMain">
      <div>
        {" "}
        <h4>{task.name}</h4>{" "}
        <div className="logoLines">
          <AiOutlineEdit
            onClick={(e) => {
              setModal(!modal)
            }}
          />
          <AiOutlineDelete
            onClick={(e) => {
              e.preventDefault();
              handleDelete(index);
              console.log(index);
            }}
          />
        </div>
      </div>
      <p>{task.description}</p>
      {
        <dialog open={modal} className="dailog">
          <div className="dailogBox">
            <h3>Edit task</h3>
            <div className="textInput">
              <h4>Title</h4>
              <input
                className="input"
                value={task?.name}
                onChange={(e) => {
                  e.preventDefault();
                  setTask({ ...task, name: e.target.value });
                }}
              />
            </div>
            <div className="textInput">
              <h4>Description</h4>
              <input
                className="input"
                value={task?.description}
                onChange={(e) => {
                  e.preventDefault();
                  setTask({ ...task, description: e.target.value });
                }}
              />
            </div>
            <center style={{ display: "flex", gap: "80px" }}>
              {" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // addItem()
                  Title = task.name;
                  description = task.description;
                  handleEdit(index, task);
                   
                  setModal(!modal);
                }}
                className="button"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModal(!modal);
                  handleEdit()
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
