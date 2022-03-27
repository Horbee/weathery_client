import { motion } from "framer-motion";
import { useContext } from "react";
import { useFluentForm } from "react-fluent-form";

import { forgotPasswordFormConfig } from "../../form-config/ForgotPasswordFormConfig";
import { AuthServiceContext } from "../../service/auth/AuthServiceContext";
import { scaleVariation } from "../common/variants/framerVariants";

interface ForgotPasswordModalProps {
  closeFunction: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  closeFunction,
}) => {
  const { values, fields, handleSubmit, reset } = useFluentForm(
    forgotPasswordFormConfig
  );

  const { forgotPassword, loading } = useContext(AuthServiceContext);

  const handleSubmitSuccess = async () => {
    await forgotPassword(values.email);
    reset();
    closeFunction();
  };

  return (
    <>
      <h1 className="font-rokkit text-4xl text-lila">Forgot Password</h1>
      <p className="mb-3 text-gray-500">
        Enter your E-Mail address and we will send you the instructions to reset
        your password.
      </p>

      <form onSubmit={handleSubmit(handleSubmitSuccess)}>
        <div className="mb-3">
          <input
            type="text"
            className="input"
            placeholder="Enter your email address"
            {...fields.email}
          />
        </div>
        <motion.button
          className="btn"
          type="submit"
          variants={scaleVariation}
          whileHover="hover"
          whileTap="tap"
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border text-white" role="status" />
          ) : (
            <span>Submit</span>
          )}
        </motion.button>
      </form>
    </>
  );
};
