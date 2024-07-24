import React, { useEffect, useState } from 'react';
import { Card, Image, Text, Badge, Button, Group,Radio } from '@mantine/core';
import { useAuth } from '../AuthContext';
import { getManagedGyms, getBranches } from '../ApiServices/ManagerServices';
import { useNavigate } from 'react-router-dom';
import classes from '../Components/GymsCardList.module.css'

const GymsCardList = () => {
    const { authState } = useAuth();
    const [gyms, setGyms] = useState([]);
  

    const navigate = useNavigate();  
    console.log("list")
    console.log("acc token:",)


    useEffect(() => {
        const fetchGyms = async () => {
            console.log("inside fetchGyms");

            try {
                const gymsData = await getManagedGyms(authState.accessToken);
                setGyms(gymsData);
                console.log("gym data:", gymsData);
            } catch (error) {
                console.error('Error fetching gyms:', error.message);
            }
        };

        if (authState.accessToken) {
            fetchGyms();
        }
    }, [authState.accessToken]);

    // const handleViewEmp = (id) => {
    //     console.log("id card:", id)
    //     navigate(`/ManagerEmpTable/${id}`);
    // };
        const handleViewBranches=(id)=>{
            navigate(`/Branches/${id}`)
        }

    return (
        <div>
             {Array.isArray(gyms) && gyms.length > 0 ? (
                gyms.map((gym) => (
                    <Card key={gym.id} shadow="sm" padding="lg" className={classes.card1}>
                        <Card.Section>
                        <Image
                         src="./gym.png"
                          height={160}
                          
                          alt="Gym"
                          style={{width:'600px'}}
                           />
                         </Card.Section>
                        <Group position="apart" style={{ marginBottom: 5, marginTop: '20px' ,}}>
                            <Text className={classes.name}>{gym.name}</Text>
                            <Badge color="lime" variant="light">
                                {gym.fees.length>0?`${gym.fees[0].type} : ${gym.fees[0].fee} - ${gym.fees[1].type} : ${gym.fees[1].fee}`:''}
                            </Badge>
                        </Group>

                        <Text size="sm" style={{ lineHeight: 1.5 }}>
                            {gym.description}
                        </Text>
                        <Button variant="filled" color="lime" fullWidth style={{ marginTop: 14 }}  onClick={() => handleViewBranches(gym.id)}>
                            view branches
                        </Button>
                        {/* <Button variant="filled" color="lime" fullWidth style={{ marginTop: 14 }}  onClick={() => handleViewEmp(gym.id)}>
                            view employees
                        </Button> */}
                    </Card>
                ))
            ) : (
                <Text>No gyms available</Text>
            )}
        </div>
    );
};

export default GymsCardList;