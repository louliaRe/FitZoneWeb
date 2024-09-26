// MainAdminP.js
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminStatistics from "../Components/AdminStatistics";
import GymsCard from "../Components/GymsCard";
import PointsCard from "../Components/PointsCard";
import { Box, Container, Grid, Group, Stack, Text } from "@mantine/core";
import "./MainAdminP.css";
import Layout from "../LayoutA";
import { GiYarn } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { RiCoupon3Fill } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";

const MainAdminP = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container size={1200} className="container">
        <Group w="100%">
          <Box className="box" onClick={() => navigate("/GymInterface")}>
            <Stack align="center" justify="center">
              <CgGym className="icon" size={100} />
              <Text fw={700} fz={20} c="white" className="icon">
                Gyms
              </Text>
            </Stack>
          </Box>

          <Box className="box" onClick={() => navigate("/Vouchers")}>
            <Stack align="center">
              <RiCoupon3Fill className="icon" size={100} />
              <Text fw={700} fz={20} c="white" className="icon">
                Vouchers
              </Text>
            </Stack>
          </Box>
          <Box className="box" onClick={() => navigate("/StatisticsAdmin")}>
            <Stack align="center">
              <IoStatsChart className="icon" size={100} />
              <Text fw={700} fz={20} c="white" className="icon">
                Statistics
              </Text>
            </Stack>
          </Box>
        </Group>
      </Container>
    </Layout>
  );
};

export default MainAdminP;
