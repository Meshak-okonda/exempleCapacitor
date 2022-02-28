import { useState } from "react";
import Head from "next/head";
import FormAddControl from "../../components/control/FormAddControl";
import ModifyControl from "../../components/control/ModifyControl";
import ModifyFormControl from "../../components/control/ModifyFormControl";
import { useAppSelector } from "../../hooks";
import { DashboardLayout } from "../../components/dashboard-layout";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Calendar } from "primereact/calendar";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.userConnected);
  const { vehicles } = useAppSelector((state) => state.globalState);
  const [day, setDay] = useState(null);
  let idVehicle = vehicles.find(({ idDriver }) => idDriver === user.id)?.id;

  if (!idVehicle)
    return (
      <Card>
        <CardHeader
          title={
            'Aucun Vehicule attribuer'
          }
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              alt="Under development"
              src="/static/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 10,
                display: "inline-block",
                maxWidth: "100%",
                width: 500,
                height: 500,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    );

  return (
    <>
      <Head>
        <title>Control de Vehicule | Fleet Management Soft</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid
              container
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
              spacing={2}
            >
              <Grid
                item
                xl={6}
                lg={6}
                sm={12}
                xs={12}
              >
                <Card sx={{ height: 150 }}>
                  <CardContent>
                    <Box
                      sx={{
                        pt: 0,
                        alignItems: "center",
                      }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Jour
                      </InputLabel>
                      <Calendar
                        value={day}
                        onChange={({ value }) => {
                          const date = new Date(value);
                          date.setDate(date.getDate() + 1);
                          const dateNow = date
                            .toISOString()
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/");
                          setDay(dateNow);
                        }}
                        dateFormat="dd/mm/yy"
                        yearRange="2010:2030"
                        placeholder="Date de selection "
                        style={{width: "100%"}}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              {idVehicle && day && (
                <FormAddControl idVehicle={idVehicle} dateControl={day} />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
