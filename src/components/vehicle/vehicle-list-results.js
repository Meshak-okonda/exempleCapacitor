import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import logo from "../../assets/logo.png";
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
import { DELETE_VEHICLE } from '../../graphql/queries';
import { stringAvatar } from "../../utils/getStringAvatar";
import { deleteVehicle } from "../../redux/slice/globalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Search as SearchIcon } from "../../icons/search";
import PopUpSeeVehicle from "./PopUpSeeVehicle";
import PopUpModifyVehicle from "./PopUpModifyVehicle";
import PopUpMutation from '../custom/PopUpMutation';
import ButtonView from "../ButtonView";
import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";
import ToastCustom from '../ToastCustom';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const VehicleListResults = ({ ...rest }) => {
  const { vehicles, drivers } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalSeeVehicle, setModalSeeVehicle] = useState(false);
  const [idSelect, setIdSelect] = useState("");
  const [modalOnDelete, setModalOnDelete] = useState(false);
  const [modalUpdateOn, setModalUpdateOn] = useState(false);
  const [vehicleFilter, setVehicleFilter] = useState([]);
	const [filter, setFilter] = useState(null);
  const [vehicleView, setVehicleView] = useState(vehicles);
  const [toast, setToast] = useState({
		header: '',
		body: '',
		state: false,
		type: '',
		delay: 6000,
  });
  const [valueView, setValueView] = useState(1);

  const handleChangeView = (event, newValueView) => {
    setValueView(newValueView);
  };

  useEffect(()=>{
    setVehicleView(vehicles);
  }, [vehicles]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = vehicles.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const viewDriver = (idDriver) => {
    const driver = drivers.find(({ id }) => id === idDriver);
    if (driver)
      return (
        <>
          {driver.image[0] ? (
            <Avatar src={driver.image[0]} sx={{ mr: 2 }}>
              {driver.name}
            </Avatar>
          ) : (
            <Avatar
              {...stringAvatar(`${driver.name} ${driver.lastName}`)}
              sx={{ mr: 2 }}
            />
          )}
          <Typography color="textPrimary" variant="body1">
            {driver.name}
          </Typography>
        </>
      );

    return "Aucun chauffeur";
  };

  const confirmMutation = async (mutation) => {
			try {
				await mutation();
				setTimeout(() => {
					dispatch(deleteVehicle(idSelect));
				}, 1000);
			} catch (error) {
        setToast({
					header: 'Erreur',
					body: `Erreur : ${error.message || ""}`,
					type: 'error',
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
                    onChange={({ target: { value } }) => {
                      setFilter(value);
                      if (value.trim() === "") {
                        setVehicleView(vehicles);
                        return 0;
                      }
                      setVehicleFilter(
                        vehicles.filter((veh) => {
                          if (
                            veh.name
                              .toUpperCase()
                              .indexOf(value.toUpperCase()) > -1
                          )
                            return veh;
                        })
                      );
                      setVehicleView(
                        vehicleFilter.length < 1 ? vehicles : vehicleFilter
                      );
                    }}
                    placeholder="Search customer"
                    variant="outlined"
                  />
                </Box>
              </Grid>
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
                  <TableCell>Nom</TableCell>
                  <TableCell>Chauffeur</TableCell>
                  <TableCell>Année de debut</TableCell>
                  <TableCell>Numero de serie</TableCell>
                  <TableCell>Puissance</TableCell>
                  <TableCell>Numero d'enreg.</TableCell>
                  <TableCell>Voir</TableCell>

                  {user.upVehicle && <TableCell>Maj</TableCell>}
                  {user.delVehicle && <TableCell>Sup</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicleView.slice(0, limit).map((vehicle) => (
                  <TableRow
                    hover
                    key={vehicle.id}
                    selected={selectedCustomerIds.indexOf(vehicle.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {vehicle.image[0] ? (
                          <Avatar src={vehicle.image[0]} sx={{ mr: 2 }}>
                            {vehicle.name}
                          </Avatar>
                        ) : (
                          <Avatar {...stringAvatar(vehicle.name)} />
                        )}
                        <Typography color="textPrimary" variant="body1">
                          {vehicle.name}
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
                        {viewDriver(vehicle.idDriver)}
                      </Box>
                    </TableCell>
                    <TableCell>{vehicle.startYear}</TableCell>
                    <TableCell>{`${vehicle.registrationNumber}`}</TableCell>
                    <TableCell>{vehicle.power}</TableCell>
                    <TableCell>{vehicle.registrationNumber}</TableCell>
                    <TableCell>
                      <ButtonView
                        onClick={(event) => {
                          setIdSelect(vehicle.id);
                          setModalSeeVehicle(true);
                        }}
                      />
                    </TableCell>
                    {user.upVehicle && (
                      <TableCell>
                        <ButtonEdit
                          onClick={() => {
                            setIdSelect(vehicle.id);
                            setModalUpdateOn(true);
                          }}
                        />
                      </TableCell>
                    )}
                    {user.delVehicle && (
                      <TableCell>
                        <ButtonDelete
                          onClick={() => {
                            setIdSelect(vehicle.id);
                            setModalOnDelete(true);
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
          count={vehicles.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
        {modalSeeVehicle && (
          <PopUpSeeVehicle
            setModalON={setModalSeeVehicle}
            openModal={modalSeeVehicle}
            vehicle={vehicles.find((veh) => veh.id === idSelect)}
          />
        )}
        {modalUpdateOn && (
          <PopUpModifyVehicle
            openModal={modalUpdateOn}
            setModalON={setModalUpdateOn}
            vehicleUpdate={vehicles.find((veh) => veh.id === idSelect)}
          />
        )}
        {modalOnDelete && (
          <PopUpMutation
            openModal={modalOnDelete}
            query={DELETE_VEHICLE(idSelect)}
            setModalON={setModalOnDelete}
            confirmMutation={confirmMutation}
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
      </Card>
    </>
  );
};