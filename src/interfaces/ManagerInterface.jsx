import React from "react";
import AddEmp from "../Components/AddEmp";
import AdminStatistics from "../Components/AdminStatistics";
import { Container, Button, Text, Box, Stack } from "@mantine/core";
import "./MainAdminP.css";
import Layout from "../LayoutA";
import { IoStatsChart } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ImStatsDots } from "react-icons/im";

const Managerinterface = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Container className="container">
        <Box className="box" onClick={() => navigate("/ManageGyms")}>
          <Stack align="center">
            <FaPeopleGroup className="icon" size={100} />
            <Text fw={700} fz={20} c="white" className="icon">
              Employees
            </Text>
          </Stack>
        </Box>
        <Box className="box" onClick={() => navigate("/statcits")}>
          <Stack align="center">
            <ImStatsDots className="icon" size={100} />
            <Text fw={700} fz={20} c="white" className="icon">
              Statistics
            </Text>
          </Stack>
        </Box>
      </Container>
    </Layout>
  );
};
export default Managerinterface;
