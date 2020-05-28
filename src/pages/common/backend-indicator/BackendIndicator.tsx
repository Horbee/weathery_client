import "./BackendIndicator.scss";

import React, { useContext, useEffect, useState } from "react";

import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { WeatherServiceContext } from "../../../service/WeatherServiceContext";

export const BackendIndicator = () => {
  const [sendRequest, setSendRequest] = useState(true);

  const { backendState, checkBackendStatus } = useContext(
    WeatherServiceContext
  );

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const color =
    backendState === "UP"
      ? "green"
      : backendState === "PENDING"
      ? "yellow"
      : "red";

  const handleClick = () => {
    if (sendRequest) {
      checkBackendStatus();
      setSendRequest(false);
      setTimeout(() => setSendRequest(true), 10000);
    }
  };

  return (
    <div className="indicator-container" onClick={handleClick}>
      <p className="server-label muli-font">
        Backend: <FontAwesomeIcon icon={faCloud} style={{ color }} />
      </p>
    </div>
  );
};
