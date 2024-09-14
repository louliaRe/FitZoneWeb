import React, { useState } from 'react';
import { TextInput, Button, FileInput, Checkbox, Group, MultiSelect, NumberInput } from '@mantine/core';
import classes from './ClothesForm.module.css';
import { AddAccessories } from '../../ApiServices/StoreServices';
import { useAuth } from '../../AuthContext';

const ClothesForm = () => {
  const { authState } = useAuth();
  const [clothes, setClothes] = useState({
    name: '',
    price: 0,
    image: null,
    brand:'',
    description:'',
    colors: [],
    colorDetails: {}
  });

  const handleNameChange = (e) => {
    setClothes({ ...clothes, name: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setClothes({ ...clothes, description: e.target.value });
  };

  const handlePriceChange = (e) => {
    setClothes({ ...clothes, price: e.target.value });
  };
  const handlebrandChange = (e) => {
    setClothes({ ...clothes, brand: e.target.value });
  };

  const handleFileChange = (file) => {
    setClothes({ ...clothes, image: file });
  };

  const handleColorsChange = (value) => {
    const colorDetails = value.reduce((details, color) => {
      details[color] = clothes.colorDetails[color] || { sizes: [], amounts: {} };
      return details;
    }, {});
    setClothes({ ...clothes, colors: value, colorDetails });
  };

  const handleSizeChange = (color, sizes) => {
    const updatedColorDetails = {
      ...clothes.colorDetails,
      [color]: {
        ...clothes.colorDetails[color],
        sizes
      }
    };
    setClothes({ ...clothes, colorDetails: updatedColorDetails });
  };

  const handleAmountChange = (color, size, amount) => {
    const updatedColorDetails = {
      ...clothes.colorDetails,
      [color]: {
        ...clothes.colorDetails[color],
        amounts: {
          ...clothes.colorDetails[color].amounts,
          [size]: amount
        }
      }
    };
    setClothes({ ...clothes, colorDetails: updatedColorDetails });
  };

  const formatAcc = () => {
    const details = [];
  
    Object.entries(clothes.colorDetails).forEach(([color, { sizes, amounts }]) => {
      sizes.forEach(size => {
        details.push({
          color: color,
          size: size,
          amount: amounts[size] || 0
        });
      });
    });
  
    return details;
  };
  
  const det= {
    price: Number(clothes.price),
    amount: Object.values(formatAcc()).flat().reduce((acc, item) => acc + item.amount, 0), // Total amount



  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const product = {
        name: clothes.name,
        is_available: true,
        product_type: 'accessories',
        category:3,
        description: clothes.description,
        brand: clothes.brand,
      };

      const accessor = formatAcc();


      formData.append('product', JSON.stringify(product));
      formData.append('accessory', JSON.stringify(accessor));
      formData.append('details', JSON.stringify(det)); 

      if (clothes.image) {
        formData.append('image_path', clothes.image, clothes.image.name);
      }
      console.log('FormDataaaa:', formData)

      console.log('FormData:', Array.from(formData.entries()));

      const res= await AddAccessories(authState.accessToken, authState.branch_id, formData);

      alert(res.message)
    } catch (error) {
      console.error('Error saving clothes item:', error);
      alert('Failed to save clothes item. Please try again later.');
    }
  };

  return (
    <div className={classes.form}>
      <TextInput label="Name" name="name" value={clothes.name} onChange={handleNameChange} />
      <TextInput label="Description" name="description" type="text" value={clothes.description} onChange={handleDescriptionChange} />

      <TextInput label="Price" name="price" type="number" value={clothes.price} onChange={handlePriceChange} />
      <TextInput label="Brand" name="brand" type="text" value={clothes.brand} onChange={handlebrandChange} />
      <FileInput label="Image URL" name="image" onChange={handleFileChange} />
      <MultiSelect
        label="Colors"
        name="colors"
        value={clothes.colors}
        searchable
        data={['Black', 'Grey', 'Red', 'Blue', 'Orange', 'White', 'Brown', 'Pink', 'Yellow', 'Green', 'Purple']}
        onChange={handleColorsChange}
      />

      {clothes.colors.length > 0 && clothes.colors.map(color => (
        <div key={color}>
          <h4>{color}</h4>
          <Checkbox.Group
            label="Sizes"
            value={clothes.colorDetails[color].sizes}
            onChange={(sizes) => handleSizeChange(color, sizes)}
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
          {clothes.colorDetails[color].sizes.length > 0 && clothes.colorDetails[color].sizes.map(size => (
            <NumberInput
              key={`${color}-${size}`}
              label={`Amount for ${size}`}
              value={clothes.colorDetails[color].amounts[size] || 0}
              onChange={(amount) => handleAmountChange(color, size, amount)}
            />
          ))}
        </div>
      ))}

      <Button onClick={handleSubmit} fullWidth className={classes.btn}>Save</Button>
    </div>
  );
};

export default ClothesForm;
