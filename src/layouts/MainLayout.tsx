import React, { ReactNode, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Container } from "@mantine/core";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <Box my={150}>{children}</Box>
      <Footer />
    </div>
  );
};

export default MainLayout;
