import { useEffect, useState } from "react";
import { FaCloud } from "react-icons/fa";


import { useWeatherService } from "../../../service/weather/useWeatherService";

export const BackendIndicator = () => {
  const [sendRequest, setSendRequest] = useState(true);
  const { backendState, checkBackendStatus } = useWeatherService();

  useEffect(() => {
    checkBackendStatus();
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
        Backend: <FaCloud style={{ color }} />
      </p>
    </div>
  );
};
