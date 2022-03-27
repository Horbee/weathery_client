import { createForm, field } from "react-fluent-form";

interface ForgotPasswordForm {
  email: string;
}

export const forgotPasswordFormConfig = createForm<ForgotPasswordForm>()({
  email: field.email(),
});
