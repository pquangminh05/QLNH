import React, { ReactNode } from "react";
import Navbar from "../NavBar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="py-16">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
