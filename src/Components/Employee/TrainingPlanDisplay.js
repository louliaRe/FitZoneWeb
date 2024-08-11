import React, { useEffect, useState } from "react";
import { Container, Card, Text, Badge, Group, List, Divider, Title } from "@mantine/core";
import { useAuth } from "../../AuthContext";
import { GetPlan } from "../../ApiServices/TrainingScheduleAPI";
import classes from "./TrainingPlanDisplay.module.css";

const TrainingPlanDisplay = () => {
  const { authState } = useAuth();
  const [trainingPlan, setTrainingPlan] = useState(null);
  const [losding, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      try {
        const data = await GetPlan(authState.accessToken, authState.gym_id);
        console.log("Training plan fetched successfully:", data);
        setTrainingPlan(data);
        setLoading(false);
      } catch (e) {
        console.log("error:", e);
        setLoading(false);
      }
    };
    fetchTrainingPlan();
  }, [authState.accessToken, authState.gym_id]);

 

  if (!trainingPlan) {
    return <Text>No training plan available</Text>;
  }
 
  const { training_plan_data: planData, plan_duration_weeks: duration } = trainingPlan;


  return (
    <Container className={classes.container}>
    <Title className={classes.title}>Training Plan</Title>
    <Text className={classes.textSmall}>Notes: {planData.notes}</Text>
    <Text className={classes.textSmall}>Plan Duration: {duration} weeks</Text>
    
    <Divider className={classes.divider} />

    {planData.workouts.map((workout, workoutIndex) => (
      <Card key={workoutIndex} shadow="sm" p="lg" mb="lg" className={classes.workoutCard}>
        <Group className={classes.group}>
          <Text className={classes.textLarge}>{workout.name || `Day ${workout.order}`}</Text>
          {workout.is_rest ? (
            <Badge className={`${classes.badge} ${classes.badgeRest}`}>Rest Day</Badge>
          ) : (
            <Badge className={`${classes.badge} ${classes.badgeWorkout}`}>Workout</Badge>
          )}
        </Group>
        {!workout.is_rest && (
          <>
            <Text className={classes.textMedium} mt="md">
              Cardio: {workout.has_cardio ? `Yes, ${workout.cardio_duration} mins` : "No"}
            </Text>
            <List className={classes.list} mt="md">
              {workout.exercises.map((exercise, exerciseIndex) => (
                <List.Item key={exerciseIndex} className={classes.listItem}>
                  <Text className={classes.textMedium}>
                    Exercise {exercise.order}: {exercise.exercises_details.exercise_details.name}
                  </Text>
                  <Text className={classes.textSmall}>
                    Sets: {exercise.sets}, Rest Time: {exercise.rest_time_seconds} seconds
                  </Text>
                  <Text className={classes.textSmall}>
                    Reps: {Object.entries(exercise.reps).map(([set, reps]) => `Set ${set}: ${reps}`).join(", ")}
                  </Text>
                </List.Item>
              ))}
            </List>
          </>
        )}
      </Card>
    ))}
  </Container>
);
};

export default TrainingPlanDisplay;