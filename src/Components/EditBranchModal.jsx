import React, { useState } from 'react';
import { Modal, TextInput, Checkbox, Button } from '@mantine/core';

const EditBranchModal = ({ branch, isOpen, onClose, onSubmit }) => {
    const [address, setAddress] = useState(branch.address);
    const [hasStore, setHasStore] = useState(branch.has_store);
    const [isActive, setIsActive] = useState(branch.is_active);

    const handleSubmit = () => {
        const updatedBranch = {
            ...branch,
            address,
            has_store: hasStore,
            is_active: isActive
        };
        onSubmit(updatedBranch);
        onClose();
    };

    return (
        <Modal opened={isOpen} onClose={onClose} title="Edit Branch" centered>
            <TextInput label="Address"
             value={address} 
             onChange={(event) => setAddress(event.currentTarget.value)} />

            <Checkbox label="Has Store" 
            checked={hasStore}
             onChange={(event) => setHasStore(event.currentTarget.checked)}
             color='lime' />
            <Checkbox label="Is Active" 
            checked={isActive}
             onChange={(event) => setIsActive(event.currentTarget.checked)} 
             color='lime'/>
            <Button fullWidth mt="md" onClick={handleSubmit} color='lime'>
                Submit
            </Button>
        </Modal>
    );
};

export default EditBranchModal;
