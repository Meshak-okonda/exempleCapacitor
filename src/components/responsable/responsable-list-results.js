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
  Grid,
} from "@mui/material";
import { stringAvatar } from "../../utils/getStringAvatar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PopUpSeeResponsable from "./PopUpSeeResponsable";
import PopUpModifyResponsable from "./PopUpModifyResponsable";
import { Search as SearchIcon } from "../../icons/search";
import ButtonView from "../ButtonView";
import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";
import { DELETE_RESPONSABLE, REVERSE_RESPONSABLE } from "../../graphql/queries";
import { updateResponsableInState } from "../../redux/slice/globalSlice";
import PopUpMutation from "../custom/PopUpMutation";
import ToastCustom from "../ToastCustom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ButtonRecovery from "../ButtonRecovery";

export const ResponsableListResults = ({ ...rest }) => {
  const { responsables } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
  const [selectedResponsableIds, setSelectedResponsableIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [idSelect, setIdSelect] = useState("");
  const [responsableFilter, setResponsableFilter] = useState([]);
  const [filter, setFilter] = useState(null);
  const [responsableView, setResponsableView] = useState(responsables);
  const [modalSeeResponsable, setModalSeeResponsable] = useState(false);
  const [modalOnRecovery, setModalOnRecovery] = useState(false);
  const [modalUpdateOn, setModalUpdateOn] = useState(false);
  const [modalOnDelete, setModalOnDelete] = useState(false);
  const [valueView, setValueView] = useState("1");
  const [data, setData] = useState(null);
  const [toast, setToast] = useState({
    header: "",
    body: "",
    state: false,
    type: "",
    delay: 6000,
  });

  useEffect(() => {
    if (valueView === "1") {
      setResponsableView(responsables.filter((dri) => dri.delete === false));
    } else if (valueView === "2") {
      setResponsableView(responsables.filter((dri) => dri.delete != false));
    } else {
      setResponsableView(responsables);
    }
  }, [responsables]);

  useEffect(() => {
    if (data) {
      if (data.reverseDeleteResponsable) {
        setTimeout(() => {
          dispatch(updateResponsableInState(idSelect));
        }, 1000);
        if (idSelect === user.id) {
          localStorage.removeItem("user");
          navigate("/");
        }
        setValueView("1");
      }
    }
  }, [data, dispatch]);

  const handleSelectAll = (event) => {
    let newSelectedResponsableIds;

    if (event.target.checked) {
      newSelectedResponsableIds = responsables.map(
        (responsable) => responsable.id
      );
    } else {
      newSelectedResponsableIds = [];
    }

    setSelectedResponsableIds(newSelectedResponsableIds);
  };
  const handleChangeView = (event, newValueView) => {
    if (newValueView === "1") {
      setResponsableView(responsables.filter((dri) => dri.delete === false));
    } else if (newValueView === "2") {
      setResponsableView(responsables.filter((dri) => dri.delete != false));
    } else {
      setResponsableView(responsables);
    }
    setValueView(newValueView);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedResponsableIds.indexOf(id);
    let newSelectedResponsableIds = [];

    if (selectedIndex === -1) {
      newSelectedResponsableIds = newSelectedResponsableIds.concat(
        selectedResponsableIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedResponsableIds = newSelectedResponsableIds.concat(
        selectedResponsableIds.slice(1)
      );
    } else if (selectedIndex === selectedResponsableIds.length - 1) {
      newSelectedResponsableIds = newSelectedResponsableIds.concat(
        selectedResponsableIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedResponsableIds = newSelectedResponsableIds.concat(
        selectedResponsableIds.slice(0, selectedIndex),
        selectedResponsableIds.slice(selectedIndex + 1)
      );
    }

    setSelectedResponsableIds(newSelectedResponsableIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                    onChange={({ target: { value } }) => {
                      setFilter(value);
                      if (value.trim() === "") {
                        setResponsableView(responsables);
                        return 0;
                      }
                      setResponsableFilter(
                        responsables.filter((veh) => {
                          if (
                            veh.name
                              .toUpperCase()
                              .indexOf(value.toUpperCase()) > -1
                          )
                            return veh;
                        })
                      );
                      setResponsableView(
                        responsableFilter.length < 1
                          ? responsables
                          : responsableFilter
                      );
                    }}
                    placeholder="Search customer"
                    variant="outlined"
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
                  <TableCell>Email</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Numero de telephone</TableCell>
                  <TableCell>Voir</TableCell>
                  {user.upResponsable && <TableCell>Maj</TableCell>}
                  {user.upResponsable && valueView == "1" && (
                    <TableCell>Sup</TableCell>
                  )}
                  {user.delVehicle && valueView == "2" && (
                    <TableCell>Restorer</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {responsableView.slice(0, limit).map((responsable) => (
                  <TableRow
                    hover
                    key={responsable.id}
                    selected={
                      selectedResponsableIds.indexOf(responsable.id) !== -1
                    }
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {responsable.image[0] ? (
                          <Avatar src={responsable.image[0]} sx={{ mr: 2 }}>
                            {responsable.name}
                          </Avatar>
                        ) : (
                          <Avatar
                            {...stringAvatar(
                              `${responsable.name} ${responsable.lastName}`
                            )}
                          />
                        )}
                        <Typography color="textPrimary" variant="body1">
                          {`${responsable.name} ${responsable.lastName}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{responsable.email}</TableCell>
                    <TableCell>{responsable.age}</TableCell>
                    <TableCell>{responsable.sex}</TableCell>
                    <TableCell>{responsable.phone}</TableCell>
                    <TableCell>
                      <ButtonView
                        onClick={() => {
                          setIdSelect(responsable.id);
                          setModalSeeResponsable(true);
                        }}
                      />
                    </TableCell>
                    {user.upResponsable && (!responsable.superAdm || user.superAdm) && (
                      <TableCell>
                        <ButtonEdit
                          onClick={() => {
                            setIdSelect(responsable.id);
                            setModalUpdateOn(true);
                          }}
                        />
                      </TableCell>
                    )}
                    {user.delResponsable &&
                      !responsable.delete &&
                      valueView == "1" &&
                      !responsable.superAdm && (
                        <TableCell>
                          <ButtonDelete
                            onClick={() => {
                              setIdSelect(responsable.id);
                              setModalOnDelete(true);
                            }}
                          />
                        </TableCell>
                      )}
                    {user.delVehicle && responsable.delete && valueView == "2" && (
                      <TableCell>
                        <ButtonRecovery
                          onClick={() => {
                            setModalOnRecovery(true);
                            setIdSelect(responsable.id);
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
          count={responsables.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
        {modalSeeResponsable && (
          <PopUpSeeResponsable
            openModal={modalSeeResponsable}
            setModalON={setModalSeeResponsable}
            responsable={responsables.find((res) => res.id === idSelect)}
          />
        )}
        {modalUpdateOn && (
          <PopUpModifyResponsable
            openModal={modalUpdateOn}
            setModalON={setModalUpdateOn}
            responsableUpdate={responsables.find((res) => res.id === idSelect)}
          />
        )}
        {modalOnDelete && (
          <PopUpMutation
            openModal={modalOnDelete}
            query={DELETE_RESPONSABLE(idSelect)}
            setModalON={setModalOnDelete}
            confirmMutation={confirmMutation}
          />
        )}
        {modalOnRecovery && (
          <PopUpMutation
            openModal={modalOnRecovery}
            query={REVERSE_RESPONSABLE(idSelect)}
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
      </Card>
    </>
  );
};
