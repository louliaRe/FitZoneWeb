import React from "react";
import { Badge, Card, Text, Image, Group, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./AddEmp.module.css";
import Layout from "../LayoutA";

const mockdata = {
  image: <Image src="./employee.jpg" />,
  title: "Employees",
  Activities: "Add/ Delete/ Edit",

  badges: [
    { emoji: "➕", label: "Add" },
    { emoji: "❌", label: "Delete" },
  ],
};

const AddEmp = () => {
  const { title, Activities, badges } = mockdata;
  const features = badges.map((badge) => (
    <Badge
      variant="light"
      key={badge.label}
      leftSection={badge.emoji}
      color="pink"
    >
      {badge.label}
    </Badge>
  ));

  return (
    <Layout>
      <Card shadow="md" radius="md" p="md" className={classes.card}>
        <Card.Section>
          <Image src="/employee.jpg" alt={title} height={300} />
        </Card.Section>
        <Group mt="xs">
          <div>
            <Link to="/ManageGyms">
              <Button
                radius="md"
                size="sm"
                color="#211F1F"
                variant="light"
                style={{ flex: 1, marginLeft: "50%" }}
              >
                Show Employees List
              </Button>
            </Link>
          </div>
        </Group>
      </Card>
    </Layout>
  );
};
export default AddEmp;
