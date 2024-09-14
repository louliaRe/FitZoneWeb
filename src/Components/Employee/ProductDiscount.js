import React, { useState, useEffect } from "react";
import { NumberInput, Select, Container, Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useAuth } from "../../AuthContext";
import classes from './ProductDiscount.module.css';
import {addProductOffer, getProducts, getProductsOffers } from "../../ApiServices/OffersServices";
import moment from "moment";

const ProductDiscount = () => {
    const { authState } = useAuth();
    const [selectedItems, setSelectedItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [amount, setAmount] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [price, setPrice] = useState(null);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const res = async () => {
            try {
                const data = await getProducts(authState.accessToken, authState.branch_id);
                console.log("prod:", data);
                const formattedData = data.map(pro => ({
                    label: pro.product.name,
                    value: pro.branch_product_id.toString()
                }));
                console.log("formaT", formattedData);
                setProducts(formattedData)
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
            if (price === null || price <= 0) {
                formErrors.price = 'Price must be greater than 0';
            }

            if (selectedItems.length === 0) {
                formErrors.selectedItems = 'At least one item must be selected';
            }

            selectedItems.forEach((item, index) => {
                if (item.number <= 0) {
                    formErrors[`itemNumber_${index}`] = 'Number must be greater than 0';
                }
            });

            setErrors(formErrors);

            if (Object.keys(formErrors).length === 0) {

                const formatStartDate = moment(startDate).format("YYYY-MM-DD");
                const formatEndDate = moment(endDate).format("YYYY-MM-DD");

                const data = {
                    start_date: formatStartDate,
                    end_date: formatEndDate,
                    offer_data: {
                        price: price,
                        objects_data: selectedItems.map(item => ({
                            product: item.product,
                            number: item.number
                        }))
                    }
                };
                const createOffer = await addProductOffer(authState.accessToken, authState.branch_id, data);
                console.log("res", createOffer);
                alert("res", createOffer.message);

            }
        } catch (e) {
            console.log("error", e);
            alert(e);
        }
    };

    const handleSelectChange = (productId) => {
        const existingItem = selectedItems.find(item => item.product === parseInt(productId, 10));
        if (!existingItem) {
            setSelectedItems([...selectedItems, { product: parseInt(productId, 10), number: 1 }]);
        }
    };

    const handleNumberChange = (index, number) => {
        const newItems = [...selectedItems];
        newItems[index].number = number;
        setSelectedItems(newItems);
    };

    return (
        <Container className={classes.con}>
            <h1>Create new discount%</h1>
            <Select
                label="Select the item"
                    data={products}
                onChange={(value) => handleSelectChange(parseInt(value, 10))}
                searchable
                required
                error={errors.selectedItems}
            />
             {selectedItems.map((item, index) => (
                <NumberInput
                    key={item.product}
                    label={`Number of product ID ${item.product}`}
                    value={item.number}
                    onChange={(value) => handleNumberChange(index, value)}
                    required
                    min={1}
                    error={errors[`itemNumber_${index}`]}
                />
            ))}
            <NumberInput
                label="Price"
                placeholder="Enter the offer price"
                value={price}
                onChange={setPrice}
                required
                min={1}
                error={errors.price}
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

export default ProductDiscount;
