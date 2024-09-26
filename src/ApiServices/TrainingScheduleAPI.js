import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/';




export const getExerciseseq= async (accessToken, branch_id) =>{
    try{
        const response = await axios.get(`${API_URL}diagram/${branch_id}/`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("Exercise sequence fetched successfully:", response.data);
        return response.data.results;
    }
    catch(error){
        console.error("Error fetching exercise sequence:", error);
        throw error;
    }
}
export const GetPlan = async (accessToken, gymId) => {
    try {
        const response = await axios.get(`${API_URL}plans/gym-details/${gymId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("Plan fetched successfully:", response.data);
        return response.data;
    } catch (e){
        console.error("Error fetching plan:", e);
        throw e;
    }
}

export const CreatePlan = async (accessToken, gymId, data) => {
    try {
        console.log("Plan data:",JSON.stringify(data));
        const response = await axios.post(`${API_URL}plans/gym/${gymId}/`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("Plan created successfully:", response.data);
        return response.data;
    } catch (e){
        console.error("Error creating plan:", e);
        throw e;
    }
}

// export const UpdatePlan = ()