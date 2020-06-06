import { AnimatePresence, Variants } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { Nullable } from "../../../utils/Nullable";

interface FlipCardProps {
  frontSide: React.ReactNode;
  backSide: React.ReactNode;
}
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

export const FlipCard: React.FC<FlipCardProps> = ({ frontSide, backSide }) => {
  const [flip, setFlip] = useState(true);

  const intervalRef = useRef<Nullable<NodeJS.Timeout>>();

  useEffect(() => {
    const id = setInterval(() => setFlip((prev) => !prev), 5000);

    intervalRef.current = id;

    return () => {
      console.log("clear");
      clearInterval(intervalRef.current!);
    };
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {flip ? <>{frontSide}</> : <>{backSide}</>}
    </AnimatePresence>
  );
};
