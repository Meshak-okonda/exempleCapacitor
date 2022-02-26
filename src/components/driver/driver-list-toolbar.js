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
import { useAppDispatch, useAppSelector } from "../../hooks";
import PopUpAddDriver from './PopUpAddDriver';
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";

export const DriverListToolbar = (props) => {
  const { vehicles, drivers } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);
  const [modalAddOn, setModalAddOn] = useState(false);
  const [dataExport, setDataExport] = useState([]);

  const exportColumns = [
    { title: "Nom", dataKey: "name" },
    { title: "Post Nom", dataKey: "lastName" },
    { title: "Vehicule Associé", dataKey: "vehicle" },
    { title: "Validité license", dataKey: "licenseValidity" },
    { title: "Age", dataKey: "age" },
    { title: "Sexe", dataKey: "sex" },
    { title: "E - Mail", dataKey: "email" },
    { title: "Numero Telephone", dataKey: "phone" },
  ];
  useEffect(() => {
    if (drivers.length && drivers.length > 0) {
      setDataExport(
        drivers.map(
          ({ name, lastName, age, id, sex, email, phone, licenseValidity }) => {
            let vehicle = vehicles.find(({ idDriver }) => idDriver === id);
            return {
              name,
              lastName,
              age,
              sex,
              licenseValidity: ` jusqu'en ${licenseValidity}`,
              email,
              phone,
              vehicle:
                vehicle && vehicle.name ? vehicle.name : "Aucun vehicule",
            };
          }
        )
      );
    }
  }, [drivers, vehicles]);
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
          Liste des Chauffeurs
        </Typography>
        <Box sx={{ m: 1 }}>
          <ButtonPdf
            nameFile="Liste Des Chauffeurs"
            formData={exportColumns}
            data={dataExport}
          />
          <ButtonExcel data={dataExport} nameFile="Liste Des Chauffeurs" />

          {user.addDriver && (<Button color="primary" onClick={() => setModalAddOn(true)} variant="contained">
            Creer un Chauffeur
          </Button>)}
        </Box>
      </Box>
      {modalAddOn && (
				<PopUpAddDriver openModal={modalAddOn} setModalON={setModalAddOn} />
			)}
    </Box>
  );
};
