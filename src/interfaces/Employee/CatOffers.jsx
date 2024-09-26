import React, { useState, useEffect } from "react";
import { Container, Button, TextInput } from "@mantine/core";
import CategoryOffersTable from "../../Components/Employee/CategoryOffersTable";
import { useNavigate } from "react-router-dom";
import { getCategoryOffersPer } from "../../ApiServices/OffersServices";
import { useAuth } from "../../AuthContext";
import Layout from "../../LayoutA";
import { FaSearch } from "react-icons/fa";

const CatOffers = () => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = useState([]);
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategoryOffersPer(
          authState.accessToken,
          authState.branch_id
        );
        console.log(res);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [authState.accessToken]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
        <div className="TB" style={{ padding: "0px 16px" }}>
          <h1 style={{ color: "#fff" }}>Category offers</h1>

          <TextInput
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            style={{ padding: "5px", fontSize: "16px" }}
            leftSection={<FaSearch />}
          />

          <Button
            onClick={() => navigate("/EmpCatDiscount")}
            color="#a1E533"
            size="sm"
          >
            New Offer
          </Button>
        </div>
        <CategoryOffersTable offer={data} />
      </Container>
    </Layout>
  );
};
export default CatOffers;
