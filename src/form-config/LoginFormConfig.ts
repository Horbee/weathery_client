import { createForm, field } from "react-fluent-form";

import { TypedStorage } from "../utils/typedStorage";

interface LoginForm {
  email: string;
  password: string;
}

export const loginFormConfig = createForm<LoginForm>()({
  email: field.email(),
  password: field.password(),
}).withInitialValues({
  email: TypedStorage.username,
});
