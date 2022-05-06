import { createForm, field } from "react-fluent-form";
import * as yup from "yup";


import { TypedStorage } from "../utils/typedStorage";

interface LoginForm {
  email: string;
  password: string;
}

export const loginFormConfig = createForm<LoginForm>()({
  email: field.email(),
  password: field.password(),
})
  .withInitialValues({
    email: TypedStorage.username,
  })
  .withValidation({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
  });
