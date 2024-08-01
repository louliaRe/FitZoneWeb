import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table, ActionIcon, Container, Modal, TextInput, NumberInput } from '@mantine/core';
import { IconTrash, IconPencil } from '@tabler/icons-react';
import { fetchProductsByCategory, deleteProduct, EditProduct } from '../../ApiServices/StoreServices';
import classes from './ProductsTable.module.css';
import { useAuth } from '../../AuthContext';

const ProductsTable = ({ products }) => {
  const { categoryId } = useParams();
  const { authState } = useAuth();
  const [productList, setProductList] = useState([]);
  const [opened, setOpened] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEditClick = async (product) => {
    try {
      setOpened(true);
      setCurrentProduct(product);
      console.log('currentProduct', currentProduct);
    } catch (error) {
      console.error('Error in editing product', error);
    }
  };

  const handleEditChange = (name, value) => {
    setCurrentProduct((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await EditProduct(authState.accessToken, currentProduct.branch_product_id, currentProduct);
      setProductList((prev) =>
      prev.map((prod) => (prod.branch_product_id === currentProduct.branch_product_id ? updatedProduct : prod))
      );
      console.log('res of update:', updatedProduct);
      alert('Product updated successfully!');
      setOpened(false);
      window.location.reload();
     
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(authState.accessToken, id);
      setProductList((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const rows = products?.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>{product.product?.name}</Table.Td>
      <Table.Td>{product.price}</Table.Td>
      <Table.Td>{product.amount}</Table.Td>
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

  return (
    <Container>
      <Table className={classes.tablee} horizontalSpacing="lg" verticalSpacing="lg" withTableBorder withColumnBorders withRowBorders>
        <Table.Thead className={classes.head}>
          <Table.Tr>
            <Table.Th>Product Name</Table.Th>
            <Table.Th>Price</Table.Th>
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
              value={currentProduct.product?.name || ''}
              readOnly
            />
            <NumberInput
              label="Amount"
              name="amount"
              type="number"
              value={currentProduct.amount}
              onChange={(value) => handleEditChange('amount', value)}
              required
            />
            <NumberInput
              label="Price"
              name="price"
              type="number"
              value={currentProduct.price}
              onChange={(value) => handleEditChange('price', value)}
              required
            />
            <Button type="submit" color="#a1E533" className={classes.btn}>Save Changes</Button>
          </form>
        )}
      </Modal>
    </Container>
  );
};

export default ProductsTable;
