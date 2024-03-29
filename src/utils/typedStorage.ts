import { City } from "../api/models/CitySearchResponse";
import {
    ACCESS_TOKEN, CITYSEARCH, EXPIRES_AT, TypedStorageItem, USERNAME
} from "../constants/localstorage";
import { Nullable } from "./Nullable";

export class TypedStorage {
  public static get citySearch(): Nullable<City> {
    const cityString = localStorage.getItem(CITYSEARCH);
    return cityString ? JSON.parse(cityString) : null;
  }

  public static set citySearch(city: Nullable<City>) {
    localStorage.setItem(CITYSEARCH, JSON.stringify(city));
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

  public static get tokenExpirationDate(): Nullable<Date> {
    const dateString = localStorage.getItem(EXPIRES_AT);

    return dateString ? new Date(dateString) : null;
  }

  public static set tokenExpirationDate(date: Nullable<Date>) {
    date
      ? localStorage.setItem(EXPIRES_AT, date.toDateString())
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
  }
}
