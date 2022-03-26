import './RoundedButton.scss'

import { motion } from 'framer-motion'
import { ReactElement } from 'react'

import { scaleVariation } from '../variants/framerVariants'

interface RoundedButtonProps {
  tooltipText: string;
  tooltipClassName?: string;
  onClick: () => void;
  disabled?: boolean;
  icon: ReactElement;
}

export const RoundedButton: React.FC<RoundedButtonProps> = ({
  tooltipText,
  tooltipClassName,
  onClick,
  disabled,
  icon,
}) => {
  return (
    <motion.button
      className="rounded-button tooltip"
      onClick={onClick}
      disabled={disabled}
      variants={scaleVariation}
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.3 }}
    >
      {icon}
      <div className={`tooltip-text mt-5 ${tooltipClassName}`}>
        {tooltipText}
      </div>
    </motion.button>
  );
};
