import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; 

export const addGym = async (gymData) => {
    try {
        console.log("Gym Data to be sent:", JSON.stringify(gymData, null, 2)); 

        const response = await axios.post(`${API_URL}/gym/`, gymData, {
            headers: {
                'Content-Type': 'application/json'

            }
        });
        console.log("add:", response.data)
        return response.data;
    } catch (error) {
        console.error('Error adding gym:', error);  
        throw error.message;
    }
};

export const getGyms = async () => {
    try {
        const response = await axios.get(`${API_URL}/gym/`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("get gyms:",response.data.results )

        return response.data.results;
    } catch (error) {
        console.error('Error fetching gyms:', error);
        if (error.response) {
            console.error("Server response data:", error.response.data);
          }
          throw error;

    }
};
export const getBranches = async (accessToken,gymId) => {
    try {
      const response = await axios.get(`${API_URL}/gym/branch/${gymId}/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    });
      console.log("branches hereeeee:",response)
      return response.data;
    } catch (error) {
      console.error('Error fetching branches:', error);

      throw error;
    }
  };

export const deleteGym = async(accessToken, id)=>{
    console.log("id:",id)
    console.log(`${API_URL}/gym/${id}`)
    try{
        
        const response = await axios.delete(`${API_URL}/gym/${id}`,{
            headers:{
                Authorization: `Bearer ${accessToken}`


            }
        });
        console.log("delete", response.data)
        return response.data;
        window.location.reload() 
       }catch(error){
        console.log('Error deleting:', error)
        throw error;
    }
} 


export const EditGym = async(accessToken,id)=>{
    console.log("id:",id)
    console.log(`${API_URL}/gym/${id}`)
    try{
        
        const response = await axios.put(`${API_URL}/gym/${id.id}/`,{
            headers:{
                Authorization: `Bearer ${accessToken}`

            }
        });
        console.log("update", response.data)
        return response.data;
    }catch(error){
        console.log('Error updating:', error)
        throw error;
    }
} 

export const addBranch = async (accessToken,gymId, branchData) => {
    console.log("acc", accessToken)
    try {

      const response = await axios.post(`${API_URL}/gym/branch/${gymId}/`, branchData,{
      headers:{

         Authorization: `Bearer ${accessToken}`
      }
    });
      console.log("respons of add:", response)

      return response.data;
    } catch (error) {
      console.error('Error adding branch:', error);
      throw error;
    }
  };