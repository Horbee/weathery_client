import "./Modal.scss";

import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useFluentForm } from "react-fluent-form";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { forgotPasswordFormConfig } from "../../../form-config/ForgotPasswordFormConfig";
import { AuthServiceContext } from "../../../service/auth/AuthServiceContext";
import { modalVariants, scaleVariation } from "../variants/framerVariants";

interface ModalProps {
  isOpen: boolean;
  closeFunction: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, closeFunction }) => {
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop flex-center"
          variants={modalVariants}
          initial="closed"
          animate="open"
          exit="closed"
          onClick={closeFunction}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-close" onClick={closeFunction}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <h1 className="title modal-title">Forgot Password</h1>
            <p className="subtitle modal-subtitle my-3 muted">
              Enter your E-Mail address and we will send you the instructions to
              reset your password.
            </p>

            <Form onSubmit={handleSubmit(handleSubmitSuccess)}>
              <Form.Group>
                <Form.Control
                  type="text"
                  className="muli-font"
                  placeholder="Enter your email address"
                  {...fields.email}
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
                  <span>Submit</span>
                )}
              </motion.button>
            </Form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
