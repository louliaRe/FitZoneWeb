import React, { useState, useEffect } from "react";
import { Container, Button, TextInput, Loader } from "@mantine/core";
import CategoryOffersTable from "../../Components/Employee/CategoryOffersTable";
import { useNavigate } from "react-router-dom";
import { getProductsOffers } from "../../ApiServices/OffersServices";
import { useAuth } from "../../AuthContext";
import Layout from "../../LayoutA";
import { BiSearch, BiSearchAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

const ProductOffers = () => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = useState([]);
  const { authState } = useAuth();
  const  [loading, setLoading]= useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getProductsOffers(
          authState.accessToken,
          authState.branch_id
        );
        console.log(res);
        setData(res);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);

      }
    };
    fetchData();
  }, [authState.accessToken]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
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
        <div className="TB" style={{ padding: "0px 16px" }}>
          <h1 style={{ color: "#fff" }}>Product offers</h1>

          <TextInput
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            style={{ padding: "5px", fontSize: "16px" }}
            leftSection={<FaSearch />}
          />

          <Button
            onClick={() => navigate("/EmpProductDiscount  ")}
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
export default ProductOffers;
