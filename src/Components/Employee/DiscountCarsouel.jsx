import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { Container, Button, Image, Modal } from "@mantine/core";

import classes from "./DiscountCarousel.module.css";
import "@mantine/carousel/styles.css";
import Layout from "../../LayoutA";

const DiscountCarousel = () => {
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  const handleStoreDiscountClick = () => {
    navigate("/EmpStoreOffers");
  };

  const handleCourseDiscountClick = () => {
    navigate("/EmpClassesOffers");
  };

  return (
    <Layout>
      <Container className={classes.carouselContainer}>
        <h1>Choose Your Discount</h1>
        <Carousel
          withIndicators
          height={500}
          slideSize="50%"
          slideGap="md"
          loop
          align="center"
          slidesToScroll={1}
        >
          <Carousel.Slide
            className={classes.carouselItem}
            onClick={handleStoreDiscountClick}
          >
            <div className={classes.imageContainer}>
              <Image src="./Dstore.jpg" className={classes.img} />
              <Button className={classes.buttonOverlay} color="lime">
                Discount on the Store{" "}
              </Button>
            </div>
          </Carousel.Slide>
          <Carousel.Slide
            className={classes.carouselItem}
            onClick={handleCourseDiscountClick}
          >
            <div className={classes.imageContainer}>
              <Image src="./Dgym.jpg" className={classes.img} />
              <Button className={classes.buttonOverlay} color="lime">
                Discount on Courses
              </Button>
            </div>
          </Carousel.Slide>
          <Carousel.Slide
            className={classes.carouselItem}
            onClick={() => setOpened(true)}
          >
            <div className={classes.imageContainer}>
              <Image src="./registrationOf.jpg" className={classes.img} />
              <Button
                className={classes.buttonOverlay}
                color="lime"
                onClick={() => navigate("/EmpRegistrationDiscount")}
              >
                Rejistration Offer
              </Button>
            </div>
          </Carousel.Slide>
        </Carousel>
      </Container>
    </Layout>
  );
};

export default DiscountCarousel;
