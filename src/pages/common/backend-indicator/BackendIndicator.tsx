import { useEffect, useState } from "react";
import { FaCloud } from "react-icons/fa";


import { useStatusService } from "../../../service/status/useStatusService";

export const BackendIndicator = () => {
  const [sendRequest, setSendRequest] = useState(true);
  const { indicatorColor, checkBackendStatus } = useStatusService();

  useEffect(() => {
    checkBackendStatus();
    // eslint-disable-next-line
  }, []);

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
        Backend: <FaCloud style={{ color: indicatorColor }} />
      </p>
    </div>
  );
};
