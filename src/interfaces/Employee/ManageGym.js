// src/pages/ManageGym.js
import React, { useState } from 'react';
import GymHallsList from '../../Components/Employee/GymHallsList';
import ManageMachines from '../../Components/Employee/ManageMachines';

const ManageGym = () => {
  const [selectedHall, setSelectedHall] = useState(null);

  const handleHallSelect = (hall) => {
    setSelectedHall(hall);
  };

  return (
    <div>
      {selectedHall ? (
        <ManageMachines hall={selectedHall} />
      ) : (
        <GymHallsList onHallSelect={handleHallSelect} />
      )}
    </div>
  );
};

export default ManageGym;
