import axios from "axios";


const API_URL= 'http://127.0.0.1:8000/'; 
//fetch all courses in the branch
export const getCourses = async (accessToken,id) =>{
    
    try{
        const response= await axios.get(`${API_URL}classes/${id}`,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
               
            },

        });
        console.log("courses",response)
        return response.data;
    }catch(error){
        console.log("error: ", error);
        throw new Error(error.respons? error.response.config: 'An error occured while getting courses')
    }
}

export const classOffer= async (accessToken, id, data)=>{

    try{
        console.log("create req:", JSON.stringify(data));
      const res= await axios.post(`${API_URL}offers/percentage/class/${id}/`, data, {
        headers:{
            Authorization: `Bearer ${accessToken}`,
           
        },
      })
      console.log("adding course", res.data.message);
      return res.data.message;
    }catch(e){
        console.log("error: ", e);
        throw (e);
    }
}

export const getClassOffers = async (accessToken, id) =>{
    try{
    
        const response = await axios.get(`${API_URL}/offers/percentage/class/${id}/`,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
               
            },
        })
        console.log("fetshing offers", response.data);
        return response.data;
    }catch(e){
        console.log("error", e);
        throw(e);
    }
}

export const UpdateClassOffer= async (accessToken, id, branch_id, data)=>{

    try{
        console.log("create req:", JSON.stringify(data));
      const res= await axios.put(`${API_URL}offers/percentage/${id}/${branch_id}/`, data, {
        headers:{
            Authorization: `Bearer ${accessToken}`,
           
        },
      })
      console.log("edit course", res.data);
      return res.data;
    }catch(e){
        console.log("error: ", e);
        throw (e);
    }
}

export const DeleteClassOffer= async (accessToken, id, branch_id)=>{

    try{
      const res= await axios.delete(`${API_URL}offers/destroy/${id}/${branch_id}/`, {
        headers:{
            Authorization: `Bearer ${accessToken}`,
           
        },
      })
      console.log("Deletes course", res);
      if (res.status===204){
        return "Deleted course successfully!"
      }else {
        return "Deleted course failed, try again"
      }
    }catch(e){
        console.log("error: ", e);
        throw (e);
    }
}
export const getCategories=async (accessToken)=>{
    try{
     const res = await axios.get(`${API_URL}store/category/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
           
        },
     })
     console.log("res of get cats:", res);
     return res.data
    }catch(e){
     console.error("get cats",e);
    }
}

export const getCategoryOffersPer=async (accessToken, branch_id)=>{
    try{
     const res = await axios.get(`${API_URL}offers/percentage/category/${branch_id}/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
           
        }, 
     })
     console.log("res of get Cat offers:", res);
     return res.data;
    }catch(e){
     console.error("e getCatOffers",e);
     throw e;
    }
}
export const addCategoryOffersPer=async (accessToken, branch_id, data)=>{
    try{
        console.log("addCategoryOffersPer req", JSON.stringify(data));
     const res = await axios.post(`${API_URL}offers/percentage/category/${branch_id}/`,data,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
           
        }, 
     })
     console.log("res of get Cat offers:", res);
     return res.data;
    }catch(e){
     console.error("e getCatOffers",e);
     throw e;
    }
}

//products price offers
export const getProducts= async (accessToken, branch_id)=>{
    try{
     const res = await axios.get(`${API_URL}store/branch/products/${branch_id}`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
           
        },
    })
     console.log("res of products:", res.data.results);
     return res.data.results;
    }catch(e){
      console.error("get products",e);
      throw e;
    }
}

export const getProductsOffers= async (accessToken, branch_id)=>{
    try{
     const res = await axios.get(`${API_URL}offers/price/products/${branch_id}/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
           
        }, 
     })
     console.log("res of products offers:", res);
     return res.data;
    }catch(e){
     console.error("e products offers",e);
     throw e;
    }
}

export const addProductOffer=async (accessToken, branch_id, data)=>{
    try{
        console.log("addProductOffer req", JSON.stringify(data));
     const res = await axios.post(`${API_URL}offers/price/products/${branch_id}/`,data,{
        headers:{
            Authorization: `Bearer ${accessToken}`,
           
        }, 
     })
     console.log("res of addProductOffer:", res);
     return res.data;
    }catch(e){
     console.error("e addProductOffer",e);
     throw e;
    }
}



export const addRegistrationOffer = async (accessToken, branch_id, data) => {
    try {
        console.log("AddRegistrationOffer req", JSON.stringify(data));
        const response = await axios.post(`${API_URL}offers/percentage/fee/${branch_id}/`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("response of adding registration offer:", response.data);
        return response.data.message;
    } catch (error) {
            console.error('Error adding registration offer:', error);
            throw error;
        }
    }


 export const getGymInfo= async (accessToken, gymId)=>{
    try{
        const response = await axios.get(`${API_URL}gym/fee/${gymId}/`, {
            headers: {
                Authorization:  `Bearer ${accessToken}`
            }
        });
        console.log("response of getting gym info", response);
        return response.data;
    }catch(e){
        console.error("error getting", e);
        throw e;
    }
 }
