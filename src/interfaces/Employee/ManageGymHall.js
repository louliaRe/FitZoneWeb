import React, { useState } from 'react';
import { Button, Container, NumberInput, Modal, TextInput, FileInput } from '@mantine/core';
import classes from './ManageGymHall.module.css';

const ManageGymHall = () => {
  const [hallDimensions, setHallDimensions] = useState({ width: 2, height: 2 });
  const [machines, setMachines] = useState([]);
  const [newMachine, setNewMachine] = useState({ name: '', x: 0, y: 0, description: '', videoUrl: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMachine, setCurrentMachine] = useState(null);
  const [viewMode, setViewMode] = useState(false); //  machine details
  const [error, setError] = useState('');

  const handleAddNewMachine = () => {
    setNewMachine({ name: '', x: 0, y: 0, description: '', videoUrl: '' });
    setCurrentMachine(null);
    setIsModalOpen(true);
    setViewMode(false);
    setError('');

  };

  const handleSaveMachine = () => {
    if (isPositionOccupied(currentMachine ? currentMachine.x : newMachine.x, currentMachine ? currentMachine.y : newMachine.y)) {
      setError('Position is already occupied. Please choose a different position.');
      return;
    }
    if (currentMachine) {
      setMachines(machines.map(machine => (machine.id === currentMachine.id ? currentMachine : machine)));
    } else {
      setMachines([...machines, { ...newMachine, id: machines.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleEditMachine = (machine) => {
    setCurrentMachine(machine);
    setIsModalOpen(true);
    setViewMode(false);
    setError('');

  };

  const handleDeleteMachine = (id) => {
    setMachines(machines.filter(machine => machine.id !== id));
    setIsModalOpen(false);
  };


  const handleViewMachine = (machine) => {
    setCurrentMachine(machine);
    setIsModalOpen(true);
    setViewMode(true);
    setError('');

  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (currentMachine) {
      setCurrentMachine(prevState => ({ ...prevState, [name]: value }));
    } else {
      setNewMachine(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleGifChange = (file) => {
    const gifUrl = URL.createObjectURL(file);
    if (currentMachine) {
      setCurrentMachine(prevState => ({ ...prevState, gifUrl }));
    } else {
      setNewMachine(prevState => ({ ...prevState, gifUrl }));
    }
  };

  const isPositionOccupied = (x, y) => {
    const machine = machines.find(m => m.x === x && m.y === y);
    return !!machine;
  };

  const renderHall = () => {
    const gridItems = [];
    for (let y = 0; y < hallDimensions.height; y++) {
      for (let x = 0; x < hallDimensions.width; x++) {
        const machine = machines.find(m => m.x === x && m.y === y);
        gridItems.push(
          <div
            key={`${x}-${y}`}
            className={`${classes.gridItem} ${machine ? classes.occupied : ''}`}
            onClick={() => machine && handleViewMachine(machine)}
          >
            {machine ? (
              <div className={classes.machine}>
                <p>{machine.name}</p>
              </div>
            ) : null}
          </div>
        );
      }
    }
    return gridItems;
  };

  return (
    <Container>
      <h1>Manage Gym Hall</h1>

      <div className={classes.hallDimensions}>
        <NumberInput
          label="Hall Width"
          value={hallDimensions.width}
          onChange={(value) => setHallDimensions(prev => ({ ...prev, width: value }))}
        />
        <NumberInput
          label="Hall Height"
          value={hallDimensions.height}
          onChange={(value) => setHallDimensions(prev => ({ ...prev, height: value }))}
        />
        <Button color="lime" style={{marginTop:'25px'}} onClick={handleAddNewMachine}>Add New Machine</Button>
      </div>
      <div className={classes.hallGrid} style={{ gridTemplateColumns: `repeat(${hallDimensions.width}, 1fr)` }}>
        {renderHall()}
      </div>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentMachine ? (viewMode ? 'Machine Details' : 'Edit Machine') : 'Add New Machine'}
        centered
      >
        {viewMode ? (
          <div>
            <p><strong>Name:</strong> {currentMachine.name}</p>
            <p><strong>Position:</strong> ({currentMachine.x}, {currentMachine.y})</p>
            <p><strong>Description:</strong> {currentMachine.description}</p>
            {/* <p><strong>Video exercis{currentMachine.videoUrl}</strong></p> */}
            {currentMachine.gifUrl && <img src={currentMachine.gifUrl} alt="Exercise GIF" />}
            <Button
              color="yellow"
              onClick={() => {
                setViewMode(false);
              }}
              style={{ marginTop: '10px', marginRight: '10px' }}
            >
              Update
            </Button>
            <Button
              color="red"
              onClick={() => handleDeleteMachine(currentMachine.id)}
              style={{ marginTop: '10px' }}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div>
            <TextInput
              label="Name"
              name="name"
              value={currentMachine ? currentMachine.name : newMachine.name}
              onChange={handleChange}
            />
            <NumberInput
              label="Position X"
              name="x"
              value={currentMachine ? currentMachine.x : newMachine.x}
              onChange={(value) => handleChange({ target: { name: 'x', value } })}
              min={0}
              max={hallDimensions.width - 1}
            />
            <NumberInput
              label="Position Y"
              name="y"
              value={currentMachine ? currentMachine.y : newMachine.y}
              onChange={(value) => handleChange({ target: { name: 'y', value } })}
              min={0}
              max={hallDimensions.height - 1}
            />
            <TextInput
              label="Description"
              name="description"
              value={currentMachine ? currentMachine.description : newMachine.description}
              onChange={handleChange}
            />
            <FileInput
             label="GIF"
             accept="image/gif"
             onChange={handleGifChange}
            />
            <Button className={classes.btn} onClick={handleSaveMachine} >
              Save
            </Button>
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default ManageGymHall;
