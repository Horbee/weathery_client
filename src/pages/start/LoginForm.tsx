import { motion } from "framer-motion";
import React, { useContext } from "react";
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
      <h3 className="font-rokkit text-deepBlue text-4xl">Log In</h3>
      <p className="text-deepBlue">
        Log in to your account to see the actual weather informations.
      </p>
      <form onSubmit={handleSubmit(handleSubmitSuccess)} className="mt-16">
        {/* <!-- Email Field --> */}
        <div className="mt-4">
          <input
            type="text"
            className="input"
            placeholder="Enter your email address"
            {...fields.email}
          />
        </div>

        {/* <!-- Password Field --> */}
        <div className="mt-4">
          <input
            type="text"
            className="input"
            placeholder="Enter your password"
            {...fields.password}
          />
        </div>

        {/* <!-- Forgot PW link --> */}
        <div className="mt-5 flex justify-between items-center">
          <p onClick={openForgotPasswordModal} className="link">
            Forgot password?
          </p>

          {/* <!-- Submit button --> */}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? (
              <div className="spinner-border text-white" role="status" />
            ) : (
              <>
                <span>Login</span>
                <span className="ml-2">
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
