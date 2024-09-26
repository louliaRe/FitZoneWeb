import React from 'react';
import { Card, Image, Text, Group, ActionIcon } from '@mantine/core';
import { IconTrash, IconPencil } from '@tabler/icons-react';
import classes from './ItemCard.module.css';

const ItemCard = ({ item, onEdit, onDelete }) => {
   
  return (
    <Card shadow="sm" padding="lg" className={classes.card}>
      <Group >
        <Image src={item.image} alt={item.name} className={classes.img} />
        <div style={{ flex: 1 }}>
          <Text className={classes.name} size="lg" >{item.name}</Text>
          <Text size="sm" mb="xs">{item.details}</Text>
          <Text weight={500} className={classes.price} size="lg">${item.price}</Text>
        </div>
        <div className={classes.actions}>
          
          <ActionIcon size="lg" color="#a1E533" onClick={() => onEdit(item)}>
            <IconPencil />
          </ActionIcon>
          <ActionIcon size="lg" color="red" onClick={() => onDelete(item.id)}>
            <IconTrash />
          </ActionIcon>
        </div>
      </Group>
    </Card>
  );
};

export default ItemCard;
