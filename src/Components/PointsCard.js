// PointsCard.js
import React from 'react';
import { Card, Image, Text, Title } from '@mantine/core';
import classes from './PointsCard.module.css'
import { Bold } from 'tabler-icons-react';

const PointsCard = ({ imageSrc, onClick }) => {
  return (
    <Card shadow="xl" padding="lg" onClick={onClick} className={classes.cardd} >
      
      <Title weight={Bold} size="lg" mt="md" align="center">
        Vouchers
      </Title>
        <Image src={imageSrc} height={500} width={500} alt="Vouchers" />
     

     
    </Card>
  );
};

export default PointsCard;
