import React from "react";
import AdminStatistics from '../Components/AdminStatistics';
import GymsCard from '../Components/GymsCard';
import { Container } from "@mantine/core";
import './MainAdminP.css'

const MainAdminP=()=>{

    return (
             <Container  className="container">
            <div className="c">
        <AdminStatistics />
      </div>
      <div className="c">
        <GymsCard />
        </div>
      </Container>
     
 
    )
}
export default MainAdminP;