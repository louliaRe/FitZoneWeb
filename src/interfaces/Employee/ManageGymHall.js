// import React, { useEffect, useState } from 'react';
// import { Button, Container, NumberInput, Modal, TextInput, FileInput, MultiSelect, Select } from '@mantine/core';
// import classes from './ManageGymHall.module.css';
// import { CreateHall, getDisease,getExercises ,getAllMachines} from '../../ApiServices/HallActivities';
// import { useAuth } from '../../AuthContext';

// const ManageGymHall = () => {
//   const { authState } = useAuth();
//   const [hallDimensions, setHallDimensions] = useState({ width: 2, height: 2, floor: 1 });
//   const [machines, setMachines] = useState([]);
//   const [newMachine, setNewMachine] = useState({ name: '',  description: '', videoUrl: '' , exercises:[], diseases:[]});
//   const [existingMachinePosition, setExistingMachinePosition]= useState({machine_id:'',x: 0, y: 0 })
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [addModalOpen, setAddModalOpen] = useState(false);
//   const [currentMachine, setCurrentMachine] = useState(null);
//   const [viewMode, setViewMode] = useState(false); // Machine details
//   const [error, setError] = useState('');
//   const [selectedDiseases, setSelectedDiseases] = useState([]);
//   const [diseases, setDiseases] = useState([]);
//   const [exercises, setExercises] = useState([]);
//   const [selectedExercises, setSelectedExercises] = useState([]);
//   const [selectedMachine, setSelectedMachine] = useState([]);



//   useEffect(() => {
//     const fetchDiseases = async () => {
//       try {
//         const data = await getDisease(authState.accessToken);
//         const formattedData = data.map(disease => ({
//           label: disease.name,
//           value: disease.id.toString()
//         }));
//         setDiseases(formattedData);
//       } catch (error) {
//         console.error("Error fetching diseases:", error);
//       }
//     };
//     fetchDiseases();
//   }, [authState.accessToken]);


//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const data = await getExercises(authState.accessToken);
//         const formattedData = data.map(exercise => ({
//           label: exercise.name,
//           value: exercise.id.toString()
//         }));
//         setExercises(formattedData);
//       } catch (error) {
//         console.error("Error fetching ex:", error);
//       }
//     };
//     fetchExercises();
//   }, [authState.accessToken]);


//   useEffect(() => {
//     const fetchAllMachines = async () => {
//       try {
//         const data = await getAllMachines(authState.accessToken);
//         const formattedData = data.map(machine => ({
//           label: machine.name,
//           value: machine.id.toString()
//         }));
//         setMachines(formattedData);
//         console.log("machine: " , formattedData)
//       } catch (error) {
//         console.error("Error fetching ex:", error);
//       }
//     };
    

//     fetchAllMachines();
//   }, [authState.accessToken]);

//   const handleAddMachine = () => {
//     setExistingMachinePosition({ machine_id:'', x: 0, y: 0 });
//     setCurrentMachine(null);
//     setIsModalOpen(true);
//     setViewMode(false);
//     setError('');
//   };

//   const handleSaveMachine = () => {
//     if (isPositionOccupied(currentMachine ? currentMachine.x : newMachine.x, currentMachine ? currentMachine.y : newMachine.y)) {
//       setError('Position is already occupied. Please choose a different position.');
//       return;
//     }
//     if (currentMachine) {
//       setMachines(machines.map(machine => (machine.id === currentMachine.id ? currentMachine : machine)));
//     } else {
//       setMachines([...machines, { ...newMachine, id: machines.length + 1 }]);
//     }
//     setIsModalOpen(false);
//   };

//   const handleEditMachine = (machine) => {
//     setCurrentMachine(machine);
//     setIsModalOpen(true);
//     setViewMode(false);
//     setError('');
//   };

//   const handleDeleteMachine = (id) => {
//     setMachines(machines.filter(machine => machine.id !== id));
//     setIsModalOpen(false);
//   };

//   const handleViewMachine = (machine) => {
//     setCurrentMachine(machine);
//     setIsModalOpen(true);
//     setViewMode(true);
//     setError('');
//   };

//   const handleAddHall = async () => {
//     try {
//       const hallData = {
//         width: hallDimensions.width,
//         height: hallDimensions.height,
//         floor: hallDimensions.floor
//       };
//       const newHall = await CreateHall(authState.accessToken, authState.branch_id, hallData);
//       console.log('New Hall Created:', newHall);
//       alert('Hall created successfully!');
//     } catch (error) {
//       console.error('Error creating hall:', error.error);
//       alert(`Failed to create hall  ,${error.error}`);
//     }
//   };

//  const  handleAddingNewMachine = async()=>{
//   try{
//     setNewMachine({name:'', description:'', video_Url:'', disease:[], exercises:[]})
//     setAddModalOpen(true);
//   }catch(error){

//   }
//  }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (currentMachine) {
//       setCurrentMachine(prevState => ({ ...prevState, [name]: value }));
//     } else {
//       setNewMachine(prevState => ({ ...prevState, [name]: value }));
//     }
//   };

//   const handleGifChange = (file) => {
//     const gifUrl = URL.createObjectURL(file);
//     if (currentMachine) {
//       setCurrentMachine(prevState => ({ ...prevState, gifUrl }));
//     } else {
//       setNewMachine(prevState => ({ ...prevState, gifUrl }));
//     }
//   };

//   const isPositionOccupied = (x, y) => {
//     const machine = machines.find(m => m.x === x && m.y === y);
//     return !!machine;
//   };

