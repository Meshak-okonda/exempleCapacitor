import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import StatCar from "../components/dashboard/StatCar";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { useAppSelector } from "../hooks";

const Dashboard = () => {
  const { vehicles } = useAppSelector((state) => state.globalState);

  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <Budget />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TotalCustomers />
            </Grid>
            <Grid item xl={4} lg={4} sm={6} xs={12}>
              <TasksProgress />
            </Grid>
            {vehicles.length &&
              vehicles
                .filter((veh) => veh.delete != true)
                .map((vehicle) => (
                  <Grid item lg={4} md={6} xl={3} xs={12}>
                    <StatCar key={vehicle.id} vehicle={vehicle} />
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Box>
    </>
  );}

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
