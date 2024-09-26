import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/';


export const CreateHall= async (accessToken,branchId, data) =>{
    try{
        const response = await axios.post(  `${API_URL}diagram/${branchId}/`,
        data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }}
            )
            console.log("res of adding hall:", response)
    }catch(error){
        console.error("errorAdding hall",error);
        throw error.response.data;
}
}

export const GitHalls = async(accessToken,branchId) =>{
    try{
        const res= await axios.get(`${API_URL}diagram/${branchId}/`, {
            headers:{
                Authorization:`Bearer ${accessToken}`,
            }
        })
        console.log("res of getting halls", res.data)
        return res.data.results
    }catch(error){
        console.error("error getting  halls", error)
        throw error;
    }
}


export const getDisease = async (accessToken)=>{
    try{
        const response = await axios.get(`${API_URL}disease/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }})
            console.log("res of getting diseases:", response.data)
            return response.data;
    }catch(error){
        console.error("error getting diseases",error);
        throw error;


}
}

export const getExercises = async (accessToken )=>{
    try{
        const response = await axios.get(`${API_URL}diagram/exercises/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }})
            console.log("res of getting exercises:", response.data)
            return response.data;
    }catch(error){
        console.error("error getting exercises",error);
        throw error;

}
}

  export const getAllMachines = async (accessToken )=>{
    try{
        const response = await axios.get(`${API_URL}diagram/equipment/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }})
            console.log("res of getting machines:", response.data.results)
            return response.data.results; 
    }catch(error){
        console.error("error getting machines",error);
        throw error;
    }
}

export const AddMachineToCertainHall = async (accessToken, diagram_id, data)=>{
    console.log("Add to hall", JSON.stringify(data)  )
    try{
        const response= await axios.post(`${API_URL}diagram/equipment-create/${diagram_id}/`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log ("res of  Add Machine To Certain Hall ", response)
        return response.data;

    }catch(error){
        console.error("error adding Machine To Certain Hall", error )
        throw(error)
    }
}
export const AddMachine = async (accessToken, machineData ) =>{
    console.log("add new machine", JSON.stringify(machineData)  )
    try{
      const response= await axios.post(`${API_URL}diagram/equipment/`, machineData,{
        headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`
        }
      })
      console.log("adding new machine", response.data)
      return response.data;
    }catch(error){
    console.error("error adding machine", error)
    throw(error)
    }
}

export const GetMachinesInside = async (accessToken, hallId  ) =>{
    try{
      const response= await axios.get(`${API_URL}diagram/equipment-create/${hallId}/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
      })
      console.log("get mach",response.data)
      return(response.data)
    }catch(error){
      console.error("error getting machines inside hall", error)
    }
}

export const AddExerciseToMachine = async (accessToken, machineId , data)=>{
    try{
      const response= await axios.post(`${API_URL}diagram/exercise-create/${machineId}/`,data, {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
      })
      console.log("add exercise", response.data)
      return response.data;
    }catch(error){
      console.error("error adding exercise to machine", error)
      throw(error);
    }
}

// http://localhost:8000/diagram/equipment/151/
export const getMachineInfo = async (accessToken, machineId  )=>{
    try{
      const response= await axios.get(`${API_URL}diagram/equipment/${machineId}/`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
      })
      console.log("get machine info",response.data)
      return(response.data)
    }catch(error){
      console.error("error getting machine info", error)
    }
}

// http://localhost:8000/diagram/<int:diagram_id>/<int:branch_id>/

export const UpdateDiagram= async (accessToken, hallId ,branch_id, data )=>{
    console.log("updateDiagram", JSON.stringify(data));
    try{
      const response= await axios.put(`${API_URL}diagram/${hallId}/${branch_id}/`, data, {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
      })
      console.log("update machine", response.data)
    }catch(error){
      console.error("error updating machine", error)
    }
}



// export  const deleteMachine = async (accessToken, machineId )=>{
//     try{
//       const response= await axios.delete(`${API_URL}diagram/equipment/${machineId}/`,{
//         headers:{
//             Authorization: `Bearer ${accessToken}`
//         }
//       })
//       console.log("delete machine", response.data)
//     }catch(error){
//       console.error("error deleting machine", error)
//     }
// }