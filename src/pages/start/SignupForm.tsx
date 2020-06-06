import { motion } from "framer-motion";
import React, { useContext } from "react";
import { Button, Col, Form, Spinner } from "react-bootstrap";
import { useFluentForm } from "react-fluent-form";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { signupFormConfig } from "../../form-config/SignupFormConfig";
import { AuthServiceContext } from "../../service/auth/AuthServiceContext";
import { createErrorToast } from "../../utils/toast/errorToast";
import { yFlipVariatons } from "../common/variants/framerVariants";

export const SignupForm = () => {
  const { signup, loading } = useContext(AuthServiceContext);
  const { values, fields, handleSubmit, errors } = useFluentForm(
    signupFormConfig
  );

  const handleSubmitSuccess = () =>
    signup(values.name, values.email, values.password);

  const handleSubmitFailure = () => createErrorToast(errors.password!);

  return (
    <motion.div
      className="container-form"
      variants={yFlipVariatons}
      initial="initial"
      animate="enter"
      key="signup"
    >
      <h3 className="title">Sign up</h3>
      <p className="subtitle mb-4 mt-15">
        Create a new account and be always up to date with weather informations.
      </p>
      <Form onSubmit={handleSubmit(handleSubmitSuccess, handleSubmitFailure)}>
        {/* <!-- Name Field --> */}
        <Form.Group>
          <Form.Control
            type="text"
            className="muli-font"
            placeholder="Enter your name"
            {...fields.name}
          />
        </Form.Group>

        {/* <!-- Email Field --> */}
        <Form.Group>
          <Form.Control
            type="text"
            className="muli-font"
            placeholder="Enter your email address"
            {...fields.email}
          />
        </Form.Group>

        {/* <!-- Password Fields --> */}
        <Form.Row>
          <Col>
            <Form.Control
              type="text"
              className="muli-font"
              placeholder="Enter your password"
              {...fields.password}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              className="muli-font"
              placeholder="Confirm password"
              {...fields.passwordConfirm}
            />
          </Col>
        </Form.Row>
        <div className="flex-end mt-15">
          {/* <!-- Submit button --> */}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <span>Signup</span>
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
