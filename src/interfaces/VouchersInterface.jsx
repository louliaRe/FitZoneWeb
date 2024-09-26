import React, { useState } from "react";
import VouchersTable from "../Components/VouchersTable";
import {
  Button,
  ActionIcon,
  Modal,
  TextInput,
  NumberInput,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./VouchersInterface.module.css";
import { Container, Plus } from "tabler-icons-react";
import { useAuth } from "../AuthContext";
import { addVoucher } from "../ApiServices/AdminServices";
import Layout from "../LayoutA";

const VouchersInterface = () => {
  const { authState } = useAuth();
  const [opened, setOpened] = useState(false);
  const [newVoucher, setNewVoucher] = useState({
    name: "",
    points_required: 0,
    number_of_days: 0,
    restrict_num_using: 0,
    discount: 0,
  });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Points");
  };

  const handleChange = (field, value) => {
    setNewVoucher({
      ...newVoucher,
      [field]: value,
    });
  };

  const handleAddVoucher = () => {
    setOpened(true);
  };

  const handleSave = async () => {
    console.log("New Voucher", newVoucher);
    const send = await addVoucher(authState.accessToken, newVoucher);
    console.log("Send", send);
  };

  return (
    <Layout>
      <Stack justify="center">
        <div className={classes.header}>
          <h1>Vouchers Interface</h1>
          <div className={classes.con}>
            <Button
              className={classes.btn}
              onClick={handleClick}
              color="#a1E533"
              variant="outline"
            >
              Show Points
            </Button>
            <ActionIcon
              onClick={handleAddVoucher}
              className={classes.icon}
              color="lime"
              size="lg"
            >
              <Plus size={20} />
            </ActionIcon>
          </div>
        </div>
        <VouchersTable />
      </Stack>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Voucher"
        centered
      >
        <TextInput
          label="Name"
          placeholder="Voucher Name"
          value={newVoucher.name}
          onChange={(event) => handleChange("name", event.currentTarget.value)}
          required
        />
        <NumberInput
          label="Points Required"
          placeholder="Points"
          value={newVoucher.points_requireds}
          onChange={(value) => handleChange("points_required", value)}
          min={0}
          required
        />
        <NumberInput
          label="Number of Days"
          placeholder="Days"
          value={newVoucher.number_of_days}
          onChange={(value) => handleChange("number_of_days", value)}
          min={0}
          required
        />
        <NumberInput
          label="Restrict Number of Using"
          placeholder="Restriction"
          value={newVoucher.restrict_num_using}
          onChange={(value) => handleChange("restrict_num_using", value)}
          min={0}
        />
        <NumberInput
          label="Discount"
          placeholder="Discount"
          value={newVoucher.discount}
          onChange={(value) => handleChange("discount", value)}
          min={0}
          max={100}
          required
        />
        <Button
          onClick={handleSave}
          color="#a1E533"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </Modal>
    </Layout>
  );
};
export default VouchersInterface;
