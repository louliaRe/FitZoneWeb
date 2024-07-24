import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBranches } from '../ApiServices/ManagerServices';
import DisplayBranch from '../Components/DisplayBranch';
import { useAuth } from '../AuthContext';


const Branches = () => {
    const { id } = useParams();
    const [branches, setBranches] = useState([]);
    const [gym, setGym] = useState(null);
    const {authState} = useAuth()

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await getBranches(id, authState.accessToken);
                setBranches(response.data);
                setGym(response.gym);
            } catch (error) {
                console.error('Error fetching branches:', error.message);
            }
        };

        fetchBranches();
    }, [id]);

    return (
        <div>
            {gym && <h1>{gym.name}</h1>}
            {branches.map(branch => (
                <DisplayBranch key={branch.id} branch={branch} />
            ))}
        </div>
    );
};

export default Branches;
