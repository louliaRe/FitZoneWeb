import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  NumberInput,
  Modal,
  TextInput,
  FileInput,
  MultiSelect,
  Select,
  Checkbox,
} from "@mantine/core";
import {
  getDisease,
  getExercises,
  getAllMachines,
  GetMachinesInside,
  AddMachine,
  AddMachineToCertainHall,
  UpdateDiagram,
  getMachineInfo,
} from "../../ApiServices/HallActivities";
import { useAuth } from "../../AuthContext";
import classes from "../../interfaces/Employee/ManageGymHall.module.css";

const ManageMachines = ({ hall }) => {
  const im = "http://localhost:8000";
  const { authState } = useAuth();
  const [machines, setMachines] = useState([]);
  const [machinesIn, setMachinesIn] = useState([]);

  const [newMachine, setNewMachine] = useState({
    name: "",
    status: false,
    description: "",
    video_path: "",
    exercises: [],
    diseases: [],
  });
  const [existingMachinePosition, setExistingMachinePosition] = useState({
    machine_id: "",
    x: 0,
    y: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [currentMachine, setCurrentMachine] = useState(null);
  const [viewMode, setViewMode] = useState(false); // Machine details
  const [error, setError] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const data = await getDisease(authState.accessToken);
        const formattedData = data.map((disease) => ({
          label: disease.name,
          value: disease.id.toString(),
        }));
        setDiseases(formattedData);
      } catch (error) {
        console.error("Error fetching diseases:", error);
      }
    };
    fetchDiseases();
  }, [authState.accessToken]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises(authState.accessToken);
        const formattedData = data.map((exercise) => ({
          label: exercise.name,
          value: exercise.exercise_id.toString(),
        }));
        // setExercises(formattedData);
        console.log("res of exercises:", data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, [authState.accessToken]);

  useEffect(() => {
    const fetchAllMachines = async () => {
      try {
        const data = await getAllMachines(authState.accessToken);
        const formattedData = data.map((machine) => ({
          label: machine.name,
          value: machine.equipment_id.toString(),
        }));
        setMachines(formattedData);
        console.log("res of machines:", data);
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };
    fetchAllMachines();
  }, [authState.accessToken]);

  useEffect(() => {
    const fetchMachinesInside = async () => {
      try {
        const response = await GetMachinesInside(
          authState.accessToken,
          hall.id
        );
        console.log("API Response  fffffffffffffff:", response);
        if (response.length > 0 && response[0].equipments) {
          console.log("sssssssssss");
          const equipmentData = response[0].equipments.map((eq) => ({
            ...eq,
            value: eq.Equipment_Diagram_id.toString(),
            label: eq.equipment_details.name,
          }));
          console.log(
            "equipment_details ssssssssssssssssssssssss",
            equipmentData
          );
          setMachinesIn(equipmentData);
        } else {
          console.error("Unexpected response format:", response);
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching machinesIN inside the hall:", error);
        setError(`Error fetching machinesIN inside the hall: ${error.message}`);
      }
    };
    fetchMachinesInside();
  }, [authState.accessToken, hall.id]);

  const handleAddMachine = () => {
    setExistingMachinePosition({ machine_id: "", x: 0, y: 0 });
    setCurrentMachine(null);
    setIsModalOpen(true);
    setViewMode(false);
    setError("");
  };

  const handleSaveMachine = async () => {
    try {
      const positionData = {
        equipment: {
          [existingMachinePosition.machine_id]: [
            {
              x_axis: existingMachinePosition.x,
              y_axis: existingMachinePosition.y,
            },
          ],
        },
      };
      await AddMachineToCertainHall(
        authState.accessToken,
        hall.id,
        positionData
      );
      setIsModalOpen(false);
      alert("Machine added to hall successfully!");
    } catch (error) {
      console.error("Error saving machine position:", error);
      alert(`Failed to save machine position: ${error.message}`);
    }
  };

  const handleCreateMachine = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newMachine.name || "");
      formData.append("description", newMachine.description || "");
      if (newMachine.video_path) {
        formData.append("vedio_path", newMachine.video_path);
      }

      if (newMachine.diseases?.length) {
        newMachine.diseases.forEach((diseaseId) => {
          formData.append("diseases", diseaseId.toString());
        });
      }

      if (newMachine.exercises?.length) {
        newMachine.exercises.forEach((exercise) => {
          formData.append(
            "exercises",
            JSON.stringify({ exercise_id: parseInt(exercise) })
          );
        });
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const createdMachine = await AddMachine(authState.accessToken, formData);
      setMachines([
        ...machines,
        { label: createdMachine.name, value: createdMachine.id.toString() },
      ]);
      alert("Machine created successfully!");
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error creating machine:", error);
      alert(`Failed to create machine: ${error.message}`);
    }
  };

  const handleEditMachine = async (machine) => {
    console.log("sssssssssssssss", machine);
    setCurrentMachine({
      ...machine,
      x_axis: machine.x_axis,
      y_axis: machine.y_axis,
    });
    setIsModalOpen(true);
    setViewMode(false);
    setError("");
  };

  const handleDeleteMachine = async (equipment_id) => {
    // to delete the machine
    console.log(`Deleting machine with id: ${equipment_id}`);
    // update the state
    setMachines(machines.filter((machine) => machine.value !== equipment_id));
    setIsModalOpen(false);
  };

  const handleViewMachine = (machine) => {
    setCurrentMachine(machine);
    setIsModalOpen(true);
    setViewMode(true);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (currentMachine) {
      setCurrentMachine((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setNewMachine((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleGifChange = (file) => {
    const gifUrl = URL.createObjectURL(file);
    if (currentMachine) {
      setCurrentMachine((prevState) => ({ ...prevState, video_path: gifUrl }));
    } else {
      setNewMachine((prevState) => ({ ...prevState, video_path: gifUrl }));
    }
  };

  const handleUpdateMachine = async (machine) => {
    console.log("update data mmmmaaaaa", machine);
    try {
      const updatedMachineInfo = {
        existed_equipments: {
          [currentMachine.Equipment_Diagram_id]: {
            x_axis: currentMachine.x_axis,
            y_axis: currentMachine.y_axis,
            status: true,
          },
        },
        added_equipments: {},
      };

      // machinesIn.forEach(machineI => {
      //   if (machineI.Equipment_Diagram_id == currentMachine.id) {
      //     updatedMachineInfo.existed_equipments[machine.Equipment_Diagram_id] = {
      //       x_axis: machine.x_axis,
      //       y_axis: machine.y_axis,
      //       status: true
      //     };
      //   }
      // });
      console.log("for eachhhhhhhhhhhhhhhhhhhh");
      await UpdateDiagram(
        authState.accessToken,
        hall.id,
        authState.branch_id,
        updatedMachineInfo
      );
      alert("Machine updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating machine:", error);
      alert(`Failed to update machine: ${error.message}`);
    }
  };

  const isPositionOccupied = (x, y) => {
    return machines.some((m) => m.x_axis === x && m.y_axis === y);
  };

  console.log("maaaaccchhhhiiineee:", machinesIn);
  return (
    <Container>
      <h1>{hall.name}</h1>
      <div
        className={classes.hallGrid}
        style={{ gridTemplateColumns: `repeat(${hall.width}, 1fr)` }}
      >
        {Array.from({ length: hall.height }).map((_, y) =>
          Array.from({ length: hall.width }).map((_, x) => {
            const machine = machinesIn.find(
              (m) => m.x_axis === x && m.y_axis === y
            );
            return (
              <div
                key={`${x}-${y}`}
                className={classes.gridItem}
                onClick={() => machine && handleViewMachine(machine)}
                style={{ backgroundColor: machine ? "limegreen" : "lightgrey" }}
              >
                {machine ? machine.equipment_details.name : ""}
              </div>
            );
          })
        )}
      </div>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={viewMode ? "Machine Details" : "Edit Machine Position"}
        centered
      >
        {viewMode && currentMachine ? (
          <div>
            <h2>{currentMachine.equipment_details.name}</h2>
            <p>
              <strong>Position:</strong> ({currentMachine.x_axis},{" "}
              {currentMachine.y_axis})
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {currentMachine.equipment_details.description}
            </p>
            {currentMachine.equipment_details.image_path && (
              <img
                className={classes.img}
                src={`${im}${currentMachine.equipment_details.image_path}`}
                alt="Exercise GIF"
              />
            )}
            <Button
              color="yellow"
              onClick={() => handleEditMachine(currentMachine)}
              style={{ marginTop: "10px", marginRight: "10px" }}
            >
              Update
            </Button>
            <Button
              color="red"
              onClick={() => handleDeleteMachine(currentMachine.equipment_id)}
              style={{ marginTop: "10px" }}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div>
            {currentMachine ? (
              <>
                <h2>Edit Machine Position</h2>
                <NumberInput
                  label="Position X"
                  name="x_axis"
                  value={currentMachine.x_axis}
                  onChange={(value) =>
                    setCurrentMachine((prevState) => ({
                      ...prevState,
                      x_axis: value,
                    }))
                  }
                />
                <NumberInput
                  label="Position Y"
                  name="y_axis"
                  value={currentMachine.y_axis}
                  onChange={(value) =>
                    setCurrentMachine((prevState) => ({
                      ...prevState,
                      y_axis: value,
                    }))
                  }
                />
                {error && <div className={classes.error}>{error}</div>}
                <Button
                  color="lime"
                  onClick={() => handleUpdateMachine(currentMachine)}
                  style={{ marginTop: "10px" }}
                >
                  Update Position
                </Button>
              </>
            ) : (
              <>
                <Select
                  label="Select a Machine"
                  name="machine_id"
                  data={machines}
                  value={existingMachinePosition.machine_id}
                  onChange={(value) =>
                    setExistingMachinePosition((prevState) => ({
                      ...prevState,
                      machine_id: value,
                    }))
                  }
                />
                <NumberInput
                  label="Position X"
                  name="x"
                  value={existingMachinePosition.x}
                  onChange={(value) =>
                    setExistingMachinePosition((prevState) => ({
                      ...prevState,
                      x: value,
                    }))
                  }
                />
                <NumberInput
                  label="Position Y"
                  name="y"
                  value={existingMachinePosition.y}
                  onChange={(value) =>
                    setExistingMachinePosition((prevState) => ({
                      ...prevState,
                      y: value,
                    }))
                  }
                />
                <Checkbox
                  label="Status"
                  checked={existingMachinePosition.status}
                  onChange={(event) =>
                    setExistingMachinePosition((prevState) => ({
                      ...prevState,
                      status: event.currentTarget.checked,
                    }))
                  }
                />
                {error && <div className={classes.error}>{error}</div>}
                <Button
                  color="lime"
                  onClick={handleSaveMachine}
                  style={{ marginTop: "10px" }}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        )}
      </Modal>

      <Button color="lime" onClick={() => setAddModalOpen(true)}>
        Add New Machine
      </Button>
      <Button color="lime" onClick={handleAddMachine}>
        Add Machine to the Hall
      </Button>

      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Machine"
        centered
      >
        <TextInput
          label="Name"
          name="name"
          value={newMachine.name}
          onChange={handleChange}
        />
        <TextInput
          label="Description"
          name="description"
          value={newMachine.description}
          onChange={handleChange}
        />
        <Select
          label="Select The exercises"
          name="exercises"
          data={exercises}
          value={newMachine.exercises}
          onChange={(value) =>
            handleChange({ target: { name: "exercises", value } })
          }
        />
        <MultiSelect
          label="Select the Diseases that can not use this"
          description="These selected diseases will display to the players to avoid play on this machine if they have one of these Diseases."
          data={diseases}
          value={newMachine.diseases}
          onChange={(value) =>
            setNewMachine((prevState) => ({ ...prevState, diseases: value }))
          }
        />
        <FileInput
          type="file"
          name="video_path"
          accept="image/gif"
          onChange={(event) => {
            const file = event.currentTarget.files[0];
            handleGifChange(file);
          }}
        />
        <Button onClick={handleCreateMachine}>Add new machine</Button>
      </Modal>
    </Container>
  );
};

export default ManageMachines;
