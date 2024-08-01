import axios from "axios";


const API_URL = 'http://127.0.0.1:8000';


//Manage Coaches

export const addCoach = async (data, accessToken, id) => {
    try {
        console.log("Request Data:", JSON.stringify(data, null, 2));
        const response = await axios.post(`${API_URL}/gym/trainer/${id}/`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log("adding C req:", data);
        console.log("response of adding coach", response.message)

        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'An error occurred while adding the coach');
    }
};

export const getCoaches = async (accessToken, id) => {
    try {
        console.log("ref", accessToken)

        const response = await axios.get(`${API_URL}/gym/trainer/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
               
            },
            
            // params:{
            //     'branch_id': id,
            // }
            
        });
        console.log("get coaches",response)
        console.log("get coaches api",`${API_URL}/gym/trainer/`)

        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'An error occurred while fetching coaches');
    }
};

export const updateCoach = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/gym/branch-detail/${id}/`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'An error occurred while updating the coach');
    }
};

//Manage Courses

export const getCourses = async (accessToken,id) =>{
    
    try{
        const respons= await axios.get(`${API_URL}/classes/${id}`,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
               
            },

        });
        return respons.data;
    }catch(error){
        throw new Error(error.respons? error.respons.config: 'An error occured while getting courses')
    }

    }

    export const addCourse = async (accessToken,data, id) =>{
        try{
            console.log("Course Data to be sent:", JSON.stringify(data, null, 2)); // Debugging log

            const respons= await axios.post(`${API_URL}/classes/${id}/`,{
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                },
                //  params: {
                //     'Branch-Id': id,
                // },
            });
            return respons.data;
        } catch (error) {
            if (error.response) {
              throw error.response;
            } else {
              throw new Error('An error occurred while posting course');
            }
          }
        };



        //Community
    export const addPost = async (accessToken,formData,gym_id)=>{
        console.log("Posting a post:",formData )

        try{
            console.log("con acc po", accessToken)

          const response= await axios.post(`${API_URL}/community/${gym_id}/`, formData, {
            headers:{
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            }
          });
          return response.data;
        }catch(error){
            if(error.response){
                throw error.response.data;

            }else{
                throw new Error('An error occurred while posting');
            }
        }
    };

    export const getPosts= async(accessToken,gym_id)=>{
        console.log("gett")
        try{
          const response = await axios.get(`${API_URL}/community/${gym_id}`,{
            headers:{
                Authorization: `Bearer ${accessToken}`,
              

            },
          });
          console.log("res of getpost", response.data)
          return response.data;
         
        }catch(error){
            if(error.data){
                throw error.data;

            }else{
                throw new Error('An error getting posts');
            }
        }
    } 
    
    export const deletePost = async (accessToken, postId, gym_id)=>{

        try{
            const res = await axios.delete(`${API_URL}/community/${postId}/${gym_id}`,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                },
            });
            console.log("res of delete",res.data)
            return (res.data)
        }
        catch(error){
            console.log("error delete", error.res)
            return(error)
        }
    }

    export const UpdatePost = async (accessToken, postId, gym_id,editedPost)=>{
         console.log("in edit", editedPost)
        try{
            console.log("inside edit api:", JSON.stringify(editedPost, null,2))
            const res = await axios.put(`${API_URL}/community/${postId}/${gym_id}/`,editedPost,{
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log("res of update",res)
            return (res)
        }
        catch(error){
            console.log("error update", error.res)
            return(error)
        }
    }

    export const accept= async(accessToken, postId, gym_id, approve)=>{
        console.log("is approve?", approve)
        try{

         const res = await axios.post(`${API_URL}/community/${postId}/${gym_id}/`,
         { is_approved: approve }
         ,{
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                   
                },
            });
            console.log("res of update",res)
            return (res)
        }
        catch(error){
            console.log("error update", error.res)
            return(error)
        }
    }
    