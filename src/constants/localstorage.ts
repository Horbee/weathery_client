export const CITYSEARCH = "citysearch";
export const USERNAME = "username";
export const ACCESS_TOKEN = "access_token";
export const EXPIRES_AT = "expires_at";

export type TypedStorageItem =
  | typeof CITYSEARCH
  | typeof USERNAME
  | typeof ACCESS_TOKEN
  | typeof EXPIRES_AT;