//   const renderHall = () => {
//     const gridItems = [];
//     for (let y = 0; y < hallDimensions.height; y++) {
//       for (let x = 0; x < hallDimensions.width; x++) {
//         const machine = machines.find(m => m.x === x && m.y === y);
//         gridItems.push(
//           <div
//             key={`${x}-${y}`}
//             className={`${classes.gridItem} ${machine ? classes.occupied : ''}`}
//             onClick={() => machine && handleViewMachine(machine)}
//           >
//             {machine ? (
//               <div className={classes.machine}>
//                 <p>{machine.name}</p>
//               </div>
//             ) : null}
//           </div>
//         );
//       }
//     }
//     return gridItems;
//   };

//   return (
//     <Container>
//       <h1>Manage Gym Hall</h1>

//       <div className={classes.hallDimensions}>
//         <NumberInput
//           label="Hall Width"
//           value={hallDimensions.width}
//           onChange={(value) => setHallDimensions(prev => ({ ...prev, width: value }))}
//         />
//         <NumberInput
//           label="Hall Height"
//           value={hallDimensions.height}
//           onChange={(value) => setHallDimensions(prev => ({ ...prev, height: value }))}
//         />
//         <NumberInput
//           label="Floor"
//           value={hallDimensions.floor}
//           onChange={(value) => setHallDimensions(prev => ({ ...prev, floor: value }))}
//         />
//         <Button color="lime" onClick={handleAddHall}>
//           CreateHall
//         </Button>
//         <Button color="lime" style={{ marginTop: '25px' }} onClick={handleAddMachine}>
//           Add New Machine to the hall
//         </Button>
//       </div>
//       <div className={classes.hallGrid} style={{ gridTemplateColumns: `repeat(${hallDimensions.width}, 1fr)` }}>
//         {renderHall()}
//       </div>

//       <Modal
//         opened={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={currentMachine ? (viewMode ? 'Machine Details' : 'Edit Machine') : 'Add New Machine'}
//         centered
//       >
//         {viewMode ? (
//           <div>
//             <p><strong>Name:</strong> {currentMachine.name}</p>
//             <p><strong>Position:</strong> ({currentMachine.x}, {currentMachine.y})</p>
//             <p><strong>Description:</strong> {currentMachine.description}</p>
//             {/* <p><strong>Video exercis{currentMachine.videoUrl}</strong></p> */}

//             {currentMachine.gifUrl && <img src={currentMachine.gifUrl} alt="Exercise GIF" />}
//             <Button
//               color="yellow"
//               onClick={() => {
//                 setViewMode(false);
//               }}
//               style={{ marginTop: '10px', marginRight: '10px' }}
//             >
//               Update
//             </Button>
//             <Button
//               color="red"
//               onClick={() => handleDeleteMachine(currentMachine.id)}
//               style={{ marginTop: '10px' }}
//             >
//               Delete
//             </Button>
//           </div>
//         ) : (
//           <div>
            
//             <Select 
//             label= "Select a Machine"
//             name='machine'
//             data={machines}
//             value={currentMachine ? currentMachine.id: newMachine.machine}
//             onChange={(value) => handleChange({ target: { name: 'machine', value } })}
//             />
//             <Button color='lime' onClick={handleAddingNewMachine}> add machine </Button>
//             <NumberInput
//               label="Position X"
//               name="x"
//               value={currentMachine ? currentMachine.x : newMachine.x}
//               onChange={(value) => handleChange({ target: { name: 'x', value } })}
//               min={0}
//               max={hallDimensions.width - 1}
//             />
//             <NumberInput
//               label="Position Y"
//               name="y"
//               value={currentMachine ? currentMachine.y : newMachine.y}
//               onChange={(value) => handleChange({ target: { name: 'y', value } })}
//               min={0}
//               max={hallDimensions.height - 1}
//             />
           
//              {/* <Select 
//             label= "Select The exercises"
//             name='exercises'
//             data={exercises}
//             value={currentMachine ? currentMachine.exercises : newMachine.exercises}
//             onChange={(value) => handleChange({ target: { name: 'machine', value } })}


//             />
//             <MultiSelect
//             label='Select the Diseases that can not use this'
//             description='These selected diseases will display to the players to avoid play on this machine if they have one these Diseases.' 
//             data={diseases}
//             onChange={(value) => setSelectedDiseases({ ...selectedDiseases, disease: value })}
//             />
//             <FileInput
//              label="GIF"
//              accept="image/gif"
//              onChange={handleGifChange}
//             /> */}
//             <Button className={classes.btn} onClick={handleSaveMachine}>
//               Save
//             </Button>
//           </div>
//         )}
//       </Modal>

//       <Modal  opened={addModalOpen}
//         onClose={() => setAddModalOpen(false)}
//         title= 'Add New Machine'
//         centered
//       > 
//        <TextInput
//               label="Name"
//               name="name"
//               value={ newMachine.name}
//               onChange={handleChange}
//             /> 

//              <TextInput
//               label="Description"
//               name="description"
//               value={ newMachine.description}
//               onChange={handleChange}
//             /> 
//              <Select 
//             label= "Select The exercises"
//             name='exercises'
//             data={exercises}
//             value={newMachine.exercises}
//             onChange={(value) => handleChange({ target: { name: 'machine', value } })}


//             />
//             <MultiSelect
//             label='Select the Diseases that can not use this'
//             description='These selected diseases will display to the players to avoid play on this machine if they have one these Diseases.' 
//             data={diseases}
//             onChange={(value) => setSelectedDiseases({ ...selectedDiseases, disease: value })}
//             />
//             <FileInput
//              label="GIF"
//              accept="image/gif"
//              onChange={handleGifChange}
//             />

//       </Modal>
//     </Container>
//   );
// };

// export default ManageGymHall;
