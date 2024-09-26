import React from "react";
import { Card,Image,Text } from "@mantine/core";
import classes from './ServiceCard.module.css';

const ServiceCard =({ image, text, onClick })=>{
    return (
        <Card shadow="lg" padding="md" radius="md" withBorder onClick={onClick} className={classes.card}>
        
    
      <Card.Section>
        <Image src={image} height={170} alt={text} className={classes.img}/>
      </Card.Section>
      <Text weight={500} align="center" mt="sm" className={classes.text}>
        {text}
      </Text>
    
        </Card>
    )
}
export default ServiceCard;