import React, { useState, useEffect } from "react";
import { Container, Button } from "@mantine/core";
import { getClassOffers } from "../../ApiServices/OffersServices";
import OffersTable from "../../Components/Employee/OffersTable";
import classes from './ClassesOffers.module.css';
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const ClassesOffers = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { authState } = useAuth();
 
    useEffect(() => {
        const res = async () => {
            try {
                const offer = await getClassOffers(authState.accessToken, authState.branch_id);
                console.log("res of get offers:", offer);
                setData(offer); // assuming offer contains the data you want to set
            } catch (e) {
                console.log("error", e);
            }
        };
        res();
    }, [authState.accessToken, authState.branch_id]);

    const handleNew = () => {
        navigate('/EmpDiscount');
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <Container>
            <div className={classes.TB}>
                <h1 style={{ color: '#fff' }}>Offers</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                    className={classes.search}
                    style={{ padding: '5px', fontSize: '16px' }}
                />
                <Button onClick={handleNew} color="lime" size="sm" className={classes.btn}>
                    New Offer
                </Button>
            </div>
            <OffersTable offer={data} />
        </Container>
    );
};

export default ClassesOffers;
