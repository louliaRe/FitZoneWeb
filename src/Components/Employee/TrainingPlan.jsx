import React, { useState, useEffect } from "react";
import {
  TextInput,
  NumberInput,
  Checkbox,
  Select,
  Container,
  Button,
  Group,
} from "@mantine/core";
import { useAuth } from "../../AuthContext";
import classes from "./TrainingPlan.module.css";
import {
  CreatePlan,
  getPlan,
  getExerciseseq,
} from "../../ApiServices/TrainingScheduleAPI";
import moment from "moment";
import Layout from "../../LayoutA";

const TrainingPlan = () => {
  const { authState } = useAuth();
  const [note, setNote] = useState("");
  const [planDurationWeeks, setPlanDurationWeeks] = useState(1);
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExerciseseq(
          authState.accessToken,
          authState.branch_id
        );
        const exercises = data.flatMap((res) =>
          res.equipments.flatMap((equipment) =>
            equipment.equipment_details.exercise.map((ex) => ({
              label: ex.exercise_details.name,
              value: ex.exercise_details.exercise_id.toString(),
            }))
          )
        );

        // Set the exercises in state or use them as needed
        setExercises(exercises);

        console.log("Extracted exercises:", exercises);
      } catch (e) {
        console.log("error:", e);
      }
    };
    fetchExercises();
  }, [authState.accessToken]);

  const handleAddWorkout = () => {
    setWorkouts([
      ...workouts,
      {
        name: "",
        order: workouts.length + 1,
        is_rest: false,
        has_cardio: false,
        cardio_duration: null,
        exercises: [],
      },
    ]);
  };

  const handleWorkoutChange = (index, field, value) => {
    const newWorkouts = [...workouts];
    newWorkouts[index][field] = value;
    setWorkouts(newWorkouts);
  };

  const handleAddExercise = (workoutIndex) => {
    const newWorkouts = [...workouts];
    newWorkouts[workoutIndex].exercises.push({
      exercise: "",
      sets: 1,
      reps: {},
      rest_time_seconds: 0,
      order: newWorkouts[workoutIndex].exercises.length + 1,
    });
    setWorkouts(newWorkouts);
  };

  const handleExerciseChange = (workoutIndex, exerciseIndex, field, value) => {
    const newWorkouts = [...workouts];
    newWorkouts[workoutIndex].exercises[exerciseIndex][field] = value;
    setWorkouts(newWorkouts);
  };

  const handleRepsChange = (workoutIndex, exerciseIndex, setIndex, value) => {
    const newWorkouts = [...workouts];
    if (!newWorkouts[workoutIndex].exercises[exerciseIndex].reps) {
      newWorkouts[workoutIndex].exercises[exerciseIndex].reps = {};
    }
    newWorkouts[workoutIndex].exercises[exerciseIndex].reps[setIndex] = value;
    setWorkouts(newWorkouts);
  };

  const handleAddTrainingPlan = async () => {
    try {
      let formErrors = {};

      if (!note) {
        formErrors.note = "Note is required";
      }

      if (planDurationWeeks <= 0) {
        formErrors.planDurationWeeks = "Plan duration must be greater than 0";
      }

      workouts.forEach((workout, workoutIndex) => {
        if (!workout.is_rest && !workout.name) {
          formErrors[`workoutName_${workoutIndex}`] =
            "Workout name is required";
        }
        if (workout.has_cardio && workout.cardio_duration <= 0) {
          formErrors[`cardioDuration_${workoutIndex}`] =
            "Cardio duration must be greater than 0";
        }
        workout.exercises.forEach((exercise, exerciseIndex) => {
          if (!exercise.exercise) {
            formErrors[`exercise_${workoutIndex}_${exerciseIndex}`] =
              "Exercise is required";
          }
          if (exercise.sets <= 0) {
            formErrors[`sets_${workoutIndex}_${exerciseIndex}`] =
              "Sets must be greater than 0";
          }
          if (exercise.rest_time_seconds < 0) {
            formErrors[`restTime_${workoutIndex}_${exerciseIndex}`] =
              "Rest time cannot be negative";
          }
        });
      });

      setErrors(formErrors);

      if (Object.keys(formErrors).length === 0) {
        const data = {
          notes: note,
          plan_duration_weeks: planDurationWeeks,
          workouts: workouts.map((workout) => ({
            name: workout.name,
            order: workout.order,
            is_rest: workout.is_rest,
            has_cardio: workout.has_cardio,
            cardio_duration: workout.cardio_duration,
            exercises: workout.exercises.map((ex) => ({
              exercise: ex.exercise,
              sets: ex.sets,
              reps: ex.reps,
              rest_time_seconds: ex.rest_time_seconds,
              order: ex.order,
            })),
          })),
        };
        console.log("send:", JSON.stringify(data));

        const createPlan = await CreatePlan(
          authState.accessToken,
          authState.gym_id,
          data
        );
        console.log("res", createPlan);
        alert("res", createPlan.message);
        console.log("send:", data);
      }
    } catch (e) {
      console.log("error", e);
      alert(e);
    }
  };

  return (
    <Layout>
      <Container mt={100} className={classes.con}>
        <h1>Create Training Plan</h1>
        <TextInput
          label="Note"
          value={note}
          onChange={(event) => setNote(event.currentTarget.value)}
          className={classes.fields}
          required
          error={errors.note}
        />
        <NumberInput
          label="Plan Duration (weeks)"
          value={planDurationWeeks}
          onChange={setPlanDurationWeeks}
          required
          className={classes.fields}
          min={1}
          error={errors.planDurationWeeks}
        />
        <Button color="lime" className={classes.btn} onClick={handleAddWorkout}>
          Add Workout
        </Button>
        {workouts.map((workout, workoutIndex) => (
          <div key={workoutIndex} className={classes.workout}>
            <TextInput
              label={`Workout Name (Day ${workout.order})`}
              value={workout.name}
              onChange={(event) =>
                handleWorkoutChange(
                  workoutIndex,
                  "name",
                  event.currentTarget.value
                )
              }
              required={!workout.is_rest}
              error={errors[`workoutName_${workoutIndex}`]}
              disabled={workout.is_rest}
            />
            <Checkbox
              label="Is Rest Day?"
              checked={workout.is_rest}
              onChange={(event) =>
                handleWorkoutChange(
                  workoutIndex,
                  "is_rest",
                  event.currentTarget.checked
                )
              }
            />
            {!workout.is_rest && (
              <>
                <Checkbox
                  label="Has Cardio?"
                  checked={workout.has_cardio}
                  onChange={(event) =>
                    handleWorkoutChange(
                      workoutIndex,
                      "has_cardio",
                      event.currentTarget.checked
                    )
                  }
                />
                {workout.has_cardio && (
                  <NumberInput
                    label="Cardio Duration (minutes)"
                    value={workout.cardio_duration}
                    onChange={(value) =>
                      handleWorkoutChange(
                        workoutIndex,
                        "cardio_duration",
                        value
                      )
                    }
                    required
                    min={1}
                    error={errors[`cardioDuration_${workoutIndex}`]}
                  />
                )}
                <Button
                  color="lime"
                  onClick={() => handleAddExercise(workoutIndex)}
                >
                  Add Exercise
                </Button>
                {workout.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className={classes.exercise}>
                    <Select
                      label="Exercise"
                      data={exercises}
                      value={exercise.exercise}
                      onChange={(value) =>
                        handleExerciseChange(
                          workoutIndex,
                          exerciseIndex,
                          "exercise",
                          Number(value)
                        )
                      }
                      required
                      error={
                        errors[`exercise_${workoutIndex}_${exerciseIndex}`]
                      }
                    />
                    <NumberInput
                      label="Sets"
                      value={exercise.sets}
                      onChange={(value) =>
                        handleExerciseChange(
                          workoutIndex,
                          exerciseIndex,
                          "sets",
                          value
                        )
                      }
                      required
                      min={1}
                      error={errors[`sets_${workoutIndex}_${exerciseIndex}`]}
                    />
                    {Array.from({ length: exercise.sets }).map(
                      (_, setIndex) => (
                        <NumberInput
                          key={setIndex}
                          label={`Reps for Set ${setIndex + 1}`}
                          value={exercise.reps[setIndex + 1] || 0}
                          onChange={(value) =>
                            handleRepsChange(
                              workoutIndex,
                              exerciseIndex,
                              setIndex + 1,
                              value
                            )
                          }
                          required
                        />
                      )
                    )}
                    <NumberInput
                      label="Rest Time (seconds)"
                      value={exercise.rest_time_seconds}
                      onChange={(value) =>
                        handleExerciseChange(
                          workoutIndex,
                          exerciseIndex,
                          "rest_time_seconds",
                          value
                        )
                      }
                      required
                      min={0}
                      error={
                        errors[`restTime_${workoutIndex}_${exerciseIndex}`]
                      }
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
        <Button
          color="lime"
          className={classes.btn}
          onClick={handleAddTrainingPlan}
        >
          Submit Plan
        </Button>
      </Container>
    </Layout>
  );
};

export default TrainingPlan;
