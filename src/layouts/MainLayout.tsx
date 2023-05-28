import React, { ReactNode, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mantine/core";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <Box>{children}</Box>
      <Footer />
    </div>
  );
};

export default MainLayout;
