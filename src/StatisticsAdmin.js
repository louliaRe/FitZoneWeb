import { BarChart } from '@mantine/charts';
import React, { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import { StatisticsGym } from './ApiServices/AdminServices';
import { useAuth } from './AuthContext';
import '@mantine/charts/styles.css';
import Layout from './LayoutA';


const StatisticsAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { authState } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await StatisticsGym(authState.accessToken);
        if (response && response.gyms_data) {
            const chartData = Object.keys(response.gyms_data).map(gym_id => ({
              gym_id, 
              branch_count: response.gyms_data[gym_id].branch_count, 
              num_ratings: response.gyms_data[gym_id].num_ratings,   
            }));
  
            setData(chartData);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching statistics', error);
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, [authState.accessToken]);

  console.log("ssssssss", data)
  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <Layout>
   <BarChart
        h={400}
        data={data}
        dataKey="gym_id" 
        type="stacked"

        series={[
          { name: 'Branch Count', dataKey: data.branch_count, color: 'violet.6' }, 
          { name: 'Number of Ratings', dataKey: data.num_ratings , color: 'teal.6' }, 
        ]}
        tickLine="xy"
        gridAxis="xy"
         labelFormatter={(gym_id) => `Gym ID: ${gym_id}`} // Custom label for gym_id
      />
      </Layout>
    </>
  );
};

export default StatisticsAdmin;
