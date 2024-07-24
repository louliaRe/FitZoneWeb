import React from 'react';
import { PieChart } from '@mantine/charts';
import { Card, Title } from '@mantine/core';
import './AdminStatistics.css';

const AdminStatistics = () => {
  const data = [
    { name: 'USA', value: 400, color: 'indigo' },
    { name: 'India', value: 300, color: 'yellow' },
    { name: 'Japan', value: 100, color: 'teal' },
    { name: 'Other', value: 200, color: 'gray' },
  ];

  return (
    <Card shadow="xl" padding="lg" className="card">
      <Title className="text">Statistics</Title>
      <PieChart withLabelsLine labelsPosition="inside" labelsType="percent" withLabels data={data} />
    </Card>
  );
};

export default AdminStatistics;
