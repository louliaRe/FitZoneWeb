import React, { useState, useEffect } from "react";
import Emp from "../Components/Emp";
import {
  Button,
  Container,
  Modal,
  TextInput,
  PasswordInput,
  Select,
  MultiSelect,
  Stack,
  Group,
} from "@mantine/core";
import "./EmpTable.css";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { getEmployees, postEmployee } from "../ApiServices/ManagerServices";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import Layout from "../LayoutA";
import { FaSearch } from "react-icons/fa";

const EmpTable = () => {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [newEmp, setNewEmp] = useState({
    username: "",
    Email: "",
    password: "",
    Gender: "",
    shift: "",
    days_off: [],
    birthday: "",
  });
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await getEmployees(id);
        setEmps(employees);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, [id]);

  const handleChange = (e) => {
    console.log("new", newEmp);
    setNewEmp({ ...newEmp, [e.target.name]: e.target.value });
  };

  const handleAddEmp = async () => {
    try {
      const addedEmp = await postEmployee(id, newEmp);
      console.log(addedEmp);
      // setEmps([...emps, addedEmp]);

      // setNewEmp({ username: '', Email: '', password: '', Gender: '', shift: '', days_off: [], birthday:'' }); // Reset form
      // close();
    } catch (error) {
      console.error("Error adding employee:", error.message);
    }
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    // Implement search logic here
  };

  return (
    <Layout>
      <Stack align="flex-start" w="80%">
        <Stack align="flex-end" w="100%">
          <Group w="100%" className="TB">
            <h1 style={{ color: "#fff" }}>Employees</h1>
            <Button onClick={open} color="#a1E533" style={{ width: 200 }}>
              Add a New Employee
            </Button>
            <TextInput
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              style={{
                width: "250px",
                padding: "5px",
                fontSize: "16px",
              }}
              leftSection={<FaSearch />}
            />
          </Group>
        </Stack>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Modal opened={opened} onClose={close} centered title="New Employee">
            <form>
              <TextInput
                label="UserName"
                type="text"
                name="username"
                value={newEmp.username}
                onChange={handleChange}
                placeholder="username"
                required
              />
              <TextInput
                type="email"
                name="Email"
                label="Email"
                value={newEmp.Email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
              <PasswordInput
                label="Password"
                type="password"
                name="password"
                value={newEmp.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <DateInput
                label="Birthday"
                valueFormat="YYYY-MMM-DD"
                value={newEmp.birthday}
                onChange={(e) =>
                  handleChange({ target: { name: "birthday", value: e } })
                }
                placeholder="11/03/2001"
                required
              />
              <Select
                label="Shift"
                name="shift"
                onChange={(value) => setNewEmp({ ...newEmp, shift: value })}
                data={["morning", "night"]}
                placeholder="Morning/Night/both"
                required
              />
              <MultiSelect
                label="Off days"
                name="days_off"
                onChange={(value) => setNewEmp({ ...newEmp, days_off: value })}
                data={[
                  "sunday",
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                ]}
                placeholder="Select days off"
                required
                multiple
              />
              <Button
                type="submit"
                color="#a1E533"
                className="submit"
                onClick={handleAddEmp}
              >
                Add Employee
              </Button>
            </form>
          </Modal>
        </div>
        <Emp initdata={emps} />
      </Stack>
    </Layout>
  );
};

export default EmpTable;
