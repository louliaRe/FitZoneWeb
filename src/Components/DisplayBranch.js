import React,{useState} from 'react';
import { Button, Card,Text, Group,ActionIcon } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './DisplayBranch.module.css';
import { updateBranch, deleteBranch } from '../ApiServices/ManagerServices';
import { IconPencil, IconTrash, IconPlus } from '@tabler/icons-react';
import EditBranchModal from './EditBranchModal';
import { useAuth } from '../AuthContext';




const DisplayBranch = ({ branch }) => {
    const navigate= useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const {authState}= useAuth()

     
     const handleViewEmployees=(id)=>{
        navigate(`/ManagerEmpTable/${id}`);
         }      
         const handleEditBranch = async (updatedBranch) => {
            try {
                await updateBranch(branch.id, updatedBranch, authState.accessToken );
                // Optionally refresh data here
            } catch (error) {
                console.error('Error updating branch:', error.message);
            }
        };
    
        const handleDeleteBranch = async () => {
            try {
                await deleteBranch(branch.id);
                // Optionally refresh data here
            } catch (error) {
                console.error('Error deleting branch:', error.message);
            }
        };
        return (
            <Card shadow="sm" padding="lg" className={classes.card}>
                <Group position="apart">
                    <div>
                        <Text weight={500} size="lg">
                            {branch.address}
                        </Text>
                        <Text size="sm">Has Store: {branch.has_store ? 'Yes' : 'No'}</Text>
                        <Text size="sm">Active: {branch.is_active ? 'Yes' : 'No'}</Text>
                    </div>
                    <Group>
                        <ActionIcon color="lime" onClick={() => setIsEditModalOpen(true)}>
                            <IconPencil size={16} />
                        </ActionIcon>
                        <ActionIcon color="red" onClick={handleDeleteBranch}>
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                </Group>
                <Button color="lime" onClick={() => handleViewEmployees(branch.id)}>
                    View Employees
                </Button>
    
                <EditBranchModal
                    branch={branch}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleEditBranch}
                />
            </Card>
        );
    };
export default DisplayBranch;
