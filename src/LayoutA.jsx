import React from "react";
import Header from "./Components/Header";
import { AppShell, BackgroundImage } from "@mantine/core";
import Nav from "./Components/Nav";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isEmployeePage = location.pathname.startsWith("/Emp");
  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{ width: isEmployeePage ? 250 : 0, breakpoint: "md" }}
      padding="0px"
    >
      <ConditionalHeaderAndNavbar />

      <AppShell.Main
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
        m={0}
        pt={100}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
function ConditionalHeaderAndNavbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isEmployeePage = location.pathname.startsWith("/Emp");

  return (
    <>
      {!isLoginPage && (
        <AppShell.Header>
          <Header />
        </AppShell.Header>
      )}

      {isEmployeePage && (
        <AppShell.Navbar p="sm" className="nav">
          <Nav />
        </AppShell.Navbar>
      )}
    </>
  );
}

export default Layout;
