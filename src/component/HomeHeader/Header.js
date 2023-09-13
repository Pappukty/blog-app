import React from "react";
import { Nav } from "./components/NavLink";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Header;
