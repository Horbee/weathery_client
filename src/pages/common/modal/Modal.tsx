import "./Modal.scss";

import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

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
  containerStyles,
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
            className={`modal-content ${containerClassName}`}
            onClick={(e) => e.stopPropagation()}
            style={containerStyles}
          >
            <div className="modal-close" onClick={closeFunction}>
              <FaTimes />
            </div>
            {modalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
