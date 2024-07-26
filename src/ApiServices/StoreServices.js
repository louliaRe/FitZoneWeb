import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

// Fetch all cat
export const fetchCategories = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}store/category/`,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProducts= async (accessToken, branch_id, categoryId)=>{

  try{
   const response = await axios.get(`${API_URL}store/category/products/${categoryId}/${branch_id}/`,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }    
   });
   console.log("res of fetchproducts:", response)
   return response.data;
  }catch(error){ 
    console.error('error in fetching product', error)
    throw error;

  }
};

export const updateProduct = async(accessToken, branch_id, data) =>{
  try {
    const response = await axios.put(`${API_URL}store/product/${branch_id}`, data,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("res of Edit product:", response)

    return(response)
  }catch(error){
    console.error('error fetching product', error)
    throw error;
  }
};

export const deleteProduct = async (accessToken, branch_id, id)=>{
  try{
     const respons = await axios.delete(`${API_URL}store/product/${branch_id}/${id}`,{
     headers:{
      Authorization: `Bearer ${accessToken}`
    }
    });
    console.log("res of delete:", respons);
    return (respons)
  }catch(error){
         console.error('error deleting product', error)
         throw error;
  }
}

export const AddProduct = async(accessToken,cat,branch_id)=>{
  try{

    const response= await axios.post(`${API_URL}store/product/meals/${branch_id}/`, )
  }catch(error){
    console.error('error adding pro:', error)
  }
} 