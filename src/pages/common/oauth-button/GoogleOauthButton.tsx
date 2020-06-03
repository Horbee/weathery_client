import React from "react";
import { Button } from "react-bootstrap";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GoogleOauthButton = () => (
  <Button className="btn-wide" variant="danger" size="lg">
    <span className="mr-2">
      <FontAwesomeIcon icon={faGoogle} />
    </span>
    <span>Google</span>
  </Button>
);
