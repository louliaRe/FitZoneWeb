import React, { useState } from 'react';
import { Tabs, Container ,Text} from '@mantine/core';
import ClothesForm from '../../Components/Forms/ClothesForm';
import MealsForm from '../../Components/Forms/MealsForm';
import SupplementsForm from '../../Components/Forms/SupplementsForm';
import classes from './AddItem.module.css';

const AddItem = () => {
  const [activeTab, setActiveTab] = useState('meals');

  return (
    <Container>
      <h1>Add New Item</h1>
      <Tabs value={activeTab} onChange={setActiveTab} color="lime" radius="xs" defaultValue="meals">
        <Tabs.List className={classes.tabs} grow justify="center">
          <Tabs.Tab value="meals">Meals</Tabs.Tab>
          <Tabs.Tab value="clothes">Clothes</Tabs.Tab>

          <Tabs.Tab value="supplements">Supplements</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="clothes">
          <ClothesForm />
        </Tabs.Panel>
        <Tabs.Panel value="meals">
          <MealsForm/>
        </Tabs.Panel>
        <Tabs.Panel value="supplements">
          <SupplementsForm />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default AddItem;
