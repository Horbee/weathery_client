import moment, { Moment } from "moment";

import {
  ACCESS_TOKEN,
  CITYSEARCH,
  EXPIRES_AT,
  TypedStorageItem,
  USERNAME
} from "../constants/localstorage";
import { Nullable } from "./Nullable";

export class TypedStorage {
  public static get citySearch(): string {
    return localStorage.getItem(CITYSEARCH) || "";
  }

  public static set citySearch(citySearch: string) {
    localStorage.setItem(CITYSEARCH, citySearch);
  }

  public static get username(): string {
    return localStorage.getItem(USERNAME) || "";
  }

  public static set username(username: string) {
    localStorage.setItem(USERNAME, username);
  }

  public static get accessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN) || "";
  }

  public static set accessToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  public static get tokenExpirationDate(): Nullable<Moment> {
    const dateString = localStorage.getItem(EXPIRES_AT);

    return dateString ? moment(dateString) : null;
  }

  public static set tokenExpirationDate(date: Nullable<Moment>) {
    date
      ? localStorage.setItem(EXPIRES_AT, moment(date).format())
      : localStorage.removeItem(EXPIRES_AT);
  }

  public static clear() {
    localStorage.clear();
  }

  public static clearItem(item: TypedStorageItem) {
    localStorage.removeItem(item);
  }

  public static clearAuth() {
    localStorage.removeItem(EXPIRES_AT);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(CITYSEARCH);
  }
}
