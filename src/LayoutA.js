import React from "react";
import Header from "./Components/Header";

const Layout = ({ children }) => {
    return (
     
      <div style={{ width:'100%',height: '100vh', display: 'flex', flexDirection: 'column' }}>
           <Header />
          {children}
        </div>
    );
  };
  
  export default Layout;