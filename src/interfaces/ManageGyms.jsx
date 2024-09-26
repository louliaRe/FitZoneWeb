import React from "react";
import GymsCardList from "../Components/GymsCardList";
import Layout from "../LayoutA";
import { Stack, Text } from "@mantine/core";

const ManageGyms = () => {
  return (
    <Layout>
      <Stack align="center">
        <h1>Gyms Managed by You</h1>
        <GymsCardList />
      </Stack>
    </Layout>
  );
};

export default ManageGyms;
