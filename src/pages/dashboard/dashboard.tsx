import Card from "../../components/kanban/card/card";
import { useState, useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import GetAllBoardsApi, { CreateBoard } from "../../api/auth/kanban";
import { task } from "../../types/globalInterface";
import { IoAddCircle } from "react-icons/io5";

export interface BoardT {
  name: string;
  description: string;
  owner: string;
  kanban: {
    todo: task[];
    inProgress: task[];
    done: task[];
  };
  reload:any
}
export default function Dashboard() {
  const [boards, setBoards] = useState<BoardT[]>();
  const [modal, setModal] = useState<boolean>(false);
  const [newtask, setNewTask] = useState({
    name: "",
    description: "",
  });

  const getAllBoard = async () => {
    const res = await GetAllBoardsApi();
    res.status === 200 ? setBoards(res.data) : console.log("hellow");
    return res;
  };

  useEffect(() => {
    getAllBoard();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="cardsContainer">
      {boards?.map((data, index) => {
        return (
          <div
            className="card"
            key={index}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/board/${data.name}`);
            }}
          >
            <div className="container">
              <h2>
                <b>{data.name}</b>
              </h2>
              <h4>{data.description}</h4>
            </div>
          </div>
        );
      })}
      <div
        className="card"
        onClick={(e) => {
          e.preventDefault();
          // boards?.push;
          // navigate(`/board/${data.name}`);
        }}
      >
        <div className="container">
          <h2>
            <b>"Add New Board"</b>
          </h2>
          <h4>New tasks pending...</h4>
          <center>
            <IoAddCircle size={45} onClick={(e)=>{
              setModal(!modal)
            }} />
          </center>
        </div>
      </div>
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
                onClick={ async(e) => {
                  e.preventDefault();
                  // boards?.push({newtask})
                  const res=await CreateBoard(newtask)
                  res.status===200?getAllBoard():console.log('bit adde')
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
