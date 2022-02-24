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
import { stringAvatar } from "../../utils/getStringAvatar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PopUpSeeResponsable from "./PopUpSeeResponsable";
import { Search as SearchIcon } from "../../icons/search";
import ButtonView from "../ButtonView";
import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";

export const ResponsableListResults = ({ ...rest }) => {
  const { responsables } = useAppSelector((state) => state.globalState);
  const [selectedResponsableIds, setSelectedResponsableIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalSeeResponsable, setModalSeeResponsable] = useState(false);
  const [idSelect, setIdSelect] = useState("");
  const [responsableFilter, setResponsableFilter] = useState([]);
	const [filter, setFilter] = useState(null);
  const [responsableView, setResponsableView] = useState(responsables);

  useEffect(()=>{
    setResponsableView(responsables);
  }, [responsables])

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
                onChange={({ target: { value } }) => {
							setFilter(value);
							if (value.trim() === '') {
								setResponsableView(responsables);
								return 0;
							}
							setResponsableFilter(
								responsables.filter((veh) => {
									if (veh.name.toUpperCase().indexOf(value.toUpperCase()) > -1)
										return veh;
								})
							);
              setResponsableView(responsableFilter.length < 1 ? responsables : responsableFilter);
						}}
                placeholder="Search customer"
                variant="outlined"
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
                <TableCell>Email</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Sex</TableCell>
                <TableCell>Numero de telephone</TableCell>
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
                   <TableCell >
                    <ButtonView onClick={()=>{
                    setIdSelect(responsable.id);
                    setModalSeeResponsable(true);
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
        count={responsables.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      {modalSeeResponsable &&(
        <PopUpSeeResponsable
          openModal={modalSeeResponsable}
          setModalON={setModalSeeResponsable}
          responsable={responsables.find((res) => res.id === idSelect)}
        />
      )}
    </Card>
    </>
  );
};
