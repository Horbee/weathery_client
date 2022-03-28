export interface StatusResponse {
  status: Status;
}

export type Status = "UP" | "DOWN" | "PENDING";
