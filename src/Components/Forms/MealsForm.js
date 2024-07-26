import React, { useState } from 'react';
import { FileInput,TextInput, Button , NumberInput} from '@mantine/core';
import classes from './MealsForm.module.css'

const MealsForm = () => {
  const [newMeal, setNewMeal] = useState({name:'', description:'', protien:0, calories:0,carbs:0,fats:0 ,used_for:'', amount:100, price:null, image_path: null })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeal({ ...newMeal, [name]: value });
  };

  const handleFileChange = (file) => {
    if (file) {
      setNewMeal({ ...newMeal, image: file });
    }
  };

  const handleSubmit = async () => {
    // {
     
    //   product:{
    //     name: ,
    //     description:,
    //     category:
        
    //   },
    //   meals:,
    //   {"protien":,   
    //   "carbs":  ,
    //   "calories":,
    //   "used_for":"lose_weight"},
    //   "details":{
    //     "amount":,
    //     "price":
    //   }
    // }
    console.log('Meal item saved:', newMeal);

  };

  return (
    <div className={classes.form}>
      <TextInput
       label="MealName"
        name="name"
         value={newMeal.name}
          onChange={handleChange}
           />
      <TextInput
       label="Details"
        name="details"
         value={newMeal.description} 
         onChange={handleChange}
          />
      <TextInput label="Protien" name="protien" type="number" value={newMeal.protien} onChange={handleChange} />
      <TextInput label="calories" name="calories" type="number" value={newMeal.calories} onChange={handleChange} />
      <TextInput label="Carbs" name="carbs" type="number" value={newMeal.carbs} onChange={handleChange} />
      <TextInput label="Fats" name="fats" type="number" value={newMeal.fats} onChange={handleChange} />
      <TextInput label="Fats" name="fats" type="number" value={newMeal.fats} onChange={handleChange} />
      <TextInput label="Amount" name="amount" type="number" value={newMeal.amount} onChange={handleChange} />
      <TextInput label="This meal used for:"  name="used_for" type="number" value={newMeal.used_for} onChange={handleChange} />

      <FileInput label="Image URL" name="image_path" value={newMeal.image_path} onChange={handleFileChange} />
      <Button onClick={handleSubmit} className={classes.btn}>Save</Button>
    </div>
  );
};

export default MealsForm;
