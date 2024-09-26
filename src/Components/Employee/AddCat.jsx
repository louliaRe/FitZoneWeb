import React, { useState } from "react";
import {
  Container,
  TextInput,
  Button,
  FileInput,
  Notification,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./AddCat.module.css";
import Layout from "../../LayoutA";

const AddCat = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  //   const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddCategory = async (event) => {
    event.preventDefault();

    // if (!name || !image) {
    //   setError('Name and image are required');
    //   return;
    // }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    //     try {
    //       await axios.post('http://api/categories', formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       });
    //       navigate('/manage-store');
    //     } catch (err) {
    //       setError('Error adding category');
    //       console.error(err);
    //     }
  };

  return (
    <Layout>
      <Stack
        align="center"
        mt={40}
        style={{
          border: "1px solid #a1e533",
          borderRadius: 10,
          backgroundColor: "#2c2c2c",
          padding: 20,
        }}
      >
        <h1>Add New Category</h1>
        <form onSubmit={handleAddCategory} className={classes.input}>
          <TextInput
            label="Category Name"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            styles={{
              label: {
                color: "#a1E533",
                fontWeight: "bold",
              },
            }}
            className={classes.field}
          />
          <FileInput
            label="Category Image"
            placeholder="Upload category image"
            accept="image/*"
            onChange={setImage}
            required
            styles={{
              label: {
                color: "#a1E533",
                fontWeight: "bold",
              },
            }}
          />
          <Button type="submit" color="#a1E533" className={classes.btn}>
            Add Category
          </Button>
        </form>
      </Stack>
    </Layout>
  );
};

export default AddCat;
