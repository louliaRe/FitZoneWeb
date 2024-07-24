import React from "react";
import AddEmp from "../Components/AddEmp";
import AdminStatistics from "../Components/AdminStatistics";
import {Container, Button} from '@mantine/core';
import './MainAdminP.css'



const Managerinterface=()=>{
    return (
            <Container  className="container">
           <div className="c">
       <AdminStatistics />
     </div>
     <div className="c">
    <AddEmp/>
        </div>
      </Container>
     
     )

}
export default Managerinterface;