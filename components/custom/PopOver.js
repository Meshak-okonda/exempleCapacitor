import React from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";

export default function PopOver({ title, body, buttonPlaceHolder, image }) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h2">
        <p style={{ fontSize: 14 }}>{title}</p>
      </Popover.Header>
      {body && (
        <Popover.Body>
          <p style={{ fontSize: 11 }}>{body}</p>
        </Popover.Body>
      )}
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      {title === "Bonne" || buttonPlaceHolder === "Kilométrage" ? (
        <Button style={{ backgroundColor: "#003863" }}>
          {buttonPlaceHolder ? buttonPlaceHolder : "Voir"}
        </Button>
      ) : title === "Manque" ? (
        <Button style={{ backgroundColor: "#e53935" }}>
          {buttonPlaceHolder ? buttonPlaceHolder : "Voir"}
        </Button>
      ) : (
        <Button style={{ backgroundColor: "#FB8C00" }}>
          {buttonPlaceHolder ? buttonPlaceHolder : "Voir"}
        </Button>
      )}
    </OverlayTrigger>
  );
}
