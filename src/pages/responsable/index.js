import Head from "next/head";
import { Box, Container } from "@mui/material";
import { ResponsableListResults } from "../../components/responsable/responsable-list-results";
import { ResponsableListToolbar } from "../../components/responsable/responsable-list-toolbar";
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
        <ResponsableListToolbar />
        <Box sx={{ mt: 3 }}>
          <ResponsableListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
