import React,{ useState ,useEffect} from 'react';
import { Container, Title } from '@mantine/core';
import VouchersTable from './VouchersTable';
import PointsInterface from '../interfaces/PointsInterface';
import {getPoints} from '../ApiServices/AdminServices';
import {  useAuth } from '../AuthContext';
import classes from './Point.module.css'


const Point = () => {
    const [data, setData]= useState([]);
    const {authState}= useAuth()

    useEffect(()=>{
        const points=async()=>{
            try {
                            const response = await getPoints(authState.accessToken);
                            console.log("res ", response)
                            setData(response);
                        } catch (error) {
                            console.error('Error:', error);
                        }
        }
        points();
    },[authState.accessToken])
  return (
    <Container>

      <Title order={2} align="center" my="lg" className={classes.title}>
        Points Management
      </Title>
      <PointsInterface data={data} />
    </Container>
  );
};

export default Point;
