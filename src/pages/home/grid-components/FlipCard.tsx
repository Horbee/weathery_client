import React, { useEffect, useRef, useState } from "react";

import { Nullable } from "../../../utils/Nullable";

interface FlipCardProps {
  frontSide: React.ReactNode;
  backSide: React.ReactNode;
}

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

  return flip ? <>{frontSide}</> : <>{backSide}</>;
};
