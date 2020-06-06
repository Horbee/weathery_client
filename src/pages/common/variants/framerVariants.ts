import { Variants } from "framer-motion";

export const xFlipVariatons: Variants = {
  initial: { opacity: 0, rotateX: -180 },
  enter: { opacity: [0, 1], rotateX: 1 },
  hover: { scale: 0.98, opacity: 0.7 }
};

export const yFlipVariatons: Variants = {
  initial: { opacity: 0, rotateY: -180 },
  enter: { opacity: [0, 1], rotateY: 1 },
  hover: { scale: 0.98, opacity: 0.7 }
};

export const scaleVariation: Variants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
};
