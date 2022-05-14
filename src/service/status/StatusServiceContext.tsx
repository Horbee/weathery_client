import { createContext, FC, useMemo, useState } from "react";


import { getBackendStatus } from "../../api/controllers/health-controller";
import { Status } from "../../api/models/StatusResponse";
import { Nullable } from "../../utils/Nullable";

type StatusServiceContextType = {
  checkBackendStatus: () => Promise<void>;
  loading: boolean;
  backendState: Status;
  indicatorColor: string;
};

export const StatusServiceContext = createContext<StatusServiceContextType>(
  undefined as any
);

export const StatusServiceProvider: FC = ({ children }) => {
  const [status, setStatus] = useState<Nullable<boolean>>(null);
  const [loading, setLoading] = useState(false);

  const checkBackendStatus = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const statusResponse = await getBackendStatus();
      if (statusResponse.status === "UP") setStatus(true);
    } catch (err) {
      setStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const backendState: Status = useMemo(
    () => (status ? "UP" : status === null ? "PENDING" : "DOWN"),
    [status]
  );

  const indicatorColor = useMemo(
    () =>
      backendState === "UP"
        ? "green"
        : backendState === "PENDING"
        ? "yellow"
        : "red",
    [backendState]
  );

  return (
    <StatusServiceContext.Provider
      value={{ checkBackendStatus, loading, backendState, indicatorColor }}
    >
      {children}
    </StatusServiceContext.Provider>
  );
};
