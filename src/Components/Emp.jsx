import React, { useState, useEffect } from "react";
import { Button, Table, ActionIcon, Container } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import "./Emp.css";

const Emp = ({ initdata }) => {
  const [data, setData] = useState(initdata);

  useEffect(() => {
    setData(initdata);
  }, [initdata]);

  console.log("data:", data);
  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.employee.user.username}</Table.Td>
      <Table.Td>{item.employee.user.age}</Table.Td>

      <Table.Td>{item.employee.user.email}</Table.Td>
      <Table.Td>{item.shift_type}</Table.Td>
      <Table.Td>
        {item.days_off.day1} {item.days_off.day2}
      </Table.Td>
      <Table.Td>{item.employee.start_date}</Table.Td>

      <Table.Td>
        {" "}
        <ActionIcon
          size="xl"
          color="#86ef2b"
          onClick={() => handleDelete(item.id)}
          aria-label="Delete"
        >
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  return (
    <Table
      className="tablee"
      horizontalSpacing="lg"
      verticalSpacing="lg"
      withTableBorder
      withColumnBorders
      withRowBorders
    >
      <Table.Thead className="head">
        <Table.Tr>
          <Table.Th>Username</Table.Th>
          <Table.Th>Age</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Shift</Table.Th>
          <Table.Th>Off days</Table.Th>
          <Table.Th>Start_date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Scroll page to see sticky thead</Table.Caption>
    </Table>
  );
};

export default Emp;
