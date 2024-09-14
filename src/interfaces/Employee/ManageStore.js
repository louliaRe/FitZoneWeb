import React, { useEffect, useState } from 'react';
import { Container, Card,Text } from '@mantine/core';
import CategoryCard from '../../Components/Employee/CategoryCard';
import { useNavigate } from 'react-router-dom';
import classes from './ManageStore.module.css';
import { fetchCategories } from '../../ApiServices/StoreServices';
import { useAuth } from '../../AuthContext';

const ManageStore = () => {
    const navigate= useNavigate();
    const {authState} = useAuth(); 
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("insidde")
    const fetchCat = async() =>{
      try{
      const cats= await fetchCategories(authState.accessToken);
      setCategories(cats);
      console.log("get cat", cats)

      }catch(error){
         console.error("error fetching categories:",error);
      }
    };
    fetchCat();
  }, [authState]);

  return (
    <Container>
      <h1>FitZone Store</h1>
      <div>
        {categories.map(category => (
        
            <CategoryCard category={category} />
        ))}

    
      </div>
     
    </Container>
  );
};

export default ManageStore;
