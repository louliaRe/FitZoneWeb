import React, { useState, useEffect } from "react";
import Emp from "../Components/Emp";
import { Button, Container, Modal, TextInput, PasswordInput, Select, MultiSelect } from "@mantine/core";
import './EmpTable.css';
import { useDisclosure } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { getEmployees, postEmployee } from "../ApiServices/ManagerServices";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";

const EmpTable = () => {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [newEmp, setNewEmp] = useState({ username: '', Email: '', password: '', Gender: '', shift: '', days_off: [], birthday:'' });
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
        try {
            const employees = await getEmployees(id);
            setEmps(employees);
        } catch (error) {
            console.error('Error fetching employees:', error.message);
        }
    };

    fetchEmployees();
  }, [id]);

  const handleChange = (e) => {
    console.log("new", newEmp)
    setNewEmp({ ...newEmp, [e.target.name]: e.target.value });
  };

  const handleAddEmp = async () => {
    try {
      const addedEmp = await postEmployee(id, newEmp);
      setEmps([...emps, addedEmp]);
      setNewEmp({ username: '', Email: '', password: '', Gender: '', shift: '', days_off: [], birthday:'' }); // Reset form
      // close();
    } catch (error) {
      console.error('Error adding employee:', error.message);
    }
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    // Implement search logic here
  };

  return (
    <Container>
      <div className="TB">
        <h1 style={{ color: '#fff', marginLeft:'-80px' }}>Employees</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="search"
          style={{ marginLeft:'-90px',width:'150px',marginRight: '50px', padding: '5px', fontSize: '16px' }}
        />
        <Button onClick={open} color="#a1E533" style={{marginLeft:'-80px', marginRight:'100px'}}>Add a New Employee</Button>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

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
            label='Birthday'
            valueFormat="YYYY-MMM-DD"
            value={newEmp.birthday}
            onChange={(e) => handleChange({ target: { name: 'birthday', value: e } })}
            placeholder="11/03/2001"
            required
            />
            <Select
              label="Shift"
              name="shift"
              onChange={(value) => setNewEmp({ ...newEmp, shift: value })}
              data={['morning', 'night']}
              placeholder="Morning/Night/both"
              required
            />
            <MultiSelect
              label="Off days"
              name="days_off"
              onChange={(value) => setNewEmp({ ...newEmp, days_off: value })}
              data={['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']}
              placeholder="Select days off"
              required
              multiple
            />
            <Button type="submit" color="#a1E533" className="submit" onClick={handleAddEmp}>Add Employee</Button>
          </form>
        </Modal>
      </div>
      <Emp initdata={emps} />
    </Container>
  );
};

export default EmpTable;
