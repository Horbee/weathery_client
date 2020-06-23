import "./RoundedButton.scss";

import classnames from "classnames";
import { motion } from "framer-motion";
import React from "react";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { scaleVariation } from "../variants/framerVariants";

interface RoundedButtonProps {
  tooltipText: string;
  tooltipClassName?: string;
  onClick: () => void;
  disabled?: boolean;
  icon: IconDefinition;
}

export const RoundedButton: React.FC<RoundedButtonProps> = ({
  tooltipText,
  tooltipClassName,
  onClick,
  disabled,
  icon
}) => {
  return (
    <>
      <motion.button
        className="rounded-button tooltip"
        onClick={onClick}
        disabled={disabled}
        variants={scaleVariation}
        whileHover="hover"
        whileTap="tap"
        transition={{ duration: 0.3 }}
      >
        <FontAwesomeIcon icon={icon} />
        <div className={classnames("tooltip-text mt-5", tooltipClassName)}>
          {tooltipText}
        </div>
      </motion.button>
    </>
  );
};
