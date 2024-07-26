import React from 'react';
import { Card, Image, Text, Button } from '@mantine/core';
import classes from './CategoryCard.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';


const CategoryCard = ({ category }) => {
  const navigate =useNavigate();
  const {authState}= useAuth();
  const getImageSrc = (categoryName) => {
    switch (categoryName) {
      case 'accessories':
        return '/clothes.jpg';
      case 'Meal':
        return '/meals.jpg';
      case 'Supplement':
        return '/pro.jpg';
      default:
        return ''; 
    }
  };

  return (
    <Card shadow="sm" padding="lg" className={classes.card}>
      <Card.Section>
        <Image
          src={getImageSrc(category.name)}
          className={classes.img}
          alt={category.name}
          onClick={() => navigate(`/EmpManageProducts/${category.id}/${authState.branch_id}`)}
        />
      </Card.Section>
      <Text weight={500} size="lg" style={{ marginTop: '10px' }}>
        {category.name}
      </Text>
    </Card>
  );
};

export default CategoryCard;