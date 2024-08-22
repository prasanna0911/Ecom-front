import React from "react";
import AbotImg from "../../asset/img/about.jpg";
import "./About.css";
import { Button } from "@mui/material";

const About = () => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-5 p-5 about_container flex-wrap-reverse">
      <img src={AbotImg} width={400} className="rounded-4 img-fluid" />
      <div>
        <h3 className="mb-1">What About Us ?</h3>
        <div className="about__header__line mb-2"></div>
        <p className="paragraph">
          We are a leading e-commerce platform providing a wide range of
          products to cater to all your needs. Our mission is to deliver the
          best online shopping experience.
        </p>
        <Button variant="outlined" size="large">
          explore more
        </Button>
      </div>
    </div>
  );
};

export default About;
