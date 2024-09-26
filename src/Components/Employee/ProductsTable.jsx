import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table, ActionIcon, Container, Modal, TextInput, NumberInput } from '@mantine/core';
import { IconTrash, IconPencil } from '@tabler/icons-react';
import { deleteProduct, EditProduct } from '../../ApiServices/StoreServices';
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
      setCurrentProduct(product); // Set the current product to be edited
    } catch (error) {
      console.error('Error in editing product', error);
    }
  };

  const handleEditChange = (value, name) => {
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await EditProduct(authState.accessToken, currentProduct.branch_product_id, currentProduct);
      setProductList((prev) =>
        prev.map((prod) => (prod.branch_product_id === currentProduct.branch_product_id ? updatedProduct : prod))
      );
      console.log('Product updated:', updatedProduct);
      alert('Product updated successfully!');
      setOpened(false);
    }catch (error) {
      console.error('Error updating product:', error);
  
      // Handle the error to extract the message
      const errorMessage = error.image_path?.[0] || 'An unexpected error occurred';
      
      // Display the error in the alert
      alert(`There was an error updating the product: ${errorMessage}`);
    }
  };

  const handleDelete = async (product) => {
    try {
      await deleteProduct(authState.accessToken, product.branch_product_id);
      setProductList((prev) => prev.filter((p) => p.branch_product_id !== product.branch_product_id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const rows = products?.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>{product.product?.name}</Table.Td>
      <Table.Td>{product.price}</Table.Td>
      <Table.Td>{product.amount}</Table.Td>
      {categoryId === '1' && (
            <>
              {/* Supplements */}
              <Table.Td>{product.caffeine || 0} mg </Table.Td>
              <Table.Td>{product.protein || 0} g </Table.Td>
              <Table.Td>{product.calories || 0} C</Table.Td>
              <Table.Td>{product.carbs || 0} g </Table.Td>
              <Table.Td>{product.flavor || 'Unknown'} </Table.Td>
            </>
          )}
             {categoryId === '2' && (
            <>
              {/* Supplements */}
              <Table.Td>{product.protein || 0} g </Table.Td>
              <Table.Td>{product.calories || 0} C</Table.Td>
              <Table.Td>{product.carbs || 0} g </Table.Td>
              <Table.Td>{product.fats || 0} mg </Table.Td>
              <Table.Td>{product.used_for || ''}  </Table.Td>

            </>
          )}
      {categoryId === '3' && (
        <>
          {/* Accessories */}
          <Table.Td>{product.size || 'N/A'} Size</Table.Td>
          <Table.Td>{product.color || 'N/A'} Color</Table.Td>
        </>
      )}
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
  const renderTableHeaders = () => {
    return (
      <Table.Tr>
        <Table.Th>Product Name</Table.Th>
        <Table.Th>Price</Table.Th>
        <Table.Th>Amount</Table.Th>
        {categoryId === '1' && (
          <>
            {/* Supplements */}
            <Table.Th>Caffeine</Table.Th>
            <Table.Th>Protein</Table.Th>
            <Table.Th>Calories</Table.Th>
            <Table.Th>Carbs</Table.Th>
            <Table.Th>Flavor</Table.Th>
          </>
        )}
        {categoryId === '2' && (
          <>
            {/* Meals */}
            <Table.Th>Protein</Table.Th>
            <Table.Th>Calories</Table.Th>
            <Table.Th>Carbs</Table.Th>
            <Table.Th>Fats</Table.Th>
            <Table.Th>Used For</Table.Th>
          </>
        )}
        {categoryId === '3' && (
          <>
            {/* Accessories */}
            <Table.Th>Size</Table.Th>
            <Table.Th>Color</Table.Th>
          </>
        )}
        <Table.Th>Edit</Table.Th>
        <Table.Th>Delete</Table.Th>
      </Table.Tr>
    );
  };

  return (
    <Container>
      <Table className={classes.tablee} horizontalSpacing="lg" verticalSpacing="lg" withTableBorder withColumnBorders withRowBorders>
        <Table.Thead className={classes.head}>
        {renderTableHeaders()}
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
              value={currentProduct.amount}
              onChange={(value) => handleEditChange(value, 'amount')}
              required
            />
            <NumberInput
              label="Price"
              name="price"
              value={currentProduct.price}
              onChange={(value) => handleEditChange(value, 'price')}
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
