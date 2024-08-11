import React, {useState, useEffect} from "react";
import { Container, Button } from "@mantine/core";
import CategoryOffersTable from "../../Components/Employee/CategoryOffersTable";
import { useNavigate } from "react-router-dom";
import { getCategoryOffersPer } from "../../ApiServices/OffersServices";
import { useAuth } from "../../AuthContext";

const CatOffers=()=>{
    const [search, setSearch] = React.useState("");
    const [data , setData]= useState([]);
    const { authState } = useAuth();
    const navigate = useNavigate();


    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await getCategoryOffersPer(authState.accessToken, authState.branch_id);
                console.log(res);
                setData(res);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    },[authState.accessToken])
    const handleSearch = (e) => {
        setSearch(e.target.value);
      };
    
    return(
        <Container>
      <div className="TB">
        <h1 style={{ color: '#fff' }}>Category offers</h1>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          style={{ padding: '5px', fontSize: '16px' }}
        />

        <Button
          onClick={() => navigate('/EmpCatDiscount')}
          color="#a1E533"
          size="sm"
        >
          New Offer
        </Button>
      </div>
      <CategoryOffersTable offer={data} />
    </Container>
  );
};
export default CatOffers;