import React, {useEffect,useState} from 'react';
import { Table, Button } from '@mantine/core';
import classes from './VouchersTable.module.css';
import { getVouchers,getPoints } from '../ApiServices/AdminServices';
import { useAuth } from '../AuthContext';

const VouchersTable = () => {
  const [data, setData]= useState([])
  const {authState}= useAuth();
  

useEffect(()=>{
  const res=  async()=>{
    try{
      const vouchersData = await getVouchers(authState.accessToken);
            setData(vouchersData);
    }catch(e){
      console.error('Error ', e);
    }
};
res();
},[authState.accessToken])




  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders className={classes.table}>
        <Table.Thead className={classes.head}>
        <Table.Tr>
          <Table.Td>Name</Table.Td>
          <Table.Td>Points Required</Table.Td>
          <Table.Td>Number of Days</Table.Td>
          <Table.Td>Discount</Table.Td>
          <Table.Td>Edit</Table.Td>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((voucher, index) => (
          <tr key={index}>
            <Table.Td>{voucher.name}</Table.Td>
            <Table.Td>{voucher.points_required}</Table.Td>
            <Table.Td>{voucher.number_of_days}</Table.Td>
            <Table.Td>{voucher.discount}</Table.Td>
            <Table.Td>
              <Button size="xs" variant="outline" color="#a1E533" >Edit</Button>
            </Table.Td>
          </tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default VouchersTable;
