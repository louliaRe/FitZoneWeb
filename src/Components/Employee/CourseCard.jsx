import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Modal,
  TextInput,
} from "@mantine/core";
import classes from "./CourseCard.module.css";
import { DateInput, TimeInput } from "@mantine/dates";
import Loading from "../Loading";

const CourseCard = ({ course, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCourse, setEditedCourse] = useState({
    ...course,
    dates: new Date(course.dates),
    times: new Date(course.times),
  });
  const [loading, setLoading] = useState(false);
  console.log("course inside course card :", course);

  useEffect(() => {
    console.log(course);
  });
  console.log("course inside card", course);
  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    onEdit(editedCourse);
    setIsModalOpen(false);
  };

  const handleChange = (field, value) => {
    setEditedCourse({ ...editedCourse, [field]: value });
  };

  return (
    <>
      <Card
        style={{
          border: "1px solid #a1e533",
          borderRadius: 10,
          backgroundColor: "#2c2c2c",
          padding: 20,
        }}
        shadow="sm"
        padding="lg"
        className={classes.card}
      >
        <Card.Section>
          <Image src={course.image_path} height={160} alt={course.name} />
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: 10 }}>
          <Text className={classes.name}>{course.name}</Text>
        </Group>

        <Text size="sm">
          <Text className={classes.title}>Coach:</Text>{" "}
          {course.schedule && Array.isArray(course.schedule)
            ? course.schedule
                .map((co) => co.trainer.employee.user.username)
                .join(", ")
            : "No schedule available"}
        </Text>
        <Text size="sm">
          Duration: <bold style={{ color: "#a1E533" }}>from:</bold>{" "}
          {course.schedule && Array.isArray(course.schedule)
            ? course.schedule.map((co) => co.start_time).join(",")
            : "No schedule available"}{" "}
          <bold style={{ color: "#a1E533" }}>to: </bold>
          {course.schedule && Array.isArray(course.schedule)
            ? course.schedule.map((co) => co.end_time).join(",")
            : "No schedule available "}{" "}
        </Text>
        <Text size="sm">
          Dates: <bold style={{ color: "#a1E533" }}>from:</bold>{" "}
          {course.schedule && Array.isArray(course.schedule)
            ? course.schedule.map((co) => co.start_time).join(",")
            : "No schedule available"}{" "}
          <bold style={{ color: "#a1E533" }}>to: </bold>
          {course.schedule && Array.isArray(course.schedule)
            ? course.schedule.map((co) => co.start_date).join(",")
            : "No date available"}{" "}
          <bold style={{ color: "#a1E533" }}>to: </bold>
          {course.schedule && Array.isArray(course.schedule)
            ? course.schedule.map((co) => co.end_date).join(",")
            : "No available date"}
        </Text>
        <Text size="sm">
          Registration:
          {course.registration_fee}
        </Text>

        <Group className={classes.group}>
          <Button onClick={handleEdit} color="lime">
            Edit
          </Button>
          <Button onClick={() => onDelete(course.id)} color="red">
            Delete
          </Button>
        </Group>
      </Card>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Course"
      >
        <TextInput
          label="Course Name"
          value={editedCourse.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <TextInput
          label="Coach Name"
          value={editedCourse.coachName}
          onChange={(e) => handleChange("coachName", e.target.value)}
        />
        <TextInput
          label="Duration"
          value={editedCourse.duration}
          onChange={(e) => handleChange("duration", e.target.value)}
        />
        <DateInput
          label="Dates"
          value={editedCourse.dates}
          onChange={(value) => handleChange("dates", value)}
        />
        <TimeInput
          label="Times"
          value={editedCourse.times}
          onChange={(value) => handleChange("times", value)}
        />
        <Button onClick={handleSave} color="lime">
          Save
        </Button>
      </Modal>
    </>
  );
};

export default CourseCard;
