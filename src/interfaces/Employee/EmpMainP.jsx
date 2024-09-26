import GridServices from "../../Components/Employee/GridServices";
import { Text, Container, Title } from "@mantine/core";
import classes from "./EmpMainP.module.css";
import { useAuth } from "../../AuthContext";
import Layout from "../../LayoutA";

const EmpMainP = () => {
  const { authState } = useAuth();
  const { username } = authState;

  return (
    <Layout>
      <Container style={{ marginTop: "10px", marginBottom: "10px" }}>
        <div className={classes.rec}>
          <Title>Welcome {username}!</Title>
        </div>
        <GridServices />
      </Container>
    </Layout>
  );
};
export default EmpMainP;
