import React, { useContext, useEffect, useState } from "react";

import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { WeatherServiceContext } from "../../../service/weather/WeatherServiceContext";

export const BackendIndicator = () => {
  const [sendRequest, setSendRequest] = useState(true);

  const {
    backendState,
    checkBackendStatus
    // createSocketConnection,
    //latency
  } = useContext(WeatherServiceContext);

  useEffect(() => {
    checkBackendStatus();
    //createSocketConnection();
    // eslint-disable-next-line
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
      <p className="font-muli server-label">
        Backend: <FontAwesomeIcon icon={faCloud} style={{ color }} />
      </p>
    </div>
  );
};
