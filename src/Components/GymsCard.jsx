import { Card, Image, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./GymsCard.css";

const GymsCard = () => {
  const navigate = useNavigate();

  const handleGyms = () => {
    navigate("/GymInterface");
  };
  return (
    <Card shadow="sm" className="gyms-card" onClick={handleGyms}>
      <Title className="text">Gyms</Title>
      <Image src="./gym.jpg" className="im" />
    </Card>
  );
};
export default GymsCard;
