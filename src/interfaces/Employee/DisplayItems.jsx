import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  TextInput,
  Modal,
  FileInput,
} from "@mantine/core";
import ItemCard from "../../Components/Employee/ItemCard";
import classes from "./DisplayItems.module.css";
import { useNavigate } from "react-router-dom";
import Layout from "../../LayoutA";
import { FaSearch } from "react-icons/fa";

const DisplayItem = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Item 1",
      details: "Details about item 1",
      price: 10,
      image: "https://via.placeholder.com/160x160?text=Item+1",
    },
    {
      id: 2,
      name: "Item 2",
      details: "Details about item 2",
      price: 20,
      image: "https://via.placeholder.com/160x160?text=Item+2",
    },
    {
      id: 3,
      name: "Item 3",
      details: "Details about item 3",
      price: 30,
      image: "https://via.placeholder.com/160x160?text=Item+3",
    },
    {
      id: 4,
      name: "Item 3",
      details: "Details about item 3",
      price: 30,
      image: "https://via.placeholder.com/160x160?text=Item+3",
    },
    {
      id: 5,
      name: "Item 3",
      details: "Details about item 3",
      price: 30,
      image: "https://via.placeholder.com/160x160?text=Item+3",
    },
    {
      id: 6,
      name: "Item 3",
      details: "Details about item 3",
      price: 30,
      image: "https://via.placeholder.com/160x160?text=Item+3",
    },
    {
      id: 7,
      name: "Item 3",
      details: "Details about item 3",
      price: 30,
      image: "https://via.placeholder.com/160x160?text=Item+3",
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    price: null,
    description: "",
    size: "",
    img: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isModal2Open, setisModal2Open] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      setItems(items.filter((item) => item.id !== id));
      //delete item api
    }
  };

  const handleSave = () => {
    setItems(
      items.map((item) => (item.id === currentItem.id ? currentItem : item))
    );
    setIsModalOpen(false);
    //post api
  };

  const handleAddNewItem = () => {
    navigate("/AddItem");
    // setisModal2Open(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Placeholder for fetching items from the backend
  }, []);

  return (
    <Layout>
      <Container>
        <div className={classes.HS}>
          <h1>FitZone Store</h1>
          <TextInput
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            style={{
              width: "200px",
              padding: "5px",
              fontSize: "16px",
            }}
            className={classes.search}
            leftSection={<FaSearch />}
          />

          <Button color="#a1E533" onClick={handleAddNewItem}>
            New Item
          </Button>
        </div>
        <Grid grow gutter="md">
          {items.map((item) => (
            <Grid.Col key={item.id} span={12}>
              <ItemCard
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid.Col>
          ))}
        </Grid>
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Edit Item"
          centered
        >
          {currentItem && (
            <div>
              <TextInput
                label="Name"
                value={currentItem.name}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, name: e.target.value })
                }
              />
              <TextInput
                label="Details"
                value={currentItem.details}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, details: e.target.value })
                }
              />
              <TextInput
                label="Price"
                type="number"
                value={currentItem.price}
                onChange={(e) =>
                  setCurrentItem({
                    ...currentItem,
                    price: parseFloat(e.target.value),
                  })
                }
              />
              <TextInput
                label="Image URL"
                value={currentItem.image}
                onChange={handleChange}
              />
              <Button
                color="#a1E533"
                onClick={handleSave}
                style={{ marginTop: "10px" }}
              >
                Save
              </Button>
            </div>
          )}
        </Modal>

        <Modal
          opened={isModal2Open}
          onClose={() => isModal2Open(false)}
          title="Add new item"
          centered
        >
          <TextInput
            label="Name"
            value={newItem.name}
            onChange={handleChange}
          />
          <TextInput
            label="Details"
            value={newItem.details}
            onChange={handleChange}
          />
          <TextInput
            label="Price"
            type="number"
            value={newItem.price}
            onChange={handleChange}
          />
          <FileInput
            label="Image URL"
            value={newItem.img}
            onChange={handleChange}
          />
          <Button
            color="#a1E533"
            onClick={handleSave}
            style={{ marginTop: "10px" }}
          >
            Save
          </Button>
        </Modal>
      </Container>
    </Layout>
  );
};

export default DisplayItem;
