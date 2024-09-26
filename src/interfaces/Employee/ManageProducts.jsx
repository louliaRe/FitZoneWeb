// scr/interfaces/employee/ManageProduct.js

import React, { useEffect, useState } from "react";
import {
  Button,
  Group,
  Modal,
  TextInput,
  NumberInput,
  Container,
  Stack,
} from "@mantine/core";
import { fetchProducts } from "../../ApiServices/StoreServices";
import { useParams } from "react-router-dom";
import classes from "./ManageProducts.module.css";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import ProductsTable from "../../Components/Employee/ProductsTable";
import Layout from "../../LayoutA";
import { FaSearch } from "react-icons/fa";

const ManageProduct = () => {
  const { categoryId } = useParams();
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await fetchProducts(
          authState.accessToken,
          authState.branch_id,
          categoryId
        );
        setProducts(data);
        console.log("pro", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    console.log("products", products);
    fetchAllProducts();
  }, [authState.accessToken, authState.branch_id, categoryId]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Layout>
      <Stack
        mt={40}
        style={{
          border: "1px solid #a1e533",
          borderRadius: 10,
          backgroundColor: "#2c2c2c",
          padding: 10,
        }}
      >
        <div className="TB" style={{ padding: "0px 16px" }}>
          <h1 style={{ color: "#fff" }}>Products</h1>

          <TextInput
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className={classes.search}
            style={{ padding: "5px", fontSize: "16px" }}
            leftSection={<FaSearch />}
          />

          <Button
            onClick={() => navigate("/EmpAddItem")}
            color="#a1E533"
            size="sm"
          >
            New product
          </Button>
        </div>

        <ProductsTable products={products} />
      </Stack>
    </Layout>
  );
};
export default ManageProduct;
