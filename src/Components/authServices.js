import axios from 'axios';

export const loginUser = async (username, password) => {
    
    try {
        const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
            username,
            password
        });
        console.log('Response Data:', response.data); // Debugging
        if(response.data.error){
        alert(response.data.error)
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            
            console.error('Error Response:', error.response.data.error); 
            throw new Error(error.response.data.error || 'Login failed');
        } else if (error.request) {
            // Request & no response received
            console.error('Error Request:', error.request); 
            throw new Error('No response from server');
        } else {
            console.error('Error:', error.message); 
            throw new Error('An error occurred while logging in');
        }
    }
};