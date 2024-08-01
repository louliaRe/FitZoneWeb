import React, { useState } from 'react';
import { FileInput,TextInput, Button, NumberInput } from '@mantine/core';
import classes from './SupplementsForm.module.css';
import { AddSupplement } from '../../ApiServices/StoreServices';
import { useAuth } from '../../AuthContext';

const SupplementsForm = () => {
  const [supplement, setSupplement] = useState({protien:0, description:'',calories:0,caffeine:100,weight:10,flavor:'',amount:100, price:10, image_path: null, brand:'' })
  const {authState}= useAuth();
  const handleChange = (e) => {
    console.log("e", e)
    const { name, value } = e.target;
    setSupplement({ ...supplement, [name]: value });
  };
  const handleNumberChange = (name, value) => {
    setSupplement({ ...supplement, [name]: Number(value) });
  };

  const handleFileChange=(file)=>{
   if(file){
    setSupplement({...supplement, imapge_path: file});  
   }
  }

  const handleSubmit = async () => {
    console.log('Supplement item saved:', supplement);
      try{
           const formData=  new FormData();
           const product = {
            name: supplement.name,
            description: supplement.description,
            category: 2,
            brand: supplement.brand
          };
    
          const supp_data = {
            protien: supplement.protien,
            supplement_category_id:1,

            carbs: supplement.carbs,
            calories: supplement.calories,
            weight:supplement.weight,
            flavor: supplement.flavor
                    };
    
          const details = {
            amount: supplement.amount,
            price: supplement.price
          };
           
          formData.append('product', JSON.stringify(product));
          formData.append('supp_data', JSON.stringify(supp_data));
          formData.append('details', JSON.stringify(details));
          
          if (supplement.image_path) {
            formData.append('image_path', supplement.image_path);
          }
          // formData.append('supplement', JSON.stringify(supplement));
          console.log("formData",  formData);

          await AddSupplement(authState.accessToken, authState.branch_id, formData)

      }catch(error){
         console.error("error", error)
      }
  };

  return (
    <div className={classes.form}>
      <TextInput label="Name" name="name" value={supplement.name} onChange={handleChange} />
      <TextInput label="Description" name="description" value={supplement.description} onChange={handleChange} />
      <NumberInput label="Price" name="price" onChange={(e)=>handleChange({target:{name:'price',value:e}})}
 />
       <TextInput label="Brand" name="brand" value={supplement.brand} onChange={handleChange} />

   <NumberInput
        label="Protien"
        name="protien"
        type='number'
        onChange={(value) => handleNumberChange('protien', value)}

        />
        <NumberInput
        label="Calories"
        name="calories"
        value={supplement.calories}
        onChange={(value) => handleNumberChange('calories', value)}
      />
      <NumberInput
        label="Carbs"
        name="carbs"
        value={supplement.carbs}
        onChange={(value) => handleNumberChange('carbs', value)}
      />
      <NumberInput
        label="Amount"
        name="amount"
        value={supplement.amount}
        onChange={(value) => handleNumberChange('amount', value)}
      />
       <NumberInput
        label="Weight"
        name="weight"
        type='number'
        onChange={(e)=>handleChange({target:{name:'weight',value:e}})}/>
 
      <TextInput label="Flavor" name="flavor" value={supplement.flavor} onChange={handleChange} />
      <NumberInput
        label="Price"
        name="price"
        value={supplement.price}
        onChange={(value) => handleNumberChange('price', value)}
      />

      <FileInput label="Image URL" name="image_path"  value={supplement.image} onChange={handleFileChange} />
      <Button onClick={handleSubmit} className={classes.btn}>Save</Button>
    </div>
  );
};

export default SupplementsForm;
