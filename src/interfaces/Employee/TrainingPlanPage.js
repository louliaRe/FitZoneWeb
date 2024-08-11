import React from "react";
import { Button, Container, Image } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import classes from "./TrainingPlanPage.module.css";

const TrainingPlanPage = () => {
  const navigate = useNavigate();
  
  return (
    <Container className={classes.container}>
      <div className={classes.option} onClick={() => navigate('/EmpTrainingPlan')}>
        <div className={classes.imageContainer}>
          <Image src="/trainingPlan.jpg" alt="Add Training Plan" className={classes.image} />
          <div className={classes.overlay}>
            <Button variant="filled" color="lime" className={classes.button}>Add Training Plan</Button>
          </div>
        </div>
      </div>
      <div className={classes.option} onClick={() => navigate('/EmpTrainingPlanDisplay')}>
        <div className={classes.imageContainer}>
          <Image src="/Plan.jpg" alt="Show Training Plan" className={classes.image} />
          <div className={classes.overlay}>
            <Button variant="filled" color="lime" className={classes.button}>Show Training Plan</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TrainingPlanPage;
