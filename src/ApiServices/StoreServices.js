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
   const response = await axios.get(`${API_URL}store/category/products/${categoryId}/${branch_id}`,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }    
   });
   console.log("res of fetchproducts:", response.data.results);
   return response.data.results;
  }catch(error){ 
    console.error('error in fetching product', error)
    throw error;

  }
};

// export const updateProduct = async(accessToken, branch_id, data) =>{
//   try {
//     const response = await axios.put(`${API_URL}store/product/${branch_id}`, data,{
//       headers:{
//         Authorization: `Bearer ${accessToken}`
//       }
//     });

//     return(response)
//   }catch(error){
//     console.error('error fetching product', error)
//     throw error;
//   }
// };

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

export const AddProduct = async(accessToken,branch_id,formData)=>{
  try{
   console.log("addd:",JSON.stringify(formData));
    const response= await axios.post(`${API_URL}store/product/meals/${branch_id}/`,formData,{
      headers: {
        Authorization:`Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'

      }
    } )
    console.log("response of adding product: ", response);  
  }catch(error){
    console.error('error adding pro:', error)
  }
} 
export const AddSupplement = async(accessToken,branch_id,supplement)=>{
  try{
   console.log(supplement, "supplement");
    const response= await axios.post(`${API_URL}store/product/supplements/${branch_id}/`,supplement,{
      headers: {
        Authorization:`Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'

      }
    } )
    console.log("response of adding sup: ", response);  
  }catch(error){
    console.error('error adding sup:', error)
  }
} 


export const AddAccessories = async(accessToken,branch_id,formData)=>{
  try{
   console.log( "formData send ",JSON.stringify(formData));
    const response= await axios.post(`${API_URL}store/product/accessories/${branch_id}/`,formData,{
      headers: {
        Authorization:`Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'

      }
    } )
    console.log("response of adding accessories: ", response);  
  }catch(error){
    console.error('error adding accessories:', error)
  }
} 



export const fetchProductinsideSys = async (accessToken, branch_id, categoryId) =>{
   try{
    const response = await axios.get(`${API_URL}/category/products/${categoryId}/ `,{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    });
    console.log("response of fetching products:", response);

   }catch(error){
        console.error('error fetching products:', error);
        throw error
   }
}

export const EditProduct = async (accessToken, branch_product_id, data)=>{
  try{
     const response = await axios.put(`${API_URL}store/product/${branch_product_id}/`,data,{
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
     })
     console.log("res of Edit product:", response)
  
     return response.data;
  }catch(error){
 console.error(error)
throw error.response.data;
  }
}