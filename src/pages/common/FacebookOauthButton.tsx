import React from "react";
import { Button } from "react-bootstrap";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FacebookOauthButton = () => (
  <Button className="btn-wide" variant="primary" size="lg">
    <span className="mr-2">
      <FontAwesomeIcon icon={faFacebook} />
    </span>
    <span>Facebook</span>
  </Button>
);
