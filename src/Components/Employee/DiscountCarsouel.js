// src/Components/DiscountCarousel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import { Container, Button, Image } from '@mantine/core';

import classes from './DiscountCarousel.module.css'; // Import your custom CSS for styling
import '@mantine/carousel/styles.css';

const DiscountCarousel = () => {
  const navigate = useNavigate();

  const handleStoreDiscountClick = () => {
    navigate('/EmpDiscount');
  };

  const handleCourseDiscountClick = () => {
    navigate('/Empcourses-discount');
  };

  return (
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
      <Carousel.Slide className={classes.carouselItem} onClick={handleStoreDiscountClick}>
        <div className={classes.imageContainer}>
          <Image src="./Dstore.jpg" className={classes.img} />
          <Button className={classes.buttonOverlay} color="lime">Discount on the Store</Button>
        </div>
      </Carousel.Slide>
      <Carousel.Slide className={classes.carouselItem} onClick={handleCourseDiscountClick}>
        <div className={classes.imageContainer}>
          <Image src="./Dgym.jpg" className={classes.img} />
          <Button className={classes.buttonOverlay} color="lime">Discount on Courses</Button>
        </div>
      </Carousel.Slide>
    </Carousel>
  </Container>
);
};



export default DiscountCarousel;