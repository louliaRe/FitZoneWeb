import React, { useState } from "react";
import { FileInput, TextInput, Button, NumberInput, Grid } from "@mantine/core";
import classes from "./MealsForm.module.css";
import { AddProduct } from "../../ApiServices/StoreServices";
import { useAuth } from "../../AuthContext";
import Layout from "../../LayoutA";

const MealsForm = () => {
  const [newMeal, setNewMeal] = useState({
    name: "",
    brand: "",
    description: "",
    protien: 0,
    calories: 0,
    carbs: 0,
    used_for: "",
    amount: 100,
    price: 0,
    image_path: null,
  });
  const { authState } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeal({ ...newMeal, [name]: value });
  };

  const handleNumberChange = (name, value) => {
    setNewMeal({ ...newMeal, [name]: Number(value) });
  };

  const handleFileChange = (file) => {
    if (file) {
      setNewMeal({ ...newMeal, image_path: file });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const product = {
        name: newMeal.name,
        description: newMeal.description,
        category: 2,
        brand: newMeal.brand,
      };

      const meals = {
        protien: newMeal.protien,
        carbs: newMeal.carbs,
        calories: newMeal.calories,
        used_for: newMeal.used_for,
      };
      const details = {
        amount: newMeal.amount,
        price: newMeal.price,
      };

      formData.append("product", JSON.stringify(product));
      formData.append("meals", JSON.stringify(meals));
      formData.append("details", JSON.stringify(details));

      if (newMeal.image_path) {
        formData.append("image_path", newMeal.image_path);
      }
      console.log("im", newMeal.image_path);

      // Log FormData content
      // for (let pair of formData.entries()) {
      //   console.log(`${pair[0]}: ${pair[1]}`);
      // }

      const formObject = Object.fromEntries(formData.entries());

      console.log("form:", formObject);
      await AddProduct(authState.accessToken, authState.branch_id, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid className={classes.form}>
      <Grid.Col span={6}>
        <TextInput
          label="Meal Name"
          name="name"
          value={newMeal.name}
          onChange={handleChange}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Description"
          name="description"
          value={newMeal.description}
          onChange={handleChange}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Brand"
          name="brand"
          value={newMeal.brand}
          onChange={handleChange}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Protien"
          name="protien"
          value={newMeal.protien}
          onChange={(value) => handleNumberChange("protien", value)}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Calories"
          name="calories"
          value={newMeal.calories}
          onChange={(value) => handleNumberChange("calories", value)}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Carbs"
          name="carbs"
          value={newMeal.carbs}
          onChange={(value) => handleNumberChange("carbs", value)}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Amount"
          name="amount"
          value={newMeal.amount}
          onChange={(value) => handleNumberChange("amount", value)}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="This meal is used for"
          name="used_for"
          value={newMeal.used_for}
          onChange={handleChange}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <NumberInput
          label="Price"
          name="price"
          value={newMeal.price}
          onChange={(value) => handleNumberChange("price", value)}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <FileInput
          label="Image URL"
          name="image_path"
          onChange={handleFileChange}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Button onClick={handleSubmit} className={classes.btn}>
          Save
        </Button>
      </Grid.Col>
    </Grid>
  );
};

export default MealsForm;
