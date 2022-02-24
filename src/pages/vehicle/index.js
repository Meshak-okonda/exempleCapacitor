import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import { VehicleListResults } from "../../components/vehicle/vehicle-list-results";
import { VehicleListToolbar } from "../../components/vehicle/vehicle-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { customers } from "../../__mocks__/customers";

const Customers = () => {

  return (
    <>
      <Head>
        <title>Page Vehicule</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <VehicleListToolbar />
          <Box sx={{ mt: 3 }}>
            <VehicleListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
