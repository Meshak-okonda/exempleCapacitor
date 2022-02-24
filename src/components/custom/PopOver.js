import React from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import ImageModal from "./ImageModal";

export default function PopOver({ title, body, buttonPlaceHolder, image }) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h2">
        <p style={{ fontSize: 14 }}>{title}</p>
      </Popover.Header>
      {body && (
        <Popover.Body>
          <p style={{ fontSize: 11 }}>{body}</p>
          {image && image.length ? (
            <div className="d-flex">
              {image.map((img, key) => {
                return <ImageModal img={img} />;
              })}
            </div>
          ) : (
            <ImageModal img={image} />
          )}
        </Popover.Body>
      )}
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      {title === "Bonne" || buttonPlaceHolder === "Kilométrage" ? (
        <Button variant="success">
          {buttonPlaceHolder ? buttonPlaceHolder : "Voir"}
        </Button>
      ) : title === "Manque" ? (
        <Button variant="danger">
          {buttonPlaceHolder ? buttonPlaceHolder : "Voir"}
        </Button>
      ) : (
        <Button variant="warning">
          {buttonPlaceHolder ? buttonPlaceHolder : "Voir"}
        </Button>
      )}
    </OverlayTrigger>
  );
}
