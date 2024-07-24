import React,{useState} from "react";
import { useAuth } from "../AuthContext";

import { Flex,Button,Title } from "@mantine/core";
import Logo from "./Logo";

const Header=()=>{
    const {logout,} = useAuth();

    return(
        <Flex align='center' justify='space-between' className='header'>
        <Flex align='center'>
          <Logo />
          <Title style={{ marginLeft: '10px' }}>FitZone</Title>
        </Flex>
        <Button onClick={logout} color="#a1E533">Logout</Button>
      </Flex>
    );
};
export default Header;