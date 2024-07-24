import React, { useState } from "react";
import { NumberInput, MultiSelect, Container, Button, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import classes from './Discount.module.css';

const Discount = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [amount, setAmount] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errors, setErrors] = useState({});

    const handleAddDiscount = () => {
        let formErrors = {};

        if (!startDate) {
            formErrors.startDate = 'Start date is required';
        }

        if (!endDate) {
            formErrors.endDate = 'End date is required';
        } else if (endDate < startDate) {
            formErrors.endDate = 'End date cannot be before start date';
        }

        if (amount === null || amount <= 0) {
            formErrors.amount = 'Amount must be greater than 0';
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            // Add discount logic here
            console.log('Discount added');
        }
    };

    return (
        <Container className={classes.con}>
            <h1>Create new discount%</h1>
            <MultiSelect
                label="Select the item"
                data={['meal', 'cloth']}
                onChange={setSelectedItems}
                searchable
                required
                error={errors.selectedItems}
            />
            <NumberInput
                label="Amount of discount"
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
            <Button color="lime" className={classes.btn} onClick={handleAddDiscount}>
                Add Discount
            </Button>
        </Container>
    );
}

export default Discount;
