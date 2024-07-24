import React, { useState } from 'react';
import { FileInput,TextInput, Button } from '@mantine/core';
import classes from './MealsForm.module.css'

const MealsForm = () => {
  const [meal, setMeal] = useState({ name: '', details: '', price: '', image: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal({ ...meal, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Meal item saved:', meal);
  };

  return (
    <div className={classes.form}>
      <TextInput label="MealName" name="name" value={meal.name} onChange={handleChange} />
      <TextInput label="Details" name="details" value={meal.details} onChange={handleChange} />
      <TextInput label="Price" name="price" type="number" value={meal.price} onChange={handleChange} />
      <FileInput label="Image URL" name="image" value={meal.image} onChange={handleChange} />
      <Button onClick={handleSubmit} className={classes.btn}>Save</Button>
    </div>
  );
};

export default MealsForm;
