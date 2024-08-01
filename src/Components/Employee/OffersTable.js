 import React, {useState,useEffect} from "react";
 import { Table, Container } from "@mantine/core";


 const OffersTable=({offer})=>{

    const [data,setData] = useState(offer);
    const [opened, setOpened] = useState(false);
    const [currentOffer, setCurrentOffer]= useState(null);

    useEffect(()=>{
        setData(offer);
    },[offer])

    const rows = data.map((off) => (
        <Table.Tr key={off.id}>
          <Table.Td>{off.name}</Table.Td>
          <Table.Td>{off.Cut}</Table.Td>
          <Table.Td>{off.startDate}</Table.Td>
          <Table.Td>
        <ActionIcon color='#a1E533' onClick={() => handleEditClick(product)}>
          <IconPencil />
        </ActionIcon>
      </Table.Td>
      <Table.Td>
        <ActionIcon color='#a1E533' onClick={() => handleDelete(product)}>
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

return(
<Container>
      <Table className={classes.tablee} horizontalSpacing="lg" verticalSpacing="lg" withTableBorder withColumnBorders withRowBorders>
        <Table.Thead className={classes.head}>
          <Table.Tr>
            <Table.Th>Course</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Edit</Table.Th>
            <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      </Container>
)
 }
 export default OffersTable;