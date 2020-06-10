import { motion } from "framer-motion";
import React, { useContext } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useFluentForm } from "react-fluent-form";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { loginFormConfig } from "../../form-config/LoginFormConfig";
import { AuthServiceContext } from "../../service/auth/AuthServiceContext";
import { yFlipVariatons } from "../common/variants/framerVariants";

interface LoginFormProps {
  openForgotPasswordModal: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  openForgotPasswordModal
}) => {
  const { login, loading } = useContext(AuthServiceContext);
  const { values, fields, handleSubmit, setValues } = useFluentForm(
    loginFormConfig
  );

  const handleSubmitSuccess = () => {
    login(values.email, values.password);
    setValues({ password: "" });
  };

  return (
    <motion.div
      className="container-form"
      variants={yFlipVariatons}
      initial="initial"
      animate="enter"
      key="login"
    >
      <h3 className="title">Log In</h3>
      <p className="subtitle mt-15">
        Log in to your account to see the actual weather informations.
      </p>
      <Form onSubmit={handleSubmit(handleSubmitSuccess)} className="mt-50">
        {/* <!-- Email Field --> */}
        <Form.Group>
          <Form.Control
            type="text"
            className="muli-font"
            placeholder="Enter your email address"
            {...fields.email}
          />
        </Form.Group>

        {/* <!-- Password Field --> */}
        <Form.Group>
          <Form.Control
            type="text"
            className="muli-font"
            placeholder="Enter your password"
            {...fields.password}
          />
        </Form.Group>

        {/* <!-- Forgot PW link --> */}
        <div className="flex-justify-even mt-15">
          <p
            onClick={openForgotPasswordModal}
            className="link self-align-center"
          >
            Forgot password?
          </p>

          {/* <!-- Submit button --> */}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <span>Login</span>
                <span className="ml-2">
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </>
            )}
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};
