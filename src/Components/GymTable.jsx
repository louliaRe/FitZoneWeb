import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  ActionIcon,
  Container,
  TextInput,
  Modal,
  Radio,
  Group,
  Stack,
} from "@mantine/core";
import { IconPencil, IconTrash, IconPlus } from "@tabler/icons-react";
import {
  deleteGym,
  EditGym,
  getBranches,
  addBranch,
} from "../ApiServices/AdminServices";
import { AuthProvider, useAuth } from "../AuthContext";

import "./GymTable.css";

const GymsCard = ({ initdata }) => {
  const [data, setData] = useState(initdata);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentGym, setCurrentGym] = useState(null);
  const [branches, setBranches] = useState([]);
  const [newBranch, setNewBranch] = useState({
    address: "",
    has_store: false,
    is_active: false,
  });
  const [branchModalOpen, setBranchModalOpen] = useState(false);
  const [currentGymId, setCurrentGymId] = useState(null);
  const { authState } = useAuth();

  useEffect(() => {
    console.log(initdata);
    setData(initdata);
  }, [initdata]);

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    console.log("id inside:", id);
    if (confirmDelete) {
      try {
        await deleteGym(authState.accessToken, id);
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting gym:", error);
        alert(error);
      }
    }
  };

  const openEditModal = (gym) => {
    setCurrentGym(gym);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentGym({ ...currentGym, [name]: value });
  };

  const handleRegistrationFeeChange = (index, field, value) => {
    console.log(currentGym);
    const updatedFees = [...currentGym.fees];
    updatedFees[index][field] = value;

    setCurrentGym({ ...currentGym, fees: updatedFees });
    // console.log("reg")
  };

  const handleEditSubmit = async () => {
    try {
      await EditGym(currentGym.id, currentGym);
      setData(
        data.map((item) => (item.id === currentGym.id ? currentGym : item))
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating gym info:", error);
    }
  };

  const handleAddBranchClick = async (gymId) => {
    setBranchModalOpen(true);
    setCurrentGymId(gymId);

    try {
      const response = await getBranches(authState.accessToken, gymId);
      console.log("API response:", response);
      setBranches(response.data || []);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleAddBranch = async (branch) => {
    try {
      const branchData = {
        address: branch.address,
        has_store: branch.has_store,
        is_active: branch.is_active,
      };

      await addBranch(authState.accessToken, currentGymId, branchData);
      setBranchModalOpen(false);
      setBranches([...branches, branchData]);
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  };

  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.description}</Table.Td>
      <Table.Td>
        {item.fees.length > 0
          ? `${item.fees[0].type} : ${item.fees[0].fee} - ${item.fees[1].type} : ${item.fees[1].fee}`
          : ""}
      </Table.Td>
      <Table.Td>{item.start_hour}</Table.Td>
      <Table.Td>{item.close_hour}</Table.Td>
      <Table.Td>{item.manager.username}</Table.Td>
      <Table.Td>{item.manager.email}</Table.Td>
      <Table.Td>{item.manager.birth_date}</Table.Td>
      <Table.Td>
        <ActionIcon
          size="xl"
          color="#86ef2b"
          onClick={() => handleDelete(item.id, item.name)}
          aria-label="Delete"
        >
          <IconTrash />
        </ActionIcon>
      </Table.Td>
      <Table.Td>
        <ActionIcon
          size="xl"
          color="#86ef2b"
          onClick={() => openEditModal(item)}
          aria-label="Edit"
        >
          <IconPencil />
        </ActionIcon>
      </Table.Td>
      <Table.Td>
        <ActionIcon
          size="xl"
          color="#86ef2b"
          onClick={() => handleAddBranchClick(item.id)}
          aria-label="Add Branch"
        >
          <IconPlus />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack w="100%">
      <Table
        className="table"
        horizontalSpacing="lg"
        verticalSpacing="lg"
        withTableBorder
        withColumnBorders
        withRowBorders
      >
        <Table.Thead className="head">
          <Table.Tr>
            <Table.Th>Gym</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Registration Price</Table.Th>
            <Table.Th>Open at</Table.Th>
            <Table.Th>Close at</Table.Th>
            <Table.Th>Manager of the gym</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Birthday</Table.Th>
            <Table.Th>Remove</Table.Th>
            <Table.Th>Edit</Table.Th>
            <Table.Th>Add Branch</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Caption>Scroll page to see sticky thead</Table.Caption>
      </Table>

      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Gym Information"
      >
        {currentGym && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSubmit();
            }}
          >
            <TextInput
              label="Name"
              name="name"
              value={currentGym.name}
              onChange={handleEditChange}
              required
            />
            <TextInput
              label="Description"
              name="description"
              value={currentGym.description}
              onChange={handleEditChange}
              required
            />

            <TextInput
              label="Open Hour"
              name="start_hour"
              value={currentGym.start_hour}
              onChange={handleEditChange}
              required
            />
            <TextInput
              label="Close Hour"
              name="close_hour"
              value={currentGym.close_hour}
              onChange={handleEditChange}
              required
            />
            <TextInput
              label="Manager Username"
              name="manager.username"
              value={currentGym.manager.username}
              onChange={handleEditChange}
              required
            />
            <TextInput
              label="Manager Email"
              name="manager.email"
              value={currentGym.manager.email}
              onChange={handleEditChange}
              required
            />
            <TextInput
              label="Manager Birthday"
              name="manager.birth_date"
              value={currentGym.manager.birth_date}
              onChange={handleEditChange}
              required
            />
            <Group title="Registration Fees">
              {currentGym.fees.map((fee, index) => (
                <Group key={index} mt="xs">
                  <TextInput
                    label={fee.type ? fee.type : ""}
                    type="number"
                    value={fee.fee ? fee.fee : 0}
                    onChange={(e) =>
                      handleRegistrationFeeChange(index, "fee", e.target.value)
                    }
                  />
                </Group>
              ))}
            </Group>
            <Button className="btn" color="#a1E533" type="submit">
              Save Changes
            </Button>
          </form>
        )}
      </Modal>

      <Modal
        opened={branchModalOpen}
        onClose={() => setBranchModalOpen(false)}
        title="Add New Branch"
      >
        <div>
          <h3>Existing Branches</h3>
          <ul>
            {branches?.length > 0 ? (
              branches.map((branch) => (
                <li key={branch.id}>
                  {branch.address} - Store: {branch.has_store ? "Yes" : "No"} -
                  Active: {branch.is_active ? "Yes" : "No"}
                </li>
              ))
            ) : (
              <li>No branches available</li>
            )}
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddBranch(newBranch);
          }}
        >
          <TextInput
            label="Address"
            name="address"
            value={newBranch.address}
            onChange={(e) =>
              setNewBranch({ ...newBranch, address: e.target.value })
            }
            required
          />
          {/* CITY, STREET, NUMBER_OF_CLIENT_ALLOWED */}
          <Radio.Group
            name="has_store"
            label="Has Store"
            onChange={(value) =>
              setNewBranch({ ...newBranch, has_store: value === "true" })
            }
          >
            <Group mt="xs">
              <Radio value="true" label="Yes" />
              <Radio value="false" label="No" />
            </Group>
          </Radio.Group>
          <Radio.Group
            name="is_active"
            label="Is Active"
            onChange={(value) =>
              setNewBranch({ ...newBranch, is_active: value === "true" })
            }
          >
            <Group mt="xs">
              <Radio value="true" label="Yes" />
              <Radio value="false" label="No" />
            </Group>
          </Radio.Group>
          <Button type="submit" className="btn">
            Add Branch
          </Button>
        </form>
      </Modal>
    </Stack>
  );
};

export default GymsCard;
