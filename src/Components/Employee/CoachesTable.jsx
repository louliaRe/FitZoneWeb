import React, {useState, useEffect  } from 'react';
import { Button, Table, ActionIcon, Container, Modal, TextInput, PasswordInput } from '@mantine/core';
import { IconTrash,IconPencil } from '@tabler/icons-react';

import classes from './CoachesTable.module.css';


const CoachesTable = ({ initdata }) => {
    const [data, setData]=useState(initdata);
    const [opened, setOpened] = useState(false);
  const [currentCoach, setCurrentCoach] = useState(null);

  useEffect(() => {
    setData(initdata);
}, [initdata]);

console.log("dada:", data)

  const handleEditClick = (coach) => {
    setCurrentCoach(coach);
    setOpened(true);
  };

  const handleEditChange = (e) => {
    setCurrentCoach({ ...currentCoach, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setData(data.map(coach => (coach.employee.trainer_id === currentCoach.employee.trainer_id ? currentCoach : coach)));
    setOpened(false);
  };

  console.log("data before:", data)
  const rows = data.map((coach) => (
    <Table.Tr key={coach.employee.user.id}>
      <Table.Td>{coach.employee.user.username}</Table.Td>
      <Table.Td>{coach.employee.user.email}</Table.Td>
      <Table.Td>{coach.employee.user.age}</Table.Td>
      <Table.Td>{coach.online_training_price}</Table.Td>
      <Table.Td>{coach.private_training_price}</Table.Td>
      <Table.Td>{coach.rate}</Table.Td>
      <Table.Td>{coach.allow_public_posts? 'yes' : 'No'}</Table.Td>


      {/* allow_public_posts */}
     

      
    </Table.Tr>
  ));
  const handleDelete = (id) => {
    const newData = data.filter(coach => coach.id !== id);
    setData(newData);
  };

  return (
    <Container >
    <Table className={classes.tablee} horizontalSpacing="lg" verticalSpacing="lg"  withTableBorder withColumnBorders withRowBorders >
      <Table.Thead className={classes.head}>
        <Table.Tr>
          <Table.Th>Username</Table.Th>
          {/* <Table.Th>Gym</Table.Th> */}
          <Table.Th>Email</Table.Th>
          <Table.Th>age</Table.Th>
          <Table.Th>Online training price</Table.Th>
          <Table.Th>Private training price</Table.Th>

          <Table.Th>Rate</Table.Th>
          <Table.Th>Puplic post? </Table.Th>




        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Scroll page to see sticky thead</Table.Caption>
    </Table>
    <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Coach">
        {currentCoach && (
          <form onSubmit={handleEditSubmit}>
           
            <TextInput
              label="Username"
              type="text"
              name="username"
              value={currentCoach.username}
              onChange={handleEditChange}
              required
            />
        
            <TextInput
              type="email"
              name="Email"
              label='Email'
              value={currentCoach.Email}
              onChange={handleEditChange}
              required
            />
            <PasswordInput
              label='Password'
              type="password"
              name="password"
              value={currentCoach.password}
              onChange={handleEditChange}
              required
            />
            
            <Button type="submit" color="#a1E533" className={classes.submit}>Save Changes</Button>
          </form>
        )}
      </Modal>
    </Container>
  );
};

export default CoachesTable;
