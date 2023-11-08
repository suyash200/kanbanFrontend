import "./chip.css";

interface ChipProps {
  title: string;
  color: string;
}
export default function Chip({title,color}:ChipProps) {
  return <div className="ChipMain" style={{background:`${color}`}}><b style={{color:'#4D4D4D'}}>{title}</b></div>;
}
