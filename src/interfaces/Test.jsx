import React from "react";
import { IconXboxX } from '@tabler/icons-react';
import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

const Test = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={close} 
        title="Authentication" 
        centered 
        closeButtonProps={{
          icon: <IconXboxX size={20} stroke={1.5} />,
        }}
      >
        <Text>this is the modal</Text>
      </Modal>

      <Button onClick={open}>Open modal</Button>
    </>
  );
};

export default Test;
