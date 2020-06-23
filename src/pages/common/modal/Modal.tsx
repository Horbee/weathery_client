import "./Modal.scss";

import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { modalVariants } from "../variants/framerVariants";

interface ModalProps {
  isOpen: boolean;
  closeFunction: () => void;
  modalContent: React.ReactNode;
  onExitComplete?: () => void;
  containerClassName?: string;
  containerStyles?: React.CSSProperties;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeFunction,
  modalContent,
  onExitComplete,
  containerClassName,
  containerStyles
}) => {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={modalVariants}
          initial="closed"
          animate="open"
          exit="closed"
          onClick={closeFunction}
        >
          <motion.div
            className={classnames("modal-content", containerClassName)}
            onClick={(e) => e.stopPropagation()}
            style={containerStyles}
          >
            <div className="modal-close" onClick={closeFunction}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            {modalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
