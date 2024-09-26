import React, { useState } from "react";
import GymHallsList from "../../Components/Employee/GymHallsList";
import ManageMachines from "../../Components/Employee/ManageMachines";
import classes from "./ManageGym.module.css";
import Layout from "../../LayoutA";
import { Container, Stack } from "@mantine/core";

const ManageGym = () => {
  const [selectedHall, setSelectedHall] = useState(null);

  const handleHallSelect = (hall) => {
    setSelectedHall(hall);
  };

  return (
    <Layout>
      <Stack
        mt={40}
        style={{
          border: "1px solid #a1e533",
          borderRadius: 10,
          backgroundColor: "#2c2c2c",
          padding: 20,
        }}
      >
        {selectedHall ? (
          <ManageMachines hall={selectedHall} />
        ) : (
          <GymHallsList
            className={classes.position}
            onHallSelect={handleHallSelect}
          />
        )}
      </Stack>
    </Layout>
  );
};

export default ManageGym;
