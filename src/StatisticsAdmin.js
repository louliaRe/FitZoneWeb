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
            const chartData = Object.keys(response.gyms_data).map((gym_id) => ({
                gym_id,
                branchCount: response.gyms_data[gym_id].branch_count,
                numRatings: response.gyms_data[gym_id].num_ratings,
                avergBranchesRating: response.gyms_data[gym_id].avg_branches_rating,
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
          styles={{
            legendItemName: { color: "white" },
          }}
          legendProps={{ verticalAlign: "bottom", height: 50 }}
          series={[
            {
              name: "branchCount",
              color: "violet.6",
            },
            {
              name: "numRatings",
              color: "teal.6",
            },
            {
              name: "avergBranchesRating",
              color: "blue.6",
            },
          ]}
          withLegend
        />
      </Layout>
    </>
  );
};

export default StatisticsAdmin;
