import React, { useState } from "react";
import { Tabs, Container, Text, Stack } from "@mantine/core";
import ClothesForm from "../../Components/Forms/ClothesForm";
import MealsForm from "../../Components/Forms/MealsForm";
import SupplementsForm from "../../Components/Forms/SupplementsForm";
import classes from "./AddItem.module.css";
import Layout from "../../LayoutA";

const AddItem = () => {
  const [activeTab, setActiveTab] = useState("meals");

  return (
    <Layout>
      <Stack mt={20}>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          color="lime"
          radius="xs"
          defaultValue="meals"
          styles={{
            panel: {},
          }}
        >
          <Tabs.List className={classes.tabs} grow justify="center">
            <Tabs.Tab value="meals">Meals</Tabs.Tab>
            <Tabs.Tab value="clothes">Clothes</Tabs.Tab>

            <Tabs.Tab value="supplements">Supplements</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel
            value="clothes"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ClothesForm />
          </Tabs.Panel>
          <Tabs.Panel value="meals">
            <MealsForm />
          </Tabs.Panel>
          <Tabs.Panel value="supplements">
            <SupplementsForm />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Layout>
  );
};

export default AddItem;
