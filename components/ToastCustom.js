import { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, Toast, Spinner } from "react-bootstrap";

export default function ToastCustom({
  stateToast,
  header,
  body,
  type,
  delay = 5000,
  awaitView,
}) {
  const [show, setShow] = useState(stateToast);
  const [time, setTime] = useState(0);
  const handleClose = () => setShow(false);
  setTimeout(()=>{
    handleClose();
  }, 10000);
  return (
      <ToastContainer
        position="top-center"
        className="p-3 mr-3"
        style={{ zIndex: 15000 }}
      >
        <Collapse style={{ zIndex: 15003 }} in={show}>
          <Alert
            variant="filled"
            severity={type}
            style={{ zIndex: 15004 }}
            sx={{ mb: 2 }}
          >
            {!awaitView ? body : <Spinner as="span"
                animation="grow"
                size="xxl"
                role="status" variant="light" />}
          </Alert>
        </Collapse>
      </ToastContainer>
  );
}