import { useParams } from "react-router-dom";
import { BoardT } from "../../pages/dashboard/dashboard";
import Board from "./board/board";
import "./kanban.css";
import { useState, useEffect, createContext } from "react";
import { GetBoard } from "../../api/auth/kanban";

// export const KanbanContext = createContext<BoardT["kanban"]>();
export default function KanbanB() {
  const [boards, setBoards] = useState<BoardT>();
  const { name } = useParams();

  const getAllBoard = async () => {
    const res = await GetBoard(name);
    res.status === 200 ? setBoards(res.data[0]) : console.log("hellow");
    return res;
  };

  useEffect(() => {
    getAllBoard();
  }, []);
  // console.log(typeof boards?.kanban);
  const kanban = boards?.description!;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "45px",
      }}
    >
      <div className="boardMain">
        <h2>{boards?.name}</h2>
        <h4 className="subheading">{boards?.description}</h4>
        <div className="board">
          {/* <KanbanContext.Provider value={boards?.kanban!}> */}
          <Board
            name={boards?.name!}
            owner={boards?.owner!}
            description={boards?.description!}
            kanban={boards?.kanban!}
            reload={getAllBoard}
          />
          {/* </KanbanContext.Provider> */}
        </div>
      </div>
    </div>
  );
}
