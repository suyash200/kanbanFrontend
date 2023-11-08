import Board from "./board/board";
import "./kanban.css";

export default function Kanban() {
  return (
    <div style={{background:'var(--white)',}}>
      <div className="boardMain">
        <h2>Hellow</h2>
        <h4>dexcroption</h4>
        <Board />
      </div>
    </div>
  );
}
