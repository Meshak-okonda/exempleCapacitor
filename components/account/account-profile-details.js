import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import { UPDATE_DRIVER } from "../../graphql/queries";
import { useForm, Controller } from "react-hook-form";
import { GetAges, GetSex, getDate } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { connexionUser } from "../../redux/slice/userSlice";
import PopUpMutation from "../custom/PopUpMutation";
import ToastCustom from "../ToastCustom";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ButtonSubmit from "../ButtonSubmit";

export const AccountProfileDetails = (props) => {
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
  const [data, setData] = useState(null);
  const [modalOn, setModalOn] = useState(false);
  const [variablesMutation, setVariablesMutation] = useState({});
  const handleClose = () => setModalOn(false);
  const [toast, setToast] = useState({
    state: false,
    message: "",
    type: "",
    header: "",
    delay: null,
  });

  useEffect(async () => {
    if (data) {
      const { updateDriver } = data;
      dispatch(connexionUser(updateDriver));
      await localStorage.removeItem("user");
      await localStorage.setItem(
        "user",
        JSON.stringify({ ...updateDriver, date: getDate() })
      );
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }, [data, dispatch]);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const removeProperty = (propKey, { [propKey]: propValue, ...rest }) => rest;
  const removeProperties = (object, ...keys) =>
    keys.length
      ? removeProperties(removeProperty(keys.pop(), object), ...keys)
      : object;

  async function onSubmit(data) {
    const otherInfo = removeProperties(user, "delete", 'password', 'date', 'id', 'createdAt');
    setVariablesMutation({ ...otherInfo, ...data });
    setModalOn(true);
  }

  const confirmMutation = async (mutation) => {
    try {
      await mutation({
        variables: {
          updateDriverId: user.id,
          driver: { ...variablesMutation, image: user.image },
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
        <CardHeader subheader="Mis à jour du profil" title="Edition" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Controller
                name="name"
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
                      {errors.name && errors.name.type === "required" && (
                        <small className="alert-danger p-1">
                          Le nom est requis !
                        </small>
                      )}
                      {errors.name && errors.name.type === "maxLength" && (
                        <small className="alert-danger p-1">
                          La taille minimal n&apos;est pas respecter (20
                          caractères)
                        </small>
                      )}
                      {errors.name && errors.name.type === "minLength" && (
                        <small className="alert-danger p-1">
                          La taille minimal n&apos;est pas respecter (3
                          caractères)
                        </small>
                      )}
                      {errors.name && errors.name.type === "pattern" && (
                        <small className="alert-danger p-1">
                          Le nom ne doit contenir que des lettres
                        </small>
                      )}
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="lastName"
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
                      {errors.lastName &&
                        errors.lastName.type === "required" && (
                          <small className="alert-danger p-1">
                            Le post nom est requis !
                          </small>
                        )}
                      {errors.lastName &&
                        errors.lastName.type === "maxLength" && (
                          <small className="alert-danger p-1">
                            La taille minimal n&apos;est pas respecter (20
                            caractères)
                          </small>
                        )}
                      {errors.lastName &&
                        errors.lastName.type === "minLength" && (
                          <small className="alert-danger p-1">
                            La taille minimal n&apos;est pas respecter (3
                            caractères)
                          </small>
                        )}
                      {errors.lastName &&
                        errors.lastName.type === "pattern" && (
                          <small className="alert-danger p-1">
                            le post nom ne doit contenir que des lettres
                          </small>
                        )}
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="password"
                control={control}
                rules={{
                  maxLength: 50,
                  minLength: 8,
                }}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        fullWidth
                        label="Mot de passe"
                        variant="outlined"
                        id={field.name}
                        error={errors.name}
                        {...field}
                        type="text"
                      />
                      {errors.password &&
                        errors.password.type === "maxLength" && (
                          <small className="alert-danger p-1">
                            La taille minimal n&apos;est pas respecter (50
                            caractères)
                          </small>
                        )}
                      {errors.password &&
                        errors.password.type === "minLength" && (
                          <small className="alert-danger p-1">
                            La taille minimal n&apos;est pas respecter (8
                            caractères)
                          </small>
                        )}
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="phone"
                control={control}
                rules={{
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
                      {errors.phone && errors.phone.type === "maxLength" && (
                        <small className="alert-danger p-1">
                          La taille minimal n&apos;est pas respecter (50
                          caractères)
                        </small>
                      )}
                      {errors.phone && errors.phone.type === "minLength" && (
                        <small className="alert-danger p-1">
                          La taille minimal n&apos;est pas respecter (8
                          caractères)
                        </small>
                      )}
                      {errors.phone && errors.phone.type === "pattern" && (
                        <small className="alert-danger p-1">
                          le format du numero de telephone est invalide (0-9)
                        </small>
                      )}
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="age"
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
                          <MenuItem value={value} key={label}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.age && (
                        <small className="alert-danger p-1">
                          L&apos;age est requis !
                        </small>
                      )}
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="sex"
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
                          <MenuItem value={value} key={label}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.sex && (
                        <small className="alert-danger p-1">
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
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <ButtonSubmit autoFocus type="submit" />
        </Box>
      </Card>
      {modalOn && (
        <PopUpMutation
          query={UPDATE_DRIVER}
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
