import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";
import PopUpAddVehicle from './PopUpAddVehicle';

export const VehicleListToolbar = (props) => {
  const { vehicles, drivers, typesVehicles } = useAppSelector(
    (state) => state.globalState
  );
  const dispatch = useAppDispatch();
  const [modalAddVehicle, setModalAddVehicle] = useState(false);
  const [dataExport, setDataExport] = useState([]);
  const exportColumns = [
    { title: "Nom", dataKey: "name" },
    { title: "Chauffeur", dataKey: "driver" },
    { title: "Donnée GPS", dataKey: "gpsData" },
    { title: "Année de debut", dataKey: "startYear" },
    { title: "Puissance du Moteur", dataKey: "power" },
  ];
  useEffect(() => {
    if (vehicles.length && vehicles.length > 0) {
      setDataExport(
        vehicles.map(
          ({
            name,
            gpsData,
            startYear,
            color,
            power,
            idDriver,
            idTypeVehicle,
          }) => {
            const driver = drivers.find((dri) => dri.id === idDriver);
            const typeVehicle = typesVehicles.find(
              ({ id }) => idTypeVehicle === id
            );
            return {
              name,
              gpsData,
              startYear,
              color,
              power,
              driver: driver && driver.name ? driver.name : "Aucun chauffeur",
              type:
                typeVehicle && typeVehicle.name
                  ? typeVehicle.name
                  : "Aucun type atribué",
            };
          }
        )
      );
    }
  }, [vehicles, drivers, typesVehicles]);
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Liste des vehicules
        </Typography>
        <Box sx={{ m: 1 }}>
          <ButtonPdf
            nameFile="Liste Des Vehicule"
            data={dataExport}
            formData={exportColumns}
          />
          <ButtonExcel data={dataExport} nameFile="Liste Des Vehicules" />
          <Button color="primary" onClick={() => setModalAddVehicle(true)} variant="contained">
            Creer un Vehicule
          </Button>
        </Box>
      </Box>
      {modalAddVehicle && (
				<PopUpAddVehicle
					openModal={modalAddVehicle}
					setModalON={setModalAddVehicle}
				/>
			)}
    </Box>
  );
};
