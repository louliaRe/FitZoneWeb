import React, { useState } from 'react';
import { FileInput,TextInput, Button } from '@mantine/core';
import classes from './SupplementsForm.module.css';

const SupplementsForm = () => {
  const [supplement, setSupplement] = useState({ name: '', details: '', price: '', image: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplement({ ...supplement, [name]: value });
  };

  const handleSubmit = () => {
    // Add logic to save supplement item
    console.log('Supplement item saved:', supplement);
  };

  return (
    <div className={classes.form}>
      <TextInput label="Name" name="name" value={supplement.name} onChange={handleChange} />
      <TextInput label="Details" name="details" value={supplement.details} onChange={handleChange} />
      <TextInput label="Price" name="price" type="number" value={supplement.price} onChange={handleChange} />
      <FileInput label="Image URL" name="image" value={supplement.image} onChange={handleChange} />
      <Button onClick={handleSubmit} className={classes.btn}>Save</Button>
    </div>
  );
};

export default SupplementsForm;
