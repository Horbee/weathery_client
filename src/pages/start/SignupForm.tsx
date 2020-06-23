import { motion } from "framer-motion";
import React, { useContext } from "react";
import { useFluentForm } from "react-fluent-form";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { signupFormConfig } from "../../form-config/SignupFormConfig";
import { AuthServiceContext } from "../../service/auth/AuthServiceContext";
import { createErrorToast } from "../../utils/toast/errorToast";
import { yFlipVariatons } from "../common/variants/framerVariants";

export const SignupForm = () => {
  const { signup, loading } = useContext(AuthServiceContext);
  const { values, fields, handleSubmit, errors, setValues } = useFluentForm(
    signupFormConfig
  );

  const handleSubmitSuccess = () => {
    signup(values.name, values.email, values.password);
    setValues({ password: "", passwordConfirm: "" });
  };

  const handleSubmitFailure = () => createErrorToast(errors.password!);

  return (
    <motion.div
      className="container-form"
      variants={yFlipVariatons}
      initial="initial"
      animate="enter"
      key="signup"
    >
      <h3 className="font-rokkit text-deepBlue text-4xl">Sign up</h3>
      <p className="text-deepBlue">
        Create a new account and be always up to date with weather informations.
      </p>
      <form onSubmit={handleSubmit(handleSubmitSuccess, handleSubmitFailure)}>
        {/* <!-- Name Field --> */}
        <div className="mt-4">
          <input
            type="text"
            className="input"
            placeholder="Enter your name"
            {...fields.name}
          />
        </div>

        {/* <!-- Email Field --> */}
        <div className="mt-4">
          <input
            type="text"
            className="input"
            placeholder="Enter your email address"
            {...fields.email}
          />
        </div>

        {/* <!-- Password Fields --> */}
        <div className="flex flex-wrap -mx-3 mt-4">
          <div className="w-1/2 px-3">
            <input
              type="text"
              className="input"
              placeholder="Enter your password"
              {...fields.password}
            />
          </div>
          <div className="w-1/2 px-3">
            <input
              type="text"
              className="input"
              placeholder="Confirm password"
              {...fields.passwordConfirm}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {/* <!-- Submit button --> */}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? (
              <div className="spinner-border text-white" role="status" />
            ) : (
              <>
                <span>Signup</span>
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
