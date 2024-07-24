import axios from 'axios';
import moment from "moment";



const API_URL = 'http://127.0.0.1:8000';

export const getManagedGyms = async (refrechToken) => {
    try {
        const response = await axios.get(`${API_URL}/gym/manager/`, {
            headers: {
                Authorization: `Bearer ${refrechToken}`
            }
        });
        console.log("res of getManagedGyms:", response.data.gyms_data);
        return response.data.gyms_data;
        } catch (error) {
        console.error('Error fetching gyms:', error.response || error.message);
        throw new Error(error.response ? error.response.data.message : 'An error occurred while fetching gyms');
    }
};

export const getBranches= async (id, accessToken)=>{
    try{

        const response = await axios.get(`${API_URL}/gym/branch/${id}`,{
            headers:{
            Authorization:`Bearer ${accessToken}`
            }
        });
        console.log("the branches of  ",response.data)
        return response.data;

    }catch(error){
       console.error("error fetching branches:" ,error.response.data)
         throw new Error(error.response? error.response.data.message : 'An error occurred while fetching branches')
    }
}
export const updateBranch = async (id, data, accessToken) => {
    console.log("update:", data)
    try {
        const response = await axios.put(`${API_URL}/gym/branch-detail/${id}`, data, {
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("update branch:",response )

        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'An error occurred while updating the branch');
    }
};

export const deleteBranch = async (id) => {
    try {
        await axios.delete(`${API_URL}/gym/branch-detail/${id}/`);
        console.log("delete branch:" )
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'An error occurred while deleting the branch');
    }
};

export const getEmployees = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/gym/employee/${id}`);
        console.log("get emp:",response.data )
        return response.data;
    } catch (error) {
        console.error('Error get employees:', error.message);
        throw new Error(error.response ? error.response.data.message : 'An error occurred while fetching employees');
    }
};

export const postEmployee = async (id, newEmp) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const formatDate = moment(newEmp.birthday).format("YYYY-MM-DD");
    try {
        const data = {
            user: {
                username: newEmp.username,
                email: newEmp.Email,
                password: newEmp.password,
                password2: newEmp.password, 
                birth_date: formatDate
            },
            shift: {
                days_off: {
                    day1: newEmp.days_off[0], // Assuming days_off is an array
                    day2: newEmp.days_off[1]  // Adjust as needed
                },
                shift_type: newEmp.shift
            },
            start_date: currentDate
        };

        console.log("Sending POST request to add employee:", {
            url: `${API_URL}/gym/employee/${id}`,
            data
        });

        const response = await axios.post(`${API_URL}/gym/employee/${id}/`, data);
        console.log("Employee added:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding employee:', error.message);
        throw new Error(error.response ? error.response.data.message : 'An error occurred while adding employee');
    }
}
