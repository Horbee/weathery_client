import { addField } from "react-fluent-form";

import { Nullable } from "../../utils/Nullable";
import { ReactSingleSelect } from "./ReactSingleSelect";

declare module "react-fluent-form" {
  interface FieldCreator {
    singleSelect: <T>(initialValue?: Nullable<T>) => ReactSingleSelect<T>;
  }
}

addField(
  "singleSelect",
  <T>(initialValue: Nullable<T> = null) =>
    new ReactSingleSelect<T>(initialValue)
);
