import React, {useState,useEffect} from 'react';
import { Button, Table, ActionIcon, Container, NumberInput, TextInput , Modal} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

import classes from './WalletTable.module.css';


const WalletTable = ({ wallet, handleUpdate  }) => {
  const [data, setData] = useState(wallet);
    const [opened, setOpened] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(null);
    const [newAmount, setNewAmount] = useState(null);

    useEffect(() => {
      setData(wallet);
  }, [wallet]);

  const handleEditClick = (wallet) => {
    setSelectedWallet(wallet);
    setNewAmount(wallet.balance);
    setOpened(true); 
};

const handleModalSubmit = () => {
    if (selectedWallet) {
        handleUpdate(selectedWallet, newAmount); 
        setOpened(false);
    }
};


      console.log("data:",data)
    const rows = data.map((item) => (
      <Table.Tr key={item.wallet_id}>
        <Table.Td>{item.client_data.username}</Table.Td>
        <Table.Td>{item.client}</Table.Td>

        <Table.Td>{item.balance}</Table.Td>




      <Table.Td>   <ActionIcon size="lg" color="#a1E533" onClick={() => handleEditClick(item)}>
<IconEdit />
</ActionIcon></Table.Td>
      
    </Table.Tr>
  ));
//   const handleDelete = (id) => {
//     const newData = data.filter(item => item.id !== id);
//     setData(newData);
//   };

  return (
    <Container >
     <Table className='tablee' horizontalSpacing="lg" verticalSpacing="lg"  withTableBorder withColumnBorders withRowBorders >
       <Table.Thead className='head'>
         <Table.Tr>
           <Table.Th>Username</Table.Th>
           <Table.Th>Client Number</Table.Th>
           <Table.Th>Balance</Table.Th>
           <Table.Th>Actions</Table.Th>




         </Table.Tr>
      </Table.Thead>
       <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Scroll page to see sticky thead</Table.Caption>
     </Table>

<Modal opened={opened} onClose={() => setOpened(false)} title="Update Balance">
{selectedWallet && (
    <div>
        <TextInput
            label="Username"
            value={selectedWallet.client_data.username}
            readOnly
        />
        <NumberInput
            label="Balance"
            value={newAmount}
            onChange={setNewAmount}
        />
        <Button fullWidth className={classes.btn} color="#a1E533" onClick={handleModalSubmit}>Update</Button>
    </div>
)}
</Modal>   
 </Container>
  );
};

export default WalletTable;
