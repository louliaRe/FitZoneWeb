import React, { useState, useEffect, useContext } from "react";
import CoachesTable from "../../Components/Employee/CoachesTable";
import { useDisclosure } from "@mantine/hooks";
import {
  Loader,
  Box,
  Button,
  Modal,
  Container,
  TextInput,
  PasswordInput,
  Select,
  MultiSelect,
  NumberInput,
} from "@mantine/core";
import classes from "./ManageCoaches.module.css";
import { DateInput } from "@mantine/dates";
import { addCoach, getCoaches } from "../../ApiServices/EmpServices";
import moment from "moment";
import { useAuth } from "../../AuthContext";
import Layout from "../../LayoutA";
import { FaSearch } from "react-icons/fa";

const ManageCoaches = () => {
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedGym, setSelectedGym] = useState("");
  const [search, setSearch] = useState("");
  const [newCoach, setNewCoach] = useState({
    username: "",
    Email: "",
    password: "",
    Description: "",
    days_off: [],
    shift: "",
    birth_date: "",
    start_date: "",
    allowPublicPosts: false,
    trainees: 10,
    branch_id: authState.branch_id,
  });
  const [coaches, setCoaches] = useState([]);
  const [errors, setErrors] = useState({});
  const [visible, { toggle }] = useDisclosure(true);

  console.log("AuthState in ManageCoaches:", authState);

  useEffect(() => {
    setLoading(true);
    const fetchCoaches = async () => {
      try {
        const data = await getCoaches(
          authState.accessToken,
          authState.branch_id
        );
        setCoaches(data);
        toggle();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coaches:", error.message);
        alert(error);
      }
    };
    fetchCoaches();
  }, [authState]);

  console.log("coaches", coaches);
  const handleAddEmp = async (coach) => {
    try {
      const start = moment(coach.start_date).format("YYYY-MM-DD");

      const formatDate = moment(coach.birthday).format("YYYY-MM-DD");

      console.log("date");
      const data = {
        user: {
          username: coach.username,
          password: coach.password,
          password2: coach.password,
          email: coach.Email,
          birth_date: formatDate,
        },
        trainer_data: {
          allow_public_posts: coach.allowPublicPosts,
          num_of_trainees: coach.trainees,
        },
        shift: {
          days_off: {
            day1: coach.days_off[0],
            day2: coach.days_off[1],
            day3: coach.days_off[2],
          },
          shift_type: coach.shift,
        },
        start_date: start,
      };
      console.log("coach:", data);
      const addedCoach = await addCoach(
        data,
        authState.accessToken,
        authState.branch_id
      );
      setCoaches([...coaches, { ...addedCoach, id: coaches.length + 1 }]);

      close();
    } catch (error) {
      console.error("Error adding coach:", error.message);
      setErrors(error.message);
      alert(error.message);
    }
  };
  if (loading) {
    return <Loader className={classes.loader} color="lime" size="xl" />;
  }
  const handleChange = (e) => {
    setNewCoach({ ...newCoach, [e.target.name]: e.target.value });
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
  };

  return (
    <Layout>
      <Box
        pos="relative"
        mt={40}
        style={{
          border: "1px solid #a1e533",
          borderRadius: 10,
          backgroundColor: "#2c2c2c",
          padding: 20,
        }}
      >
        <div className="TB" style={{ padding: "0px 16px" }}>
          <h1 style={{ color: "#fff" }}>Coaches</h1>

          <TextInput
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className={classes.search}
            style={{ padding: "5px", fontSize: "16px" }}
            leftSection={<FaSearch />}
          />

          <Button
            onClick={open}
            color="#a1E533"
            size="sm"
            className={classes.btn}
          >
            New Coach
          </Button>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Modal opened={opened} onClose={close} centered title="New Coach">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddEmp(newCoach);
                setNewCoach({
                  username: "",
                  Email: "",
                  password: "",
                  Description: "",
                  days_off: [],
                  shift: "",
                  birth_date: "",
                  start_date: "",
                  trainees: "",
                  allowPublicPosts: "",
                });
              }}
            >
              <TextInput
                label="Username"
                type="text"
                name="username"
                value={newCoach.username}
                onChange={handleChange}
                placeholder="Mark"
                required
                equired
              />

              <TextInput
                type="email"
                name="Email"
                label="Email"
                value={newCoach.Email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
              <PasswordInput
                label="Password"
                type="password"
                name="password"
                value={newCoach.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <DateInput
                label="BirthDay"
                value={newCoach.birthday}
                onChange={(e) =>
                  handleChange({ target: { name: "birthday", value: e } })
                }
                error={errors.birthday}
                required
              />

              <DateInput
                label="Start Date"
                value={newCoach.start_date}
                onChange={(e) =>
                  handleChange({ target: { name: "start_date", value: e } })
                }
                error={errors.start_date}
                required
              />

              <MultiSelect
                label="Days Off"
                name="days_off"
                onChange={(value) =>
                  setNewCoach({ ...newCoach, days_off: value })
                }
                data={[
                  "sunday",
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                ]}
                required
                multiple
              />
              <Select
                label="Shift"
                name="shift"
                onChange={(value) => setNewCoach({ ...newCoach, shift: value })}
                data={["Morning", "Night", "FullTime"]}
                placeholder="Morning/Night"
                required
              />
              <NumberInput
                label="Max number of trainees"
                name="trainees"
                value={newCoach.trainees}
                onChange={(e) => {
                  handleChange({ target: { name: "trainees", value: e } });
                }}
              />
              <Select
                label="Posts"
                description="When posting in the community allow the post to appear to public?"
                data={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
                onChange={(e) => {
                  handleChange({
                    target: { name: "allowPublicPosts", value: e },
                  });
                }}
              />

              <Button type="submit" color="#a1E533" className={classes.submit}>
                Add Coach
              </Button>
            </form>
          </Modal>
        </div>
        <CoachesTable initdata={coaches} />
      </Box>
    </Layout>
  );
};
// }
export default ManageCoaches;
