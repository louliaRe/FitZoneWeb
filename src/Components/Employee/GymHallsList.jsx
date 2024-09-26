// src/components/GymHallsList.js
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Grid,
  Modal,
  NumberInput,
  Stack,
} from "@mantine/core";
import { GitHalls, CreateHall } from "../../ApiServices/HallActivities";
import { useAuth } from "../../AuthContext";

const GymHallsList = ({ onHallSelect }) => {
  const { authState } = useAuth();
  const [halls, setHalls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hallDimensions, setHallDimensions] = useState({
    width: 0,
    height: 0,
    floor: 0,
  });

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const data = await GitHalls(authState.accessToken, authState.branch_id);
        setHalls(data);
      } catch (error) {
        console.error("Error fetching halls:", error);
      }
    };

    fetchHalls();
  }, [authState.accessToken, authState.branchId]);

  const handleAddHall = async () => {
    try {
      const hallData = {
        width: hallDimensions.width,
        height: hallDimensions.height,
        floor: hallDimensions.floor,
      };
      const newHall = await CreateHall(
        authState.accessToken,
        authState.branch_id,
        hallData
      );
      console.log("New Hall Created:", newHall);
      alert("Hall created successfully!");
      setHalls([...halls, newHall]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating hall:", error);
      alert(`Failed to create hall: ${error.message}`);
    }
  };

  return (
    <Stack align="center" mt={40}>
      <h1>Gym Halls</h1>
      <Button color="lime" onClick={() => setIsModalOpen(true)}>
        Create Hall
      </Button>

      {halls && halls.length > 0 ? (
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "250px",
          }}
        >
          {halls.map((hall) => (
            <Grid.Col key={hall.id} span={6}>
              <Card
                style={{
                  backgroundColor: "#2c2c2c",
                  color: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                shadow="sm"
                padding="lg"
              >
                <h3>{hall.floor}</h3>
                <Button
                  color="#a1E533"
                  fullWidth
                  onClick={() => onHallSelect(hall, hall.id)}
                >
                  View Hall
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <p style={{ color: "#fff" }}>
          No halls available. Please create a new hall.
        </p>
      )}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Hall"
        centered
      >
        <NumberInput
          label="Hall Width"
          value={hallDimensions.width}
          onChange={(value) =>
            setHallDimensions((prev) => ({ ...prev, width: value }))
          }
        />
        <NumberInput
          label="Hall Height"
          value={hallDimensions.height}
          onChange={(value) =>
            setHallDimensions((prev) => ({ ...prev, height: value }))
          }
        />
        <NumberInput
          label="Floor"
          value={hallDimensions.floor}
          onChange={(value) =>
            setHallDimensions((prev) => ({ ...prev, floor: value }))
          }
        />
        <Button color="lime" onClick={handleAddHall}>
          Create Hall
        </Button>
      </Modal>
    </Stack>
  );
};

export default GymHallsList;
