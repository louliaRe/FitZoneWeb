import React from 'react';
import { Grid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';

const GridServices = () => {
  const navigate = useNavigate();

  const handleClick = (text) => {
    switch (text) {
      case 'Manage Coaches':
        navigate('/EmpManageCoaches');
        break;
      case 'Manage Posts':
        navigate('/EmpManagePosts');
        break;
      case 'Manage store':
        navigate('/EmpManageStore');
        break;
      case 'Manage courses':
        navigate('/EmpManage-courses');
        break;
      case 'Manage gym halls':
        navigate('/EmpManage-gym-hall');
        break;
      case 'Discount':
        navigate('/EmpDiscountCarousel');
        break;
      default:
        break;
    }
  };

  return (
    <Grid grow gutter="sm" style={{ margin: '10px', marginTop: '30px' }}>
      <Grid.Col span={4}>
        <ServiceCard image="./manageCoaches.jpg" text="Manage Coaches" onClick={() => handleClick('Manage Coaches')} />
      </Grid.Col>
      <Grid.Col span={4}>
        <ServiceCard image="./store.jpg" text="Manage store" onClick={() => handleClick('Manage store')} />
      </Grid.Col>
      <Grid.Col span={4}>
        <ServiceCard image="./addHall.jpg" text="Manage gym halls" onClick={() => handleClick('Manage gym halls')} />
      </Grid.Col>
      <Grid.Col span={3}>
        <ServiceCard image="./manageCourses.jpg" text="Manage courses" onClick={() => handleClick('Manage courses')} />
      </Grid.Col>
      <Grid.Col span={5}>
        <ServiceCard image="./managePosts.jpg" text="Manage posts" onClick={() => handleClick('Manage Posts')} />
      </Grid.Col>
      <Grid.Col span={3}>
        <ServiceCard image="./discount.png" text="Discount" onClick={() => handleClick('Discount')} />
      </Grid.Col>
    </Grid>
  );
};

export default GridServices;
