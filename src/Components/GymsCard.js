import { Card, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import './GymsCard.css';


const GymsCard=()=>{
    const navigate = useNavigate();

 
 const handleGyms=()=>{
   navigate("/GymInterface")
 }
    return(
        
        <Card
        shadow="xl"
        padding="lg"
       className="gyms-card"
       onClick={handleGyms}
       
    >
      <Text className='text'>Gyms</Text>
        </Card>
    )
}
export default GymsCard;