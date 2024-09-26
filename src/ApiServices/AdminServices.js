import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const addGym = async (gymData) => {
  try {
    console.log("Gym Data to be sent:", JSON.stringify(gymData, null, 2));

    const response = await axios.post(`${API_URL}/gym/`, gymData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("add:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding gym:", error);
    throw error.message;
  }
};

export const getGyms = async () => {
  try {
    const response = await axios.get(`${API_URL}/gym/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("get gyms:", response.data.results);

    return response.data.results;
  } catch (error) {
    console.error("Error fetching gyms:", error);
    if (error.response) {
      console.error("Server response data:", error.response.data);
    }
    throw error;
  }
};
export const getBranches = async (accessToken, gymId) => {
  try {
    const response = await axios.get(`${API_URL}/gym/branch/${gymId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("branches hereeeee:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching branches:", error);

    throw error;
  }
};

export const deleteGym = async (accessToken, id) => {
  console.log("id:", id);
  console.log(`${API_URL}/gym/${id}`);
  try {
    const response = await axios.delete(`${API_URL}/gym/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("delete", response.data);
    return response.data;
    window.location.reload();
  } catch (error) {
    console.log("Error deleting:", error);
    throw error;
  }
};

export const EditGym = async (accessToken, id) => {
  console.log("id:", id);
  console.log(`${API_URL}/gym/${id}`);
  try {
    const response = await axios.put(`${API_URL}/gym/${id.id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("update", response.data);
    return response.data;
  } catch (error) {
    console.log("Error updating:", error);
    throw error;
  }
};

export const addBranch = async (accessToken, gymId, branchData) => {
  console.log("acc", accessToken);
  try {
    const response = await axios.post(
      `${API_URL}/gym/branch/${gymId}/`,
      branchData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("respons of add:", response);

    return response.data;
  } catch (error) {
    console.error("Error adding branch:", error);
    throw error;
  }
};

export const getVouchers = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/vouchers/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("res of getVouchers:", response.data);
    return response.data;
  } catch (e) {
    console.error("get vouchers", e);
    throw e;
  }
};

export const addVoucher = async (accessToken, data) => {
  console.log("data Of adding vouchee", JSON.stringify(data));
  try {
    const res = await axios.post(`${API_URL}/vouchers/`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("res of add voucher:", res.data);
    return res.data;
  } catch (e) {
    console.error("add voucher", e);
    throw e;
  }
};
export const EditVouchers = async (accessToken, id, data) => {
  try {
    console.log("edit voucher", data);
    const res = await axios.put(`${API_URL}/vouchers/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("res of edit vouchers:", res);
    return res.data;
  } catch (e) {
    console.log("error edit", e);
    throw e;
  }
};

export const getPoints = async (accessToken) => {
  try {
    const res = await axios.get(`${API_URL}/points/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("res of get points:", res.data);
    return res.data;
  } catch (e) {
    console.error("get points", e);
    throw e;
  }
};

export const EditPoint = async (accessToken, id, points, points_percentage) => {
  console.log("post points", points);
  try {
    const res = await axios.put(
      `${API_URL}/points/${id}/`,
      { points, points_percentage },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("res of edit points:", res);
    return res.data;
  } catch (e) {
    console.log("error edit", e);
    throw e;
  }
};

//Statistics 

export const Statistics = async(accessToken)=>{
  try{
    const res = await axios.get(`${API_URL}/stats/admin/users/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("res of statistics:", res.data);
    return res.data;
  }catch(e){
    console.error("get statistics", e.response.data.error);
    throw e.response.data.error;
  }
}

// /stats/admin/gym/
export const StatisticsGym = async(accessToken)=>{
  try{
    const res = await axios.get(`${API_URL}/stats/admin/gym/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("res of statistics:", res.data);
    return res.data;
  }catch(e){
    console.error("get statistics", e.response.data.error);
    throw e.response.data.error;
  }
}