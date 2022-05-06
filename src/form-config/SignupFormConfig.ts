import { createForm, field } from "react-fluent-form";
import * as yup from "yup";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const signupFormConfig = createForm<SignupForm>()({
  name: field.text(),
  email: field.email(),
  password: field.password(),
  passwordConfirm: field.password(),
}).withValidation({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: (value: string, values: SignupForm) => {
    if (!value) return "Password is required";
    if (value !== values.passwordConfirm) {
      return "Password should match Password Confirm";
    }
  },
});
