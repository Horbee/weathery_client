import "./Modal.scss";

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
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeFunction,
  modalContent,
  onExitComplete
}) => {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
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
            {modalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
