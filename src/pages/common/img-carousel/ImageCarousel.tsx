import "./ImageCarousel.scss";

import React from "react";
import { Carousel, Image } from "react-bootstrap";

import cloud from "../../../assets/images/cloud.png";
import ice from "../../../assets/images/ice.png";
import rain from "../../../assets/images/rain.png";
import sun from "../../../assets/images/sun.png";
import wind from "../../../assets/images/wind.png";

const images = [sun, cloud, rain, wind, ice];

export const ImageCarousel = () => (
  <Carousel controls={false} indicators={false}>
    {images.map((img) => (
      <Carousel.Item key={img}>
        <Image className="d-block w-100" src={img} />
      </Carousel.Item>
    ))}
  </Carousel>
);
