// scr/interfaces/employee/ManageProduct.js

import React, {useEffect, useState} from "react";
import { Button, Group, Modal, TextInput, NumberInput, Container } from "@mantine/core";
import { fetchProducts } from "../../ApiServices/StoreServices";
import { useParams } from 'react-router-dom';
import classes from './ManageProducts.module.css';
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import ProductsTable from "../../Components/Employee/ProductsTable";

const ManageProduct=()=>{
    const { categoryId } = useParams(); 
    const { authState } = useAuth(); 
    const navigate = useNavigate();
const [products, setProducts]= useState([]);
const [newMealProduct, setNewMealProduct] = useState({name:'', description:'', protien:0, calories:0,carbs:0, used_for:'', amount:100, price:null })
const [newSuppProduct, setNewSuppProduct] = useState({protien:0, calories:0,caffeine:100,weight:10,flavor:'',amount:100, price:null })
const [newAccProduct, setNewAccProduct] = useState({name:'', color:[], amount:60,  size:''})
// const [opened, { open, close }] = useDisclosure(false);
const [errors, setErrors] = useState({});
const [search, setSearch] = useState('');



useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await fetchProducts(authState.accessToken, authState.branch_id, categoryId);
        setProducts(data); // Ensure products are set here
        console.log("pro", data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchAllProducts();
  }, [authState.accessToken, authState.branch_id, categoryId]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

return(
    <Container>
    <div className="TB">

      <h1 style={{ color: '#fff' }}>Products</h1>


      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className={classes.search}
        style={{ padding: '5px', fontSize: '16px' }}
      />
     
      <Button onClick={()=>navigate('/EmpAddItem')} color="#a1E533" size="sm" className={classes.btn}>New product</Button>
    </div>

    <ProductsTable   products={products} />


       
        </Container>

)

}
export default ManageProduct;