import React, { useState, useEffect } from "react";
import { NumberInput, Select, Container, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useAuth } from "../../AuthContext";
import classes from './Discount.module.css';
import { addCategoryOffersPer, classOffer, getCategories, getCourses } from "../../ApiServices/OffersServices";
import moment from "moment";

const CatDiscount = () => {
    const { authState } = useAuth();
    const [selectedItems, setSelectedItems] = useState(0);
    const [categories, setCategories] = useState([]);
    const [amount, setAmount] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const res = async () => {
            try {
                const data = await getCategories(authState.accessToken);
                console.log("dat:", data);
                const formattedData = data.map(cat => ({
                    label: cat.name,
                    value: cat.id.toString()
                }));
                setCategories(formattedData)
            } catch (e) {
                console.log("error:", e);
            }
        };
        res();
    }, [authState.accessToken])

    const handleAddDiscount = async () => {
        try {
            console.log("selc:", selectedItems)
            console.log("date:", startDate)
            console.log("amount:", amount)

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

                const formatStartDate = moment(startDate).format("YYYY-MM-DD");
                const formatEndDate = moment(endDate).format("YYYY-MM-DD");

                const data = {
                    start_date: formatStartDate,
                    end_date: formatEndDate,
                    offer_data: {
                        percentage_cut: amount,
                        category: selectedItems,
                        supp_category: 0
                    }
                }
                const createOffer = await addCategoryOffersPer(authState.accessToken, authState.branch_id, data);
                console.log("res", createOffer);
                alert("res", createOffer.message);

            }
        } catch (e) {
            console.log("error", e);
            alert(e);
        }
    };

    return (
        <Container className={classes.con}>
            <h1>Create new discount%</h1>
            <Select
                label="Select the item"
                data={categories}
                onChange={(value) => setSelectedItems(parseInt(value, 10))}
                searchable
                required
                error={errors.selectedItems}
            />
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
            <Button color="lime" className={classes.btn} onClick={handleAddDiscount}>
                Add Discount
            </Button>
        </Container>
    );
}

export default CatDiscount;