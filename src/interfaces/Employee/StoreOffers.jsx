import React, { useState, useEffect } from "react";
import { Container, Card, Group, Button, Text, Modal } from "@mantine/core";
import { IconShoppingCart, IconTags } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Layout from "../../LayoutA";

const StoreOffers = ({ onOptionSelect }) => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  return (
    <Layout>
      <Container
        mt={40}
        style={{
          border: "1px solid #a1e533",
          borderRadius: 10,
          backgroundColor: "#2c2c2c",
          padding: "100px 20px",
        }}
      >
        <Group position="center" spacing="xl" style={{ marginTop: "50px" }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{ width: 300, backgroundColor: "#424141", color: "#fff" }}
          >
            <Group position="apart" style={{ marginBottom: 5 }}>
              <Text weight={500}>Product Offers</Text>
              <IconShoppingCart size={28} color="lime" />
            </Group>
            <Text size="sm" color="dimmed">
              View and manage offers for individual products.
            </Text>
            <Button
              variant="light"
              color="lime"
              fullWidth
              style={{ marginTop: 14 }}
              onClick={() => navigate("/EmpProductOffers")}
            >
              Go to Product Offers
            </Button>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
              width: 300,
              backgroundColor: "#424141",
              color: "#fff",
              border: "none",
            }}
          >
            <Group position="apart" style={{ marginBottom: 5 }}>
              <Text weight={500}>Category Offers</Text>
              <IconTags size={28} color="lime" />
            </Group>
            <Text size="sm" color="dimmed">
              View and manage offers for entire categories.
            </Text>
            <Button
              variant="light"
              color="lime"
              fullWidth
              style={{ marginTop: 14 }}
              onClick={() => navigate("/EmpCatOffers")}
            >
              Go to Category Offers
            </Button>
          </Card>
        </Group>

        {/* <Modal opened={opened} onClose={() => setOpened(false)} title="Offer Type">
          <Button variant="light"
            color="lime" size='md' onClick={() =>navigate('/PriceOffer')}>Price Offer</Button>
          <Button  variant="light"
            color="lime" size='md' onClick={() =>navigate('/PercentageOffer')}>Percentage Offer</Button>

        </Modal> */}
      </Container>
    </Layout>
  );
};

export default StoreOffers;
