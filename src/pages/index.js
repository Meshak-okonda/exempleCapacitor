import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const Login = () => {
  return (
    <>
      <Head>
        <title>Page connection | Fleet Management Soft</title>
      </Head>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Typography>Bienvenue</Typography>
        </Container>
      </Box>
    </>
  );
};

export default Login;
