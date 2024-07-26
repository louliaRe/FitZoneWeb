//scr/component/employee/ProductTable

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table, ActionIcon, Container, Modal, TextInput } from '@mantine/core';
import { IconTrash, IconPencil } from '@tabler/icons-react';
import { fetchProductsByCategory, updateProduct, deleteProduct } from '../../ApiServices/StoreServices';
import classes from './ProductsTable.module.css';
import { useAuth } from '../../AuthContext'; 

const ProductsTable = ({products}) => {
    const { categoryId } = useParams(); 
    const { authState } = useAuth(); 
  const [product, setProduct] = useState([]);
  const [opened, setOpened] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);



  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setOpened(true);
  };

  const handleEditChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(authState.accessToken, currentProduct.id, currentProduct);
      setProduct(products.map(prod => (prod.id === currentProduct.id ? updatedProduct : prod)));
      setOpened(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(authState.accessToken, id);
      setProduct(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const rows = products && products.length > 0 && products.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.details}</Table.Td>
      <Table.Td>{product.amount}</Table.Td>
      <Table.Td>
        <ActionIcon onClick={() => handleEditClick(product)}>
          <IconPencil />
        </ActionIcon>
      </Table.Td>
      <Table.Td>
        <ActionIcon onClick={() => handleDelete(product.id)}>
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container>
<Table className={classes.tablee} horizontalSpacing="lg" verticalSpacing="lg"  withTableBorder withColumnBorders withRowBorders >  
   
   <Table.Thead className={classes.head}>
   <Table.Tr>
            <Table.Th>Product Name</Table.Th>
            <Table.Th>Details</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Edit</Table.Th>
            <Table.Th>Delete</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Edit Product">
        {currentProduct && (
          <form onSubmit={handleEditSubmit}>
            <TextInput
              label="Product Name"
              name="name"
              value={currentProduct.name}
              onChange={handleEditChange}
              required
            />
            <TextInput
              label="Details"
              name="details"
              value={currentProduct.details}
              onChange={handleEditChange}
              required
            />
            <TextInput
              label="Amount"
              name="amount"
              type="number"
              value={currentProduct.amount}
              onChange={handleEditChange}
              required
            />
            <Button type="submit" color="#a1E533">Save Changes</Button>
          </form>
        )}
      </Modal>
    </Container>
  );
};

export default ProductsTable;
