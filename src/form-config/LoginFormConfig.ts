import { createForm, field } from "react-fluent-form";

interface LoginForm {
  email: string;
  password: string;
}

export const loginFormConfig = createForm<LoginForm>()({
  email: field.email(),
  password: field.password()
});
