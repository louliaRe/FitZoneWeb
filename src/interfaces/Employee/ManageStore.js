import React, { useEffect, useState } from 'react';
import { Container, Card,Text } from '@mantine/core';
import CategoryCard from '../../Components/Employee/CategoryCard';
import { useNavigate } from 'react-router-dom';
import classes from './ManageStore.module.css'

const ManageStore = () => {
    const navigate= useNavigate()
  const [categories, setCategories] = useState([
    { id: 1, name: 'Meals', image: '/meals.jpg' },
    { id: 2, name: 'Clothes', image: '/clothes.jpg' },
    { id: 3, name: 'Supplements', image: '/pro.jpg' },
  ]);

//   useEffect(() => {
//   }, []);

  return (
    <Container>
      <h1>FitZone Store</h1>
      <div>
        {categories.map(category => (
        
            <CategoryCard category={category} />
        ))}

     <Card shadow="sm" padding="lg" className={classes.card}onClick={() => navigate('/AddCategory')}>
        <Card.Section>
          <Text  size="lg" style={{ marginTop: '10px', textAlign: 'center' }}>
            Add New Category
          </Text>
        </Card.Section>
        </Card>
      </div>
     
    </Container>
  );
};

export default ManageStore;
