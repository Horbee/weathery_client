import { motion } from "framer-motion";
import { useContext } from "react";
import { useFluentForm } from "react-fluent-form";

import { resetPasswordFormConfig } from "../../form-config/ResetPasswordFormConfig";
import { AuthServiceContext } from "../../service/auth/AuthServiceContext";
import { createErrorToast } from "../../utils/toast/errorToast";
import { scaleVariation } from "../common/variants/framerVariants";

interface ResetPasswordModalContentProps {
  closeFunction: () => void;
  token: string;
}

export const ResetPasswordModalContent: React.FC<
  ResetPasswordModalContentProps
> = ({ closeFunction, token }) => {
  const {
    values,
    fields,
    handleSubmit,
    reset: resetForm,
    errors,
  } = useFluentForm(resetPasswordFormConfig);

  const { resetPassword, loading } = useContext(AuthServiceContext);

  const handleSubmitSuccess = async () => {
    if (await resetPassword(values.password, token)) {
      closeFunction();
    } else {
      resetForm();
    }
  };

  const handleSubmitFailure = () => createErrorToast(errors.password!);

  return (
    <>
      <h1 className="font-rokkit text-4xl text-lila">Reset Password</h1>
      <p className="text-gray-500">Provide new password to reset.</p>

      <form onSubmit={handleSubmit(handleSubmitSuccess, handleSubmitFailure)}>
        <div className="mt-3">
          <input
            type="password"
            className="input"
            placeholder="Enter your new password"
            {...fields.password}
          />
        </div>
        <div className="mt-3">
          <input
            type="password"
            className="input"
            placeholder="Confirm your new password"
            {...fields.passwordConfirm}
          />
        </div>
        <motion.button
          className="btn mt-3"
          type="submit"
          variants={scaleVariation}
          whileHover="hover"
          whileTap="tap"
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border text-white" role="status" />
          ) : (
            <span>Reset</span>
          )}
        </motion.button>
      </form>
    </>
  );
};
