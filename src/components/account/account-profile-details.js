import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import { UPDATE_RESPONSABLE } from "../../graphql/queries";
import { useForm, Controller } from 'react-hook-form';
import { GetAges, GetSex, getDate } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateResponsableInState } from "../../redux/slice/globalSlice";
import PopUpMutation from "../custom/PopUpMutation";
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
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ButtonSubmit from "../ButtonSubmit";


export const AccountProfileDetails = (props) => {
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
	const [data, setData] = useState(null);
  const [modalOn, setModalOn] = useState(false);
	const [variablesMutation, setVariablesMutation] = useState({});
	const handleClose = () => setModalON(false);
	const [toast, setToast] = useState({
		state: false,
		message: '',
		type: '',
		header: '',
		delay: null,
	});

	useEffect(() => {
		if (data) {
			const { updateResponsable } = data;
			dispatch(updateResponsableInState(updateResponsable));
			localStorage.removeItem('user');
			localStorage.setItem(
        "user",
        JSON.stringify({ ...updateResponsable, date: getDate() })
      );
			setTimeout(() => {
				setModalON(false);
			}, 1000);
		}
	}, [data, dispatch]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	async function onSubmit(data) {
    const { token, createdAt, id, date, superAdm, password, ...otherInfo } = user;
	console.log({ ...otherInfo, ...data });
    setVariablesMutation({ ...otherInfo, ...data });
    setModalOn(true);
  }
	const recupNumberInString = (string) => {
		const regex = /\d+/g;
		const result = string.match(regex);
		return result[0];
	};

  const confirmMutation = async (mutation) => {
		try {
			await mutation({
				variables: {
					updateResponsableId: user.id,
					responsable: { ...variablesMutation, image: user.image },
				},
			});
		} catch (error) {
			setToast({
				state: true,
				message: JSON.stringify(error.message),
				type: "danger",
				header: "Erreur",
				delay: 3000,
			});
		}
	};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="Mis à jour du profil"
          title="Edition"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
					name='name'
					control={control}
					rules={{
						required: true,
						pattern: /^[a-zA-Z]+$/,
						maxLength: 20,
						minLength: 3,
					}}
					defaultValue={user.name}
					render={({ field }) => {
						return (
							<>
							<TextField
									fullWidth
									label="Nom *"
									variant="outlined"
									id={field.name}
									error={errors.name}
									{...field}
									value={field.value}
									type="text"
								/>
								{errors.name && errors.name.type === 'required' && (
									<small className='alert-danger p-1'>
										Le nom est requis !
									</small>
								)}
								{errors.name && errors.name.type === 'maxLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (20 caractères)
									</small>
								)}
								{errors.name && errors.name.type === 'minLength' && (
									<small className='alert-danger p-1'>
										La taille minimal n'est pas respecter (3 caractères)
									</small>
								)}
								{errors.name && errors.name.type === 'pattern' && (
									<small className='alert-danger p-1'>
										Le nom ne doit contenir que des lettres
									</small>
								)}
							</>
						);
					}}
				/>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
					name='lastName'
					control={control}
					rules={{
						required: true,
						pattern: /^[a-zA-Z]+$/,
						maxLength: 20,
						minLength: 3,
					}}
					defaultValue={user.lastName}
					render={({ field }) => {
						return (
							<>
								<TextField
									fullWidth
									label="Post nom *"
									variant="outlined"
									id={field.name}
									error={errors.name}
									{...field}
									value={field.value}
									type="text"
								/>
												{errors.lastName && errors.lastName.type === 'required' && (
					<small className='alert-danger p-1'>
						Le post nom est requis !
					</small>
				)}
				{errors.lastName && errors.lastName.type === 'maxLength' && (
					<small className='alert-danger p-1'>
						La taille minimal n'est pas respecter (20 caractères)
					</small>
				)}
				{errors.lastName && errors.lastName.type === 'minLength' && (
					<small className='alert-danger p-1'>
						La taille minimal n'est pas respecter (3 caractères)
					</small>
				)}
				{errors.lastName && errors.lastName.type === 'pattern' && (
					<small className='alert-danger p-1'>
						le post nom ne doit contenir que des lettres
					</small>
				)}
							</>
						);
					}}
				/>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
					name='email'
					control={control}
					rules={{
						maxLength: 50,
						minLength: 3,
						pattern:
							/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
					}}
					defaultValue={user.email}
					render={({ field }) => {
						return (
							<>
							<TextField
								fullWidth
								label="E - Mail *"
								variant="outlined"
								id={field.name}
								error={errors.name}
								{...field}
								value={field.value}
								type="text"
							/>
							{errors.email && errors.email.type === 'maxLength' && (
								<small className='alert-danger p-1'>
									La taille minimal n'est pas respecter (20 caractères)
								</small>
							)}
							{errors.email && errors.email.type === 'minLength' && (
								<small className='alert-danger p-1'>
									La taille minimal n'est pas respecter (3 caractères)
								</small>
							)}
							{errors.email && errors.email.type === 'pattern' && (
								<small className='alert-danger p-1'>email invalide</small>
							)}
							</>
						);
					}}
				/>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
					name='phone'
					control={control}
					rules={{
						required: true,
						maxLength: 50,
						minLength: 8,
						pattern: /^[0-9]+$/,
					}}
					defaultValue={user.phone}
					render={({ field }) => {
						return (
							<>
							<TextField
								fullWidth
								label="Numero de telephone *"
								variant="outlined"
								id={field.name}
								error={errors.name}
								{...field}
								value={field.value}
								type="text"
							/>
							{errors.phone && errors.phone.type === 'required' && (
								<small className='alert-danger p-1'>
									le mot de passe est requis !
								</small>
							)}
							{errors.phone && errors.phone.type === 'maxLength' && (
								<small className='alert-danger p-1'>
									La taille minimal n'est pas respecter (50 caractères)
								</small>
							)}
							{errors.phone && errors.phone.type === 'minLength' && (
								<small className='alert-danger p-1'>
									La taille minimal n'est pas respecter (8 caractères)
								</small>
							)}
							{errors.phone && errors.phone.type === 'pattern' && (
								<small className='alert-danger p-1'>
									le format du numero de telephone est invalide (0-9)
								</small>
							)}
							</>
						);
					}}
				/>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
					name='age'
					control={control}
					rules={{
						required: true,
					}}
					defaultValue={user.age}
					render={({ field }) => {
						return (
							<>
							<InputLabel id="demo-simple-select-standard-label">
								Age *
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={`${field.value}`}
								label="Age *"
								fullWidth
								onChange={({ target: { value } }) => {
								field.onChange(parseInt(value));
								}}
							>
								{GetAges().map(({ value, label }) => (
								<MenuItem value={value}>{label}</MenuItem>
								))}
							</Select>
							{errors.age && (
								<small className='alert-danger p-1'>L'age est requis !</small>
							)}
							</>
						);
					}}
				/>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
					name='sex'
					control={control}
					rules={{
						required: true,
					}}
					defaultValue={user.sex}
					render={({ field }) => {
						return (
							<>
							<InputLabel id="demo-simple-select-standard-label">
                Sex *
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field.value}
                label="Sexe du responsable"
				placeholder={field.value}
                fullWidth
                onChange={({ target: { value } }) => {
                  field.onChange(value);
                }}
              >
                {GetSex().map(({ value, label }) => (
                  <MenuItem value={value}>{label}</MenuItem>
                ))}
              </Select>
						  {errors.sex && (
							<small className='alert-danger p-1'>
								Le sexe est requis !
							</small>
						)}
						</>
						);
					}}
				/>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <ButtonSubmit autoFocus type="submit" />
        </Box>
      </Card>
        {modalOn && (
          <PopUpMutation
            query={UPDATE_RESPONSABLE}
            setModalON={setModalOn}
            openModal={modalOn}
            confirmMutation={confirmMutation}
            setDataGet={setData}
          />
        )}
        {toast.state && (
          <ToastCustom
            stateToast={toast.state}
            body={toast.message}
            header={toast.header}
            delay={toast.delay}
            type={toast.type}
          />
        )}
      </form>
  );
};
