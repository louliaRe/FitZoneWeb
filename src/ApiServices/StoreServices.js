import axios from 'axios';

// const BASE_API = 'http://8080:'; 

// Fetch all cat
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_API}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
