import React from 'react';
import { Card, Image, Text, Button } from '@mantine/core';
import classes from './CategoryCard.module.css'
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate =useNavigate();

  return (
   
    <Card shadow="sm" padding="lg" className={classes.card}>
      <Card.Section>
        <Image src={category.image} className={classes.img} alt={category.name} onClick={()=>navigate('/EmpProductsTable')} />
      </Card.Section>

      <Text weight={500} size="lg" style={{ marginTop: '10px' }}>
        {category.name}
      </Text>
  
   </Card>
  );
};

export default CategoryCard;
