import "./card.css";

interface cardProps {
  Title?: string;
  description?: string;
}
export default function Card({ Title, description }: cardProps) {
  return (
    <div className="cardMain">
      <h4>{Title}</h4>
      <p>{description}</p>
    </div>
  );
}
