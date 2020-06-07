import "./ImageCarousel.scss";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import cloud from "../../../assets/images/cloud.png";
import ice from "../../../assets/images/ice.png";
import rain from "../../../assets/images/rain.png";
import sun from "../../../assets/images/sun.png";
import wind from "../../../assets/images/wind.png";
import { Nullable } from "../../../utils/Nullable";
import { carouselVariants } from "../variants/framerVariants";

const images = [sun, cloud, rain, wind, ice];

export const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const intervalRef = useRef<Nullable<NodeJS.Timeout>>();

  useEffect(() => {
    const id = setInterval(
      () => setCurrentImage((prev) => (prev + 1) % images.length),
      3000
    );

    intervalRef.current = id;

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, []);

  return (
    <div className="carouse-container">
      <AnimatePresence initial={false}>
        <motion.img
          className="d-block w-100"
          key={currentImage}
          src={images[currentImage]}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 200 },
            opacity: { duration: 0.2 }
          }}
        />
      </AnimatePresence>
    </div>
  );
};
