import { createForm, field } from "react-fluent-form";

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
  time: field.raw(new Date())
}).withValidation({
  password: (value: string, values: SignupForm) => {
    if (value !== values.passwordConfirm) {
      return "Password should match Password Confirm";
    }
  }
});
