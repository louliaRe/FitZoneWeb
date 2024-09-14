// MainAdminP.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminStatistics from '../Components/AdminStatistics';
import GymsCard from '../Components/GymsCard';
import PointsCard from '../Components/PointsCard';
import { Container, Grid } from '@mantine/core';
import './MainAdminP.css';

const MainAdminP = () => {
  const navigate= useNavigate()
  const handleCardClick = () => {
    navigate('/Vouchers')
  };

  return (
    <Container className="container">
            <Grid gutter="md">

            <Grid.Col span={4}>

        <AdminStatistics />
      </Grid.Col>


      <Grid.Col span={4}>
        <GymsCard />

        </Grid.Col>

        <Grid.Col span={4}>
          <PointsCard
            imageSrc="./Points.png" 
            onClick={handleCardClick}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default MainAdminP;
