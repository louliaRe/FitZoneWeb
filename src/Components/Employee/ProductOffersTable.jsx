import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  ActionIcon,
  Modal,
  NumberInput,
  Button,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useAuth } from "../../AuthContext";
import { getClassOffers } from "../../ApiServices/OffersServices";
import classes from "./OffersTable.module.css";
import { IconTrash, IconPencil } from "@tabler/icons-react";
import {
  DeleteClassOffer,
  UpdateClassOffer,
} from "../../ApiServices/OffersServices";
import moment from "moment";
import Layout from "../../LayoutA";

const ProductOffersTable = ({ offer }) => {
  const { authState } = useAuth();
  const [data, setData] = useState([]);
  const [opened, setOpened] = useState(false);
  const [currentOffer, setCurrentOffer] = useState({});
  const [amount, setAmount] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState({});

  console.log("offers", offer);

  useEffect(() => {
    if (Array.isArray(offer)) {
      setData(offer);
    } else {
      setData([]);
    }
  }, [offer]);

  const handleEditClick = (off) => {
    const formateStart = moment(off.start_date).format("YYYY-MM-DD");
    const formateEnd = moment(off.end_date).format("YYYY-MM-DD");

    console.log("ee", off);
    setCurrentOffer(off);
    setAmount(off.percentage_offer.percentage_cut);
    setStartDate(formateStart);
    setEndDate(formateEnd);
    setOpened(true);
  };

  const handleDelete = async (id) => {
    try {
      await DeleteClassOffer(authState.accessToken, id, authState.branch_id);
      console.log("res of del", DeleteClassOffer);

      setData(data.filter((off) => off.offer_id !== id));
    } catch (e) {
      console.log("error:", e);
    }
  };

  const handleEditSubmit = async (id) => {
    console.log("cur", currentOffer);
    let formErrors = {};

    if (!startDate) {
      formErrors.startDate = "Start date is required";
    }

    if (!endDate) {
      formErrors.endDate = "End date is required";
    } else if (endDate < startDate) {
      formErrors.endDate = "End date cannot be before start date";
    }

    if (amount === null || amount <= 0) {
      formErrors.amount = "Amount must be greater than 0";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const formatStartDate = moment(startDate).format("YYYY-MM-dd");
        const formatEndDate = moment(endDate).format("YYYY-MM-dd");
        const updatedData = {
          start_date: formatStartDate,
          end_date: formatEndDate,
          percentage_cut: amount,
          offer_data: {
            percentage_cut: amount,
          },
        };

        await UpdateClassOffer(
          authState.accessToken,
          currentOffer.offer_id,
          authState.branch_id,
          updatedData
        );
        console.log("Updated class offer", UpdateClassOffer);
        alert("res of", updatedData);
        // setOpened(false);
        // setData(data.map((off) => (off.offer_id === id? { ...off, ...updatedData } : off)));
      } catch (e) {
        console.log("error:", e);
      }
    }
  };
  const rows = data.map((off) => (
    <Table.Tr key={off.offer_id}>
      <Table.Td>{off.percentage_offer.class_data.class_details.name}</Table.Td>

      <Table.Td>{off.percentage_offer.percentage_cut}</Table.Td>
      <Table.Td>
        {off.percentage_offer.class_data.class_details.registration_fee}
      </Table.Td>

      <Table.Td>{off.start_date}</Table.Td>
      <Table.Td>{off.end_date}</Table.Td>

      <Table.Td>
        <ActionIcon color="#a1E533" onClick={() => handleEditClick(off)}>
          <IconPencil />
        </ActionIcon>
      </Table.Td>
      <Table.Td>
        <ActionIcon color="#a1E533" onClick={() => handleDelete(off.offer_id)}>
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Layout>
      <Container mt={40}>
        <Table
          className={classes.tablee}
          horizontalSpacing="lg"
          verticalSpacing="lg"
          withTableBorder
          withColumnBorders
          withRowBorders
        >
          <Table.Thead className={classes.head}>
            <Table.Tr>
              <Table.Th>Course</Table.Th>
              <Table.Th>Percentage cut</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Start Date</Table.Th>
              <Table.Th>End Date</Table.Th>

              <Table.Th>Edit</Table.Th>
              <Table.Th>Delete</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Edit Offer"
        >
          {currentOffer && (
            <>
              <NumberInput
                label="Amount of discount"
                placeholder="50%"
                value={amount}
                onChange={setAmount}
                required
                min={1}
                error={errors.amount}
              />
              <DateInput
                label="Start Date"
                value={startDate}
                onChange={setStartDate}
                required
                error={errors.startDate}
              />
              <DateInput
                label="End Date"
                value={endDate}
                onChange={setEndDate}
                required
                error={errors.endDate}
              />
              <Button onClick={() => handleEditSubmit(currentOffer.offer_id)}>
                Save
              </Button>
            </>
          )}
        </Modal>
      </Container>
    </Layout>
  );
};
export default ProductOffersTable;
