import Card from "../../components/kanban/card/card";
import { useState, useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import GetAllBoardsApi from "../../api/auth/kanban";
import { task } from "../../types/globalInterface";

export interface BoardT {
  name: string;
  description: string;
  owner: string;
  kanban: {
    todo: task[];
    inProgress: task[];
    done: task[];
  };
}
export default function Dashboard() {
  const [boards, setBoards] = useState<BoardT[]>();

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
    </div>
  );
}
