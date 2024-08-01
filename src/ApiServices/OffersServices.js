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
      const res= await axios.post(`${API_URL}/offers/percentage/class/${id}/`, data, {
        headers:{
            Authorization: `Bearer ${accessToken}`,
           
        },
      })
      console.log("adding course", res);
      return res.response.message;
    }catch(e){
        console.log("error: ", e);
    }
}