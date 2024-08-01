import React from "react";
import ServiceCard from "../../Components/Employee/ServiceCard";
import styles from "./TrainingPlan.module.css";

const TrainingPlan = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <ServiceCard
          image= './trainingPlan.jpg'
          text="Card 1"
          onClick={() => alert("Card 1 clicked")}
        />
        <ServiceCard
          image="https://via.placeholder.com/150"
          text="Card 2"
          onClick={() => alert("Card 2 clicked")}
        />
      </div>
    </div>
  );
};

export default TrainingPlan;
