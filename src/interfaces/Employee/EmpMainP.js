import GridServices from "../../Components/Employee/GridServices";
import { Text , Container, Title} from "@mantine/core";
import classes from './EmpMainP.module.css'
import { useAuth } from '../../AuthContext';

const EmpMainP=()=>{
    const { authState } = useAuth();
    const { username } = authState;

    
    return(
       <Container style={{marginTop:'10px', marginBottom:'10px'}}>
        <div className={classes.rec}>
     <Title>Welcome {username}!</Title>
     <Text className={classes.text}>Ready to achieve your goals! </Text>
     </div>
     <GridServices/>
     </Container>
     
    )
}
export default EmpMainP;