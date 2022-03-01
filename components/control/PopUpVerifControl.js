import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { GetFrenchElementControl } from "../../utils";
import PopOver from '../custom/PopOver';
import ButtonYellow from '../custom/ButtonYellow';
import { useMutation } from '@apollo/client';
import { CREATE_CONTROL_VEHICLE } from '../../graphql/queries';
import ToastCustom from "../ToastCustom";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ButtonSubmit from "../ButtonSubmit";
import {
  Grid,
} from "@mui/material";

export default function PopUpVerifControl({
	modalOn,
	setModalOn,
	dataControl,
	date,
	idVehicle,
	reset,
}) {
	const [mutation, { data, loading, error }] = useMutation(
		CREATE_CONTROL_VEHICLE
	);
	const handleClose = () => setModalOn(false);
	const styleResum = { width: 80, textAlign: 'center', borderRadius: 5 };
	let stateVehicle = {
		damaged: 0,
		good: 0,
		missing: 0,
	};
	dataControl.map((data) => {
		if (data[data.name] && data[data.name].state) {
			switch (data[data.name].state) {
				case 'Bonne':
					stateVehicle.good += 1;
					break;
				case 'Abimé':
					stateVehicle.damaged += 1;
					break;
				case 'Manque':
					stateVehicle.missing += 1;
					break;
				default:
					break;
			}
		}
	});
	if (data) {
		reset();
		setTimeout(() => {
			handleClose();
		}, 2000)
		return (
			<ToastCustom
				stateToast={true}
				body='Controle ajouté avec succès'
				header='Felicitation'
				type='success'
				delay={5000}
			/>
		);
	}
	if (error) {
		return (
			<ToastCustom
				stateToast={true}
				body="Erreur lors de l\'ajout du controle"
				header='Erreur'
				type='danger'
				delay={5000}
			/>
		);
	}

	const validateControl = () => {
		let dataFormat = {};
		dataControl.forEach((data) => {
			if (data[data.name] && data[data.name].state) {
				dataFormat[data.name] = {
					state: data[data.name].state,
				};
				data[data.name].comment
					? (dataFormat[data.name].comment = data[data.name].comment)
					: null;
				data[data.name].image
					? (dataFormat[data.name].image = data[data.name].image)
					: null;
			}
			if (data.name == 'mileage') {
				dataFormat[data.name] = data[data.name];
			}
		});
		dataFormat = {
			...dataFormat,
			stateVehicle,
			dateVerification: date,
			idVehicle,
		};
		try {
			mutation({
				variables: {
					vehicleVerification: dataFormat,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
	const formatBody = (name, body) => {
		if (name === mileage) {
			return body;
		}
	};
	return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        fullWidth={true}
        maxWidth="md"
        open={modalOn}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Resumé du controle
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid
            container
            sx={{
              pt: 3,
              pb: 3,
              display: "flex",
              justifyContent: "space-evenly",
            }}
            spacing={3}
          >
            <div
              style={styleResum}
              className="bg-success d-flex justify-content-center align-items-center bold"
            >
              Bonne <br />
              {stateVehicle.good === 0 ? "Aucun" : stateVehicle.good}
            </div>
            <div
              style={styleResum}
              className="bg-warning d-flex justify-content-center align-items-center bold"
            >
              Abimé <br />
              {stateVehicle.damaged === 0 ? "Aucun" : stateVehicle.damaged}
            </div>
            <div
              style={styleResum}
              className="bg-danger d-flex justify-content-center align-items-center p-0 center bold"
            >
              Manque <br />
              {stateVehicle.missing === 0 ? "Aucun" : stateVehicle.missing}
            </div>
          </Grid>
          <Grid container spacing={3}>
            {dataControl?.map((data, key) => {
              return (
                <Grid item lg={4} sm={12} xl={4} xs={6} key={key}>
                  <PopOver
                    buttonPlaceHolder={GetFrenchElementControl(data.name)}
                    title={
                      data[data.name]
                        ? data[data.name].state
                          ? data[data.name].state
                          : data[data.name]
                        : ""
                    }
                    body={data[data.name] ? data[data.name].comment : ""}
                    image={data[data.name] ? data[data.name].image : ""}
                  />
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <Spinner animation="border" variant="blue" />
          ) : (
            <ButtonSubmit autoFocus onClick={validateControl} />
          )}
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
