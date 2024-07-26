import React, { useState } from 'react';
import { TextInput, Button, FileInput, Checkbox, Group, MultiSelect } from '@mantine/core';
import classes from './ClothesForm.module.css';

const ClothesForm = () => {
  const [clothes, setClothes] = useState({
    name: '',
    details: '',
    price: '',
    image: '',
    sizes: [],
    color:[]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClothes({ ...clothes, [name]: value });
  };

  const handleSizesChange = (sizes) => {
    setClothes({ ...clothes, sizes });
  };

  const handleSubmit = () => {
    // Add logic to save clothes item
    console.log('Clothes item saved:', clothes);
  };

  return (
    <div className={classes.form}>
      <TextInput label="Name" name="name" value={clothes.name} onChange={handleChange} />
      <TextInput label="Details" name="details" value={clothes.details} onChange={handleChange} />
      <TextInput label="Price" name="price" type="number" value={clothes.price} onChange={handleChange} />
      <FileInput label="Image URL" name="image" value={clothes.image} onChange={handleChange} />
      <MultiSelect label='Color' name='color' value = {clothes.color} 
      data={[]}
      onChange={handleChange}/>

      <Checkbox.Group
        label="Sizes"
        value={clothes.sizes}
        onChange={handleSizesChange}
      >
        <Group mt="xs">
          <Checkbox value="XS" label="XS" />
          <Checkbox value="S" label="S" />
          <Checkbox value="M" label="M" />
          <Checkbox value="L" label="L" />
          <Checkbox value="XL" label="XL" />
          <Checkbox value="XXL" label="XXL" />
        </Group>
      </Checkbox.Group>

      <Button onClick={handleSubmit} fullWidth className={classes.btn}>Save</Button>
    </div>
  );
};

export default ClothesForm;
