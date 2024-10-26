import React, { useState, useEffect } from "react";
import { Container, Button, Loader, TextInput } from "@mantine/core";
import { getClassOffers } from "../../ApiServices/OffersServices";
import OffersTable from "../../Components/Employee/OffersTable";
import classes from "./ClassesOffers.module.css";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import Layout from "../../LayoutA";
import { FaSearch } from "react-icons/fa";

const ClassesOffers = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { authState } = useAuth();

  useEffect(() => {
    setLoading(true);
    const res = async () => {
      try {
        const offer = await getClassOffers(
          authState.accessToken,
          authState.branch_id
        );
        console.log("res of get offers:", offer);
        setData(offer);
        setLoading(false);
      } catch (e) {
        console.log("error", e);
      }
    };
    res();
  }, [authState.accessToken, authState.branch_id]);

  const handleNew = () => {
    navigate("/EmpDiscount");
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  if(loading){
    return <Loader size="lg" color="lime" />;
  }

  return (
    <Layout>
      <Container
        mt={40}
        style={{
          border: "1px solid #a1e533",
          borderRadius: 10,
          backgroundColor: "#2c2c2c",
          padding: 20,
        }}
      >
        <div className={classes.TB} style={{ padding: "0px 16px" }}>
          <h1 style={{ color: "#fff" }}>Offers</h1>
          <TextInput
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className={classes.search}
            leftSection={<FaSearch />}
            style={{ padding: "5px", fontSize: "16px" }}
          />
          <Button onClick={handleNew} color="lime" size="sm" a>
            New Offer
          </Button>
        </div>
        <OffersTable offer={data} />
      </Container>
    </Layout>
  );
};

export default ClassesOffers;
