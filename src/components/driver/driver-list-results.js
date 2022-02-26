import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid
} from "@mui/material";
import { DELETE_DRIVER, REVERSE_DRIVER } from "../../graphql/queries";
import {
  deleteDriver,
  updateDriveInState,
} from "../../redux/slice/globalSlice";
import { getInitials } from "../../utils/get-initials";
import { stringAvatar } from "../../utils/getStringAvatar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Search as SearchIcon } from "../../icons/search";
import PopOver from "../custom/PopOver";
import PopUpSeeDriver from "./PopUpSeeDriver";
import ButtonView from "../ButtonView";
import PopUpMutation from "../custom/PopUpMutation";
import PopUpModifyDriver from "./PopUpModifyDriver";
import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";
import ToastCustom from "../ToastCustom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ButtonSubmit from "../ButtonSubmit";

export const DriverListResults = ({ ...rest }) => {
  const { drivers, vehicles } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalSeeDriver, setModalSeeDriver] = useState(false);
  const [modalOnDelete, setModalOnDelete] = useState(false);
  const [modalOnRecovery, setModalOnRecovery] = useState(false);
  const [modalUpdateOn, setModalUpdateOn] = useState(false);
  const [driverFilter, setDriverFilter] = useState([]);
  const [filter, setFilter] = useState(null);
  const [driverView, setDriverView] = useState(drivers);
  const [idSelect, setIdSelect] = useState("");
  const [data, setData] = useState(null);
  const [toast, setToast] = useState({
    header: "",
    body: "",
    state: false,
    type: "",
    delay: 6000,
  });
  const [valueView, setValueView] = useState('1');

  const handleChangeView = (event, newValueView) => {
    if (newValueView === '1') {
    setDriverView(drivers.filter((dri)=> dri.delete === false));
    } else if (newValueView === '2') {
    setDriverView(drivers.filter((dri) => dri.delete != false));
    } else {
      setDriverView(drivers)
    }
    setValueView(newValueView);
  };

  useEffect(() => {
    if (data) {
      if (data.updateDriver) {
        dispatch(updateDriveInState(data.updateDriver));
        setValueView('1');
      }
      if (data.reverseDeleteDriver) {
        dispatch(updateDriveInState(data.reverseDeleteDriver));
        setValueView("1");
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    setDriverView(drivers.filter((dri) => dri.delete === false));
  }, [drivers]);

  const handleSelectAll = (event) => {
    let newSelectedDriverIds;

    if (event.target.checked) {
      newSelectedDriverIds = drivers.map((driver) => driver.id);
    } else {
      newSelectedDriverIds = [];
    }

    setSelectedDriverIds(newSelectedDriverIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDriverIds.indexOf(id);
    let newSelectedDriverIds = [];

    if (selectedIndex === -1) {
      newSelectedDriverIds = newSelectedDriverIds.concat(selectedDriverIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDriverIds = newSelectedDriverIds.concat(
        selectedDriverIds.slice(1)
      );
    } else if (selectedIndex === selectedDriverIds.length - 1) {
      newSelectedDriverIds = newSelectedDriverIds.concat(
        selectedDriverIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedDriverIds = newSelectedDriverIds.concat(
        selectedDriverIds.slice(0, selectedIndex),
        selectedDriverIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDriverIds(newSelectedDriverIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const viewVehicle = (id) => {
    const vehicle = vehicles.find(({ idDriver }) => id === idDriver);
    if (vehicle)
      return (
        <>
          {vehicle.image[0] ? (
            <Avatar src={vehicle.image[0]} sx={{ mr: 2 }}>
              {vehicle.name}
            </Avatar>
          ) : (
            <Avatar
              {...stringAvatar(`${vehicle.name} ${vehicle.lastName}`)}
              sx={{ mr: 2 }}
            />
          )}
          <Typography color="textPrimary" variant="body1">
            {vehicle.name}
          </Typography>
        </>
      );

    return "Aucune vehicule";
  };

  const confirmMutation = async (mutation) => {
    try {
      await mutation();
      setModalOnDelete(false);
    } catch (error) {
      setToast({
        header: "Erreur",
        body: `Erreur : ${error.message || ""}`,
        type: "error",
        state: true,
      });
    }
  };

  const confirmMutationRecovery = async (mutation) => {
    try {
      await mutation();
      setModalOnRecovery(false);
    } catch (error) {
      setToast({
        header: "Erreur",
        body: `Erreur : ${error.message || ""}`,
        type: "error",
        state: true,
      });
    }
  };

  return (
    <>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Box sx={{ maxWidth: 500 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action" fontSize="small">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search customer"
                    variant="outlined"
                    onChange={({ target: { value } }) => {
                      setFilter(value);
                      if (value.trim() === "") {
                        setDriverView(drivers);
                        return 0;
                      }
                      setDriverFilter(
                        drivers.filter((veh) => {
                          if (
                            `${veh.name.toUpperCase()} ${veh.lastName.toUpperCase()}`.indexOf(
                              value.toUpperCase()
                            ) > -1
                          )
                            return veh;
                        })
                      );
                      setDriverView(
                        driverFilter.length < 1 ? drivers : driverFilter
                      );
                    }}
                  />
                </Box>
              </Grid>
              {user.superAdm && (
                <Grid item md={6} xs={12}>
                  <ToggleButtonGroup
                    value={valueView}
                    exclusive
                    onChange={handleChangeView}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="3" aria-label="left aligned">
                      Tout
                    </ToggleButton>
                    <ToggleButton value="1" aria-label="centered">
                      Non Supplimer
                    </ToggleButton>
                    <ToggleButton value="2" aria-label="right aligned">
                      Supprimer
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom et Post - Nom</TableCell>
                  <TableCell>Vehicule Associé</TableCell>
                  <TableCell>Validité de la Licence</TableCell>
                  <TableCell>E - Mail</TableCell>
                  <TableCell>Numero de telephone</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Sexe</TableCell>
                  <TableCell>Voir</TableCell>
                  {user.upDriver && <TableCell>Maj</TableCell>}
                  {user.delDriver && valueView == "1" && (
                    <TableCell>Sup</TableCell>
                  )}
                  {user.delDriver && valueView != "1" && (
                    <TableCell>Restorer</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {driverView.slice(0, limit).map((driver) => (
                  <TableRow
                    hover
                    key={driver.id}
                    selected={selectedDriverIds.indexOf(driver.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {driver.image[0] ? (
                          <Avatar src={driver.image[0]} sx={{ mr: 2 }}>
                            {driver.name}
                          </Avatar>
                        ) : (
                          <Avatar
                            {...stringAvatar(
                              `${driver.name} ${driver.lastName}`
                            )}
                          />
                        )}
                        <Typography color="textPrimary" variant="body1">
                          {driver.name} {driver.lastName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {viewVehicle(driver.id)}
                      </Box>
                    </TableCell>
                    <TableCell>{driver.licenseValidity}</TableCell>
                    <TableCell>{driver.email}</TableCell>
                    <TableCell>{driver.phone}</TableCell>
                    <TableCell>{driver.age}</TableCell>
                    <TableCell>{driver.sex}</TableCell>
                    <TableCell>
                      <ButtonView
                        onClick={() => {
                          setIdSelect(driver.id);
                          setModalSeeDriver(true);
                        }}
                      />
                    </TableCell>
                    {user.upDriver && (
                      <TableCell>
                        <ButtonEdit
                          onClick={() => {
                            setIdSelect(driver.id);
                            setModalUpdateOn(true);
                          }}
                        />
                      </TableCell>
                    )}
                    {user.delDriver && valueView == "1" && (
                      <TableCell>
                        <ButtonDelete
                          onClick={() => {
                            setIdSelect(driver.id);
                            setModalOnDelete(true);
                          }}
                        />
                      </TableCell>
                    )}
                    {user.delDriver && driver.delete && valueView != "1" && (
                      <TableCell>
                        <ButtonSubmit
                          onClick={() => {
                            setModalOnRecovery(true);
                            setIdSelect(driver.id);
                          }}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={drivers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
        {modalSeeDriver && (
          <PopUpSeeDriver
            openModal={modalSeeDriver}
            setModalON={setModalSeeDriver}
            driver={drivers.find(({ id }) => id === idSelect)}
          />
        )}
        {modalOnDelete && (
          <PopUpMutation
            openModal={modalOnDelete}
            query={DELETE_DRIVER(idSelect)}
            setDataGet={setData}
            setModalON={setModalOnDelete}
            confirmMutation={confirmMutation}
          />
        )}
        {modalOnRecovery && (
          <PopUpMutation
            openModal={modalOnRecovery}
            query={REVERSE_DRIVER(idSelect)}
            setDataGet={setData}
            setModalON={setModalOnRecovery}
            confirmMutation={confirmMutationRecovery}
          />
        )}
        {toast.state && (
          <ToastCustom
            header={toast.header}
            body={toast.body}
            stateToast={toast.state}
            type={toast.type}
            delay={toast.delay}
          />
        )}
        {modalUpdateOn && (
          <PopUpModifyDriver
            openModal={modalUpdateOn}
            setModalON={setModalUpdateOn}
            updateDriver={drivers.find((dri) => dri.id === idSelect)}
          />
        )}
      </Card>
    </>
  );
};
