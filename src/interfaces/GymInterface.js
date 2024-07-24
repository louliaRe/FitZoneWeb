import React, { useState, useEffect } from "react";
import { Table, Container, Modal, Button, TextInput, Radio, Group ,InputWrapper, FileInput,PasswordInput,Select} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { TimeInput } from '@mantine/dates';
import GymsTable from '../Components/GymTable';
import './GymInterface.css';
import { addGym, getGyms, getBranches, addBranch } from '../ApiServices/AdminServices';
import moment from "moment";

const registration_feeArray=[{ type: 'daily', fee: 0 }, { type: 'monthly', fee: 0 }]
const GymInterface = () => {
  const [gyms, setGyms] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newGym, setNewGym] = useState({ name: '', description: '', img: null, has_store: false, allow_retrival: false, days: null,allow_public_posts: false,allowed_days_for_registraiton_cancellation:false,number_of_clients_allowed:100,duration_allowed: 0, cut_percentage: 0, openHour: '', closeHour: '', womanStartHour: '', womanEndHour: '', manager: '', manager_username: '',
   password: '', managerGender: false, birthday: null , 
   registration_fee: [{ type: 'daily', fee: 0}, { type: 'monthly', fee: 0 }]
});
  const [currentGymId, setCurrentGymId] = useState(null);
  const [branches, setBranches] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const gymsData = await getGyms();
        setGyms(gymsData);
      } catch (error) {
        console.error('Error fetching gyms:', error);
      }
    };
    fetchGyms();
  }, [modalOpen]);

  const handleAddGym = async (gym) => {
    
    if(validateForm()){
   
    const formatDate = moment(gym.birthday).format("YYYY-MM-DD");
    // const formData = new FormData();

    // formData.append("image_path", gym.img.name,gym.img);

    try {
      const gymData = {
        name: gym.name,
        description: gym.description,
        start_hour: gym.openHour,
        close_hour: gym.closeHour,
        allow_retrival: gym.allow_retrival,
        allowed_days_for_registraiton_cancellation:gym.allowed_days_for_registraiton_cancellation,
        mid_day_hour: "05:30:00",
        image_path:gym.img,
        
        manager_details: {
          username: gym.manager_username,
          password: gym.password,
          password2: gym.password,
          email: gym.manager,
          gender: gym.managerGender,
          birth_date: formatDate,
        },
        branch: {
          address: gym.address,
          has_store: gym.has_store,
        },
        woman_hours: [
          {
            start_hour: gym.womanStartHour,
            end_hour: gym.womanEndHour,
            day_of_week: gym.days,
          }
        ],
        registration_fee: gym.registration_fee
      };
      
     await addGym(gymData);
      setModalOpen(false);
     setNewGym({ name: '', description: '', img: null, has_store: false, allow_retrival: false, days: null, duration_allowed: 0, cut_percentage: 0, openHour: '', closeHour: '', womanStartHour: '', womanEndHour: '', manager: '', manager_username: '',
       password: '', managerGender: false, birthday: null , 
       registration_fee: [{ type: 'daily', fee: 4 }, { type: 'monthly', fee: 5 }]
    }); // Reset form
    } catch (error) {
      console.error('Error adding gym:', error);
      alert(error)
    }
  }
  };

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };


  // const handleFileChange = (e) => {
  // console.log(e)
  //     setNewGym({ ...newGym, [file]: e.target.files });
  

  // };

  const handleChange = (e) => {
  const {name, value}= e.target
    if (name === 'allow_retrival' || name === 'managerGender' || name === 'has_store') {
      setNewGym({ ...newGym, [name]: value });
    } else if (name === 'img') {
      setNewGym({ ...newGym, [name]: value });
    } else {
      setNewGym({ ...newGym, [name]: value });
    }

  };

  const validateForm = () => {
    const newErrors = {};
    const womanStartHour = moment(newGym.womanStartHour, 'HH:mm:ss');
    const womanEndHour = moment(newGym.womanEndHour, 'HH:mm:ss');
  
   
    if (moment(newGym.birthday).isAfter(moment('2008-01-01'))) {
      newErrors.birthday = 'Manager must be at least 18 years old!';
    }
    if (newGym.duration_allowed !== null && newGym.duration_allowed < 0) {
      newErrors.duration_allowed = 'Duration allowed must be greater than 0';
    }
    if (newGym.cut_percentage !== null && newGym.cut_percentage < 0) {
      newErrors.cut_percentage = 'Cut percentage must be equal to or greater than 0';
    }
  
  if (womanStartHour.isValid() && womanEndHour.isValid() && womanStartHour.isAfter(womanEndHour)) {
    newErrors.womanTime = 'Start hour must be before end hour!';
  }
  

  setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleRegistrationFeeChange = (index, field, value) => {
  
    const updatedFees = [...newGym.registration_fee];
    updatedFees[index][field] = value;

    setNewGym({ ...newGym, registration_fee: updatedFees });
    console.log("reg")
    console.log(newGym.registration_fee)
  };

  const addRegistrationFee = () => {
    setNewGym({
      ...newGym,
      registration_fee: [...newGym.registration_fee, { type: '', fee: 0 }]
    });
  };

  return (
    <Container>
      <div className="TB">
        <h1 style={{ color: '#fff', marginLeft: '-300px', marginRight:'150px' }}>Gyms Table</h1>
        <Button onClick={handleModalToggle} color="#a1E533">Add a New Gym</Button>
      </div>

      <Modal opened={modalOpen} onClose={handleModalToggle} centered title='New Gym'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddGym(newGym);
                        
                    }}>
                   
                        <TextInput
                       
                         name="name"  
                        value={newGym.name}
                        onChange={handleChange}
                        placeholder="Gym Name"
                        required />
                    

                        <input
                        label="Gym Image"
                        name="img"
                        type='file'
                        onChange={handleChange}
                        // onChange={(e)=>handleFileChange(e)}
                        placeholder="gym image"

                        />

                        <TextInput
                        label='description'
                        name="description"
                          type="text"
                          value={newGym.description}
                          onChange={handleChange}
                          placeholder="Description"
                          />
                         <TextInput
                          label='Address'
                          type="text"
                          name='address'
                          value={newGym.Address}
                          onChange={handleChange}
                          placeholder="Address"
                          required
                          />

                          <TimeInput
                          withSeconds
                          label='Open hour'
                          name="openHour"
                          onChange={(e)=>handleChange(e,'openHour')}
                          placeholder="08:00 AM"
                          />
                          
                          <TimeInput
                          withSeconds
                          label='Close hour'
                          name='closeHour'
                          onChange={(e)=>handleChange(e,'closeHour')}
                           placeholder="08:00 AM"
                          />
                          <Group title="Woman hours">

                              <TimeInput
                              withSeconds
                              label="Start time"
                              name="womanStartHour"
                             description="if there is special time for woman"
                              placeholder="09:00 AM"
                            //   value={newGym.womanStartHour}
                            //   onChange={handleChange}
                              onChange={(e)=>handleChange(e,'womanStartHour')}

                           />
                             <TimeInput
                             withSeconds
                              label="end time"
                              name='womanEndHour'
                             description="if there is special time for woman"
                              placeholder="09:00 AM"
                              onChange={(e)=>handleChange(e,'womanEndHour')}

                           />
                           </Group>
                           <Select
                           label="Select the days of women special times"
                           name='days'
                           data={["sunday", "monday", "tusday","wedensday","thursday","friday","saturday"]}
                           onChange={(value) => handleChange({ target: { name: 'days', value } })}

                           />

                           <Radio.Group
                           name="has_store"
                           label="Have a store"
                            withAsterisk
                            onChange={(value) => handleChange({ target: { name: 'has_store', value } })}
                           >
                            <Group mt="xs">
                           <Radio value="true" label="Yes" />
                           <Radio value="false" label="No" />
                            </Group>
                          </Radio.Group>

                         <Radio.Group
                          name="allow_retrival"
                          label="Allow to retrieve products?"
                           withAsterisk
                           onChange={(value) => handleChange({ target: { name: 'allow_retrival', value } })}
                            >
                           <Group mt="xs">
                             <Radio value="true" label="Yes" />
                             <Radio value="false" label="No" />
                          </Group>
                       </Radio.Group>

                      
                        <TextInput
                        type="number"
                        label="Duration allow to retrive"
                        description='if there is a store in this gym and allow retrieve the products'
                        name="duration_allowed"
                        value={newGym.duration_allowed}
                        onChange={(event) => handleChange({ target: { name: 'duration_allowed', value: event.target.value } })}
                        placeholder="2 hours"
                        error={errors.duration_allowed}
                        />
                         <TextInput
                        type="number"
                        label="Cut percentage"
                        description='How much it will cut from the amount?'
                        name="cut_percentage"
                        value={newGym.cut_percentage}
                        onChange={(event) => handleChange({ target: { name: 'cut_percentage', value: event.target.value } })}
                        placeholder="3%"
                        error={errors.cut_percentage}
                        />
                        <Select
                        name="allowed_days_for_registraiton_cancellation"
                        label='Registration cancellation'
                        description="is the gym allow to cancel the registration?"
                        data={[
                          {value:'ture', label:'Yes'},
                          {value:'false', label:'No'},

                        ]}
                        onChange={(value) => handleChange({ target: { name: 'allowed_days_for_registraiton_cancellation', value } })}
                  
                      />
                          



      <TextInput
        label="Manager's username"
        type="text"
        name='manager_username'
        value={newGym.manager_username}
        onChange={handleChange}
        placeholder="Manager12"
        required
      />

      <TextInput
        type="email"
        name="manager"
        label='Manager Email'
        value={newGym.manager}
        onChange={handleChange}
        placeholder="Manager Email"
        required
      />

      <PasswordInput
        label='Manager Password'
        type="password"
        name="password"
        value={newGym.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

                        <Select
                      label="Gender"
                      data={[
                      { value: 'true', label: 'Male' },
                      { value: 'false', label: 'Female' }
                      ]}
                      onChange={(value) => handleChange({ target: { name: 'managerGender', value } })}
                      required
                      />

                     <DateInput
                     label='BirthDay'
                     value={newGym.birthday}
                     onChange={(e) => handleChange({ target: { name: 'birthday', value: e } })}
                     error={errors.birthday} 
                       />
                       
                       <Group title="Registration Fees">
          {registration_feeArray.map((fee, index) => (
            <Group key={index} mt="xs">
             
              <TextInput label={fee.type?fee.type:''}  type="number" value={newGym.registration_fee[index].fee?newGym.registration_fee[index].fee:0} onChange={(e) => handleRegistrationFeeChange(index, 'fee', e.target.value)} />
            </Group>
          ))}

        </Group>

                        <Button type="submit" color="#a1E533" className="submit">Add Gym</Button>
                    </form>
                </Modal>     

               
      <GymsTable initdata={gyms}  />
    </Container>
  );
};

export default GymInterface;
