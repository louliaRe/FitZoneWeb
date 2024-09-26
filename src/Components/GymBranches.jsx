import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Container } from '@mantine/core';

const GymBranches = () => {
  const { gymId } = useParams();
  const branches = [
    { id: 1, name: 'Branch 1' },
    { id: 2, name: 'Branch 2' },
  ];

  const navigate = useNavigate();

  return (
    <Container>
      <h1>Branches of Gym {gymId}</h1>
      {branches.map((branch) => (
        <Card key={branch.id} shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
          <h2>{branch.name}</h2>
          <Button onClick={() => navigate(`/gyms/${gymId}/employees`)}>View Employees</Button>
        </Card>
      ))}
    </Container>
  );
};

export default GymBranches;
