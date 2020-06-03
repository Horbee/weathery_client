import { createForm, field } from "react-fluent-form";
import * as yup from "yup";

interface CitySearchForm {
  city: string;
}

export const citySearchFormConfig = createForm<CitySearchForm>()({
  city: field.text().validateOnChange()
}).withValidation({
  city: yup.string().required()
});
