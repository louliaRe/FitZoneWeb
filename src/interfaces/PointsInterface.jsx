import React, { useState, useEffect } from 'react';
import { Table, Button, NumberInput, Container, Card, Grid, Text} from '@mantine/core';
import { Loader } from '@mantine/core';
import { Edit, Check } from 'tabler-icons-react';
import classes from './PointsInterface.module.css';
import { EditPoint } from '../ApiServices/AdminServices';
import { useAuth } from '../AuthContext';

const PointsInterface = ({ data }) => {
  console.log("data in points inter", data)
  const [pointsData, setPointsData] = useState(data);
  const [loading, setLoading]= useState(true);
  const {authState}= useAuth();


  useEffect(() => {
    if (data) {
      setPointsData(data);
      setLoading(false);
    }
  }, [data]);

  
  const handlePointsChange = (index, value) => {

    const updatedData = [...pointsData];
    updatedData[index].points = value;
    setPointsData(updatedData);
    console.log("pp", updatedData)
  };

  const handlePointsPercentageChange = (index, value) => {
    const updatedData = [...pointsData];
    updatedData[index].points_percentage = value;
    setPointsData(updatedData);
  };

    const handleSave = async (index) => {
      const pointToSave = pointsData[index];
      try {
        const res = await EditPoint(authState.accessToken, pointToSave.pk, pointToSave.points, pointToSave.points_percentage);    
  
    console.log('Updated Points Data:', res.message);
    alert (res.message);
  } catch (error) {
    console.error('Failed to save points data:', error);
  }
  };
  

  return (
    <Container >
    <Grid className={classes.container}>
      {pointsData.map((point, index) => (
        <Grid.Col span={6} key={point.pk}>
          <Card shadow="sm" p="lg" radius="md" withBorder className={classes.card}>
            <Grid>
              <Grid.Col span={5}>
                <h3>{point.activity}</h3>
              </Grid.Col>
              <Grid.Col span={3}>
                <NumberInput
                  label="Points"
                  value={point.points}
                  onChange={(value) => handlePointsChange(index, value)}
                  min={0}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <NumberInput
                label ="  Per%"
                  value={point.points_percentage}
                  onChange={(value) => handlePointsPercentageChange(index, value)}
                  min={0}
                  max={100}
                />
              </Grid.Col>
              <Grid.Col span={12} style={{ textAlign: 'right' }}>
                <Button
                  variant="filled"
                  color="#a1E533"
                  leftIcon={<Check size={14} />}
                  onClick={() => handleSave(index)}
                >
                  Save
                </Button>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  </Container>
  );
};

export default PointsInterface;
