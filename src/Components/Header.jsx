import React, { useState } from "react";
import { useAuth } from "../AuthContext";

import { Flex, Button, Title, Group } from "@mantine/core";
import Logo from "./Logo";

const Header = () => {
  const { logout } = useAuth();

  return (
    <Flex align="center" justify="space-between" className="header">
      <Group align="center" justify="center" gap={0}>
        <Logo />
        <Title pb={10}>FitZone</Title>
      </Group>
      <Button onClick={logout} color="#a1E533">
        Logout
      </Button>
    </Flex>
  );
};
export default Header;
