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
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { stringAvatar } from "../../utils/getStringAvatar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Search as SearchIcon } from "../../icons/search";
import PopOver from "../custom/PopOver";
import PopUpSeeDriver from "./PopUpSeeDriver";
import ButtonView from "../ButtonView";
import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";

export const DriverListResults = ({ ...rest }) => {
  const { drivers, vehicles } = useAppSelector((state) => state.globalState);
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalSeeDriver, setModalSeeDriver] = useState(false);
  const [idSelect, setIdSelect] = useState("");
  const [driverFilter, setDriverFilter] = useState([]);
	const [filter, setFilter] = useState(null);
  const [driverView, setDriverView] = useState(drivers);

  useEffect(()=>{
    setDriverView(drivers);
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

  return (
    <>
          <Box sx={{ mt: 1, mb: 1 }}>
        <Card>
          <CardContent>
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
							if (value.trim() === '') {
								setDriverView(drivers);
								return 0;
							}
							setDriverFilter(
								drivers.filter((veh) => {
									if (veh.name.toUpperCase().indexOf(value.toUpperCase()) > -1)
										return veh;
								})
							);
              setDriverView(driverFilter.length < 1 ? drivers : driverFilter);
						}}
              />
            </Box>
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
                <TableCell>
                  Voir
                </TableCell>
                <TableCell>
                  Maj
                </TableCell>
                <TableCell>
                  Sup
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {driverView.slice(0, limit).map((driver) => (
                <TableRow
                  hover
                  key={driver.id}
                  selected={ selectedDriverIds.indexOf(driver.id) !== -1 }
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
                          {...stringAvatar(`${driver.name} ${driver.lastName}`)}
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
                  <TableCell >
                    <ButtonView onClick={ () => {
                    setIdSelect(driver.id);
                    setModalSeeDriver(true);
                  }}
                  />
                  </TableCell>
                  <TableCell >
                    <ButtonEdit onClick={()=>console.log('edit')}/>
                  </TableCell>
                  <TableCell >
                    <ButtonDelete onClick={()=>console.log('del')}/>
                  </TableCell>
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
    </Card>
    </>
  );
};
