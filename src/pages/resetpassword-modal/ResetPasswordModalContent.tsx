import { motion } from "framer-motion";
import React, { useContext } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useFluentForm } from "react-fluent-form";

import { resetPasswordFormConfig } from "../../form-config/ResetPasswordFormConfig";
import { AuthServiceContext } from "../../service/auth/AuthServiceContext";
import { createErrorToast } from "../../utils/toast/errorToast";
import { scaleVariation } from "../common/variants/framerVariants";

interface ResetPasswordModalContentProps {
  closeFunction: () => void;
  token: string;
}

export const ResetPasswordModalContent: React.FC<ResetPasswordModalContentProps> = ({
  closeFunction,
  token
}) => {
  const { values, fields, handleSubmit, reset, errors } = useFluentForm(
    resetPasswordFormConfig
  );

  const { resetPassword, loading } = useContext(AuthServiceContext);

  const handleSubmitSuccess = async () => {
    if (await resetPassword(values.password, token)) {
      closeFunction();
    } else {
      reset();
    }
  };

  const handleSubmitFailure = () => createErrorToast(errors.password!);

  return (
    <>
      <h1 className="title modal-title">Reset Password</h1>
      <p className="subtitle modal-subtitle my-3 muted">
        Provide new password to reset.
      </p>

      <Form onSubmit={handleSubmit(handleSubmitSuccess, handleSubmitFailure)}>
        <Form.Group>
          <Form.Control
            type="password"
            className="muli-font"
            placeholder="Enter your password"
            {...fields.password}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            className="muli-font"
            placeholder="Confirm your password"
            {...fields.passwordConfirm}
          />
        </Form.Group>
        <motion.button
          className="btn btn-primary"
          type="submit"
          variants={scaleVariation}
          whileHover="hover"
          whileTap="tap"
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <span>Reset</span>
          )}
        </motion.button>
      </Form>
    </>
  );
};
