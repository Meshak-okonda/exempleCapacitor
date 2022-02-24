import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DriverListResults } from "../../components/driver/driver-list-results";
import { DriverListToolbar } from "../../components/driver/driver-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import { customers } from "../../__mocks__/customers";

const Customers = () => (
  <>
    <Head>
      <title>Customers | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <DriverListToolbar />
        <Box sx={{ mt: 3 }}>
          <DriverListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
