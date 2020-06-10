import { createForm, field } from "react-fluent-form";

interface ResetPasswordForm {
  password: string;
  passwordConfirm: string;
}

export const resetPasswordFormConfig = createForm<ResetPasswordForm>()({
  password: field.password(),
  passwordConfirm: field.password()
}).withValidation({
  password: (value: string, values: ResetPasswordForm) => {
    if (value !== values.passwordConfirm) {
      return "Password should match Password Confirm";
    }
  }
});
