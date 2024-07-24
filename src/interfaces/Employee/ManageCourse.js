// src/interfaces/ManageCourse.js
import React, { useState, useEffect } from 'react';
import { Button, Container,MultiSelect ,Grid, TextInput, Modal, FileInput,NumberInput ,Select} from '@mantine/core';
import CourseCard from '../../Components/Employee/CourseCard';
// import { useNavigate } from 'react-router-dom';
import classes from './ManageCourse.module.css';
import { DateInput, TimeInput } from '@mantine/dates';
import { addCourse, getCourses, getCoaches } from '../../ApiServices/EmpServices';
import {useAuth} from '../../AuthContext';
import  moment  from 'moment';
// import useAxios from '../../Components/Axios';


const ManageCourse = () => {
  // const navigate = useNavigate();
  const { authState } = useAuth();
  const [coaches, setCoaches] =useState([])
  const [search, setSearch] = useState('');
  const [error, setError]= useState('');
  const [loading, setLoading]= useState(false);

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Course 1',
      coachName: 'Coach A',
      duration: '1 hour',
      dates: '01/01/2023 - 31/01/2023',
      times: '10:00 AM - 11:00 AM',
      image: 'https://via.placeholder.com/160x160?text=Course+1',
    },
    {
      id: 2,
      name: 'Course 2',
      coachName: 'Coach B',
      duration: '2 hours',
      dates: '01/02/2023 - 28/02/2023',
      times: '02:00 PM - 04:00 PM',
      image: 'https://via.placeholder.com/160x160?text=Course+2',
    },
  ]);

  const [newCourse, setNewCourse] = useState({ name: '', trainer_id: null,hall:null ,description: '', start_date: '',end_date:'', start_time: '',end_time:'' ,registration_fee:null,image: '', 
  days_of_week:{},allowed_number_for_class:15 ,branch_id:authState.branch_id ,allowed_days_to_cancel:0 });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [newA, setNewA]= useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (confirmDelete) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleSaveEdit = () => {
    setCourses(courses.map(course => (course.id === currentCourse.id ? currentCourse : course)));
    setIsEditModalOpen(false);
  };

  const handleAddNewCourse = () => {
    setIsNewModalOpen(true);
  };

  
 
  const handleSaveNew = async () => {
    try {
      const formattedCourse = {
        ...newCourse,
        start_date: moment(newCourse.start_date).format('YYYY-MM-DD'),
        end_date: moment(newCourse.end_date).format('YYYY-MM-DD'),
      };
      const addedCourse = await addCourse(authState.accessToken, formattedCourse, authState.id);
      setCourses([...courses, addedCourse]);
      setIsNewModalOpen(false);
    } catch (error) {
      if (error.status === 400) {
        alert('Please retry, there is something wrong.');
      } else {
        console.error('Error adding new course:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };
 
    const handleChange = (e) => {
      console.log("eeeeeeeeiiiiiii", e)
      const { name, value } = e.target;
     
      if (name === 'days_of_week') {

        const daysOfWeekMapping = {
          sunday: 0,
          monday: 1,
          tuesday: 2,
          wednesday: 3,
          thursday: 4,
          friday: 5,
          saturday: 6,
        };
        const dayIndex = daysOfWeekMapping[value];
        console.log("dayIndex", dayIndex)
        if (dayIndex !== undefined) {
          setNewCourse((prevCourse) => ({
            ...prevCourse,
            days_of_week: {
              ...prevCourse.days_of_week,
              dayIndex:value,
       
            },
          }));
        }
      } else if (name === 'trainer_id' || name === 'hall' || name==='registration_fee') {
        setNewCourse({
          ...newCourse,
          [name]: Number(value),
        });
      }else {
        setNewCourse({
          ...newCourse,
          [name]: value,
        });
      }
    };
    

    

  const handleFileChange = (e) => {
    const { name, value } = e.target;
   
      setNewCourse ({ ...newCourse, [name]: value.files });
   
      
  };

  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses(authState.accessToken, authState.branch_id);
        console.log("co", courses)
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    if (authState.isAuthenticated) {
      fetchCourses();
    }
  }, [courses][authState]);

  

  
  useEffect(() => {
    const fetchCoaches = async () => {
      console.log("hello")
        // setLoading(true);
        try {
            const response = await getCoaches(authState.accessToken, authState.branch_id);
           
                console.log("resss", response)
                setCoaches(response)
        
        } catch (error) {
            console.error("Error fetching coaches:", error.message);
            setError('Error fetching coaches');
        } finally {
            setLoading(false);
        }

        
    };
    if (authState.accessToken) {
      fetchCoaches();
  }
}, [authState]);

useEffect(() => {
  const f_co = async () => {
    setNewA(coaches.map(coach => ({
      label: coach.user.username,
      value: coach.id.toString()
    })));
  };

  f_co();
}, [coaches]);

console.log("coaches inside", coaches)
console.log("coaches id", coaches.map((coach)=> coach.id))
// console.log("coaches data:",JSON.stringify(coaches, null, 2));

    
    //  
     console.log("new", newA)
     
  return (
    <Container >
      <div className={classes.header}>
        <h1>Manage Courses</h1>
        <TextInput
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className={classes.search}
        />
        <Button color="lime" onClick={handleAddNewCourse}>New Course</Button>
      </div>
      <Grid grow gutter="md">
        {courses.map(course => (
          <Grid.Col key={course.id} span={4}>
            <CourseCard course={course} onEdit={handleEdit} onDelete={handleDelete} />
          </Grid.Col>
        ))}
      </Grid> 

      {/* Edit Course Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Course"
        centered
      >
        {currentCourse && (
          <div>
            <TextInput
              label="Name"
              name="name"
              value={currentCourse.name}
              onChange={handleChange}
            />
            <Select
              label="Coach"
              data={newA}
              name="trainer_id"
              onChange={(value)=>handleChange({target:{name:'trainer_id', value}})}
            />
            <TextInput
              label="Description"
              name="description"
              value={currentCourse.description}
              onChange={handleChange}
            />
            <NumberInput
              label="Max number of trainees"
              name="allowed_number_for_class"
              value= {currentCourse.allowed_number_for_class}
              onChange={(e)=>{handleChange({target:{name:'allowed_number_for_class', value:e}})}}/>

             <NumberInput
              label="Allow to cancel"
              description="you can cancel the registration after:"
              name="allowed_days_to_cancel"
              value= {currentCourse.allowed_days_to_cancel}
              onChange={(e)=>{handleChange({target:{name:'allowed_days_to_cancel', value:e}})}}/>
            <DateInput
              label="Start Date"
              name="start_date"
              value={currentCourse.start_date}
              onChange={handleChange}
            />
              <DateInput
              label="End Date"
              name="end_date"
              value={currentCourse.end_date}
              onChange={handleChange}
            />
             
             <TimeInput
             label="From"
             name="start_tiem"
              withAsterisk
              description="Start time"
              placeholder="Input placeholder"
              value={currentCourse.start_time}

             />

            <TimeInput
              label="End Time"
              name="times"
              value={currentCourse.end_time}
              onChange={handleChange}
            />
            <FileInput
              label="Image URL"
              name="image"
              value={currentCourse.image}
              onChange={handleChange}
            />
            <Button color="green" onClick={handleSaveEdit} style={{ marginTop: '10px' }}>Save</Button>
          </div>
        )}
      </Modal>

      {/* New Course Modal */}
      <Modal
        opened={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Add New Course"
        centered
      >
        <div>
          <TextInput
            label="Name"
            name="name"
            value={newCourse.name}
            onChange={handleChange}
          />
          <Select
                data={newA}
                label="Coach Name"
                name="trainer_id"
                onChange={(e)=>handleChange({target:{name:'trainer_id',value:e}})}
            />
          <TextInput
            label="Description"
            name="description"
            value={newCourse.description}
            onChange={handleChange}
          />
           <NumberInput
              label="Max number of trainees"
              name="allowed_number_for_class"
              value= {newCourse.allowed_number_for_class}
              onChange={(e)=>{handleChange({target:{name:'allowed_number_for_class', value:e}})}}/>

             <NumberInput
              label="Allow to cancel"
              description="you can cancel the registration after:"
              name="allowed_days_to_cancel"
              value= {newCourse.allowed_days_to_cancel}
              onChange={(e)=>{handleChange({target:{name:'allowed_days_to_cancel', value:e}})}}/>
          <DateInput
            label="Start_date"
            name="start_date"
            value={newCourse.start_date}
            onChange={(e)=>handleChange({target:{name:'start_date',value:e}})}
          />
           <DateInput
            label="End date"
            name="end_date"
            value={newCourse.end_date}
            onChange={(e)=>handleChange({target:{name:'end_date', value:e}})}
          />
         
         <TimeInput
             label="From"
             name="start_time"
             withSeconds
              withAsterisk
              description="Start time"
              placeholder="Input placeholder"
              value={newCourse.start_time}
              onChange={(e)=>handleChange(e,'start_time')}
             />

            <TimeInput
            withSeconds
              label="End Time"
              name="end_time"
              value={newCourse.end_time}
              onChange={handleChange}
            />
             <MultiSelect
               label="Select the days"
               name='days_of_week'
               data={['sunday', 'monday', 'tusday','wedensday','thursday','friday','saturday']}
               onChange={(value) => handleChange({ target: { name: 'days_of_week', value } })}
               />
            <Select
             label="Hall"
             name='hall'
             data={["1","2"]}
             value={newCourse.hall}
             onChange={(e)=>handleChange({target:{name:'hall',value:e}})}
            />
            <NumberInput
            label='Registration price'
            name='registration_fee'
            value={newCourse.registration_fee}
            onChange={(e)=>handleChange({target:{name:'registration_fee',value:e}})}

            />
          <FileInput
            label="Image URL"
            name="image"
            value={newCourse.image}
            onChange={(e)=>handleFileChange({name:'img', value:e})}
          />
          <Button color="lime" onClick={handleSaveNew} style={{ marginTop: '10px' }}>Save</Button>
        </div>
      </Modal>
    </Container>
  );
};

export default ManageCourse;
