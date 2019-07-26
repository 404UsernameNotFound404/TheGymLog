import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Workout from "./Workout";
import Exercise from "./Exercise";
import AddExercises from "./AddExercises";
import AddDate from "./AddDate";
import { collumType } from "../../../types";

const WorkoutTitle = styled.input`
    font-size: 1.75em;
    margin: 0;
    margin-bottom: 0.5em;
    border: none;
    :focus {
        outline: none;
    }
`;

const WorkoutHistory = styled.div`
    border: rgb(100, 100, 100) thin solid;
    width: 40%;
    padding: 2em 1.5%;
    margin: 2em 1.5%;
`;

const AddWorkoutButton = styled.div`
    background-color: rgb(0, 150, 0);
    width: fit-content;
    padding: 0.3em;
    margin: 0 auto;
    margin-top: 2em;
    cursor: pointer;

    color: white;
    font-weight: lighter;
    font-size: 1.5em;
    :hover {
        background-color: rgb(0, 100, 0);
    }
`;

const ExerciseContinaer = styled.div`
    margin: auto;
    width: fit-content;
`;

const DateInputContainer = styled.div`
    /* display: flex; */
`;

const DateTitle = styled.h4`
    font-size: 1.25em;
`;

const DateInput = styled.input`
    font-size: 1.25em;
    margin: auto 0.25em;
    border: none;
    :focus {
        outline: none;
    }
`;
type Props = {
    username: string;
    fetchApi: any;
    token: string;
    numberOfWorkouts: number;
};

type Exercise = {
    collums: [collumType];
};

type Date = {
    date: [collumType];
};

function AddWorkout(props: Props) {
    const [titleInput, setTitleInput] = useState<string>("Title");
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [date, setDate] = useState<{ title: string; value: string }[]>([
        { title: "Year", value: "2001" },
        { title: "Month", value: "02" },
        { title: "Day", value: "21" }
    ]);

    let updateTitle = (event: any) => {
        setTitleInput(event.target.value);
    };

    let createExercise = (exercise: Exercise) => {
        let newExercise = exercises.slice(0);
        newExercise.push(exercise);
        setExercises(newExercise);
    };

    let createWorkout = () => {
        if (exercises.length > 1 && props.numberOfWorkouts < 20) {
            fetch("http://localhost:8000/workout", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: titleInput,
                    exercises: exercises,
                    date: {
                        year: date[0].value,
                        month: date[1].value,
                        day: date[2].value
                    },
                    token: props.token
                })
            })
                .then(res => {
                    console.log(res);
                    return res;
                })
                .then(res => {
                    console.log(res);
                    return res;
                })
                .then(res => {
                    props.fetchApi();
                });
        }
    };
    return (
        <WorkoutHistory>
            <WorkoutTitle value={titleInput} onChange={updateTitle} />
            <ExerciseContinaer>
                {exercises.map((ele: any, i: number) => {
                    console.log(ele.collums);
                    return <Exercise collums={ele.collums} key={i} />;
                })}
                <AddExercises addExercise={createExercise} />
            </ExerciseContinaer>
            <DateTitle>Date</DateTitle>
            <Exercise collums={date as any} />
            <AddDate updateDate={setDate} />
            <AddWorkoutButton onClick={createWorkout}>
                Add Workout
            </AddWorkoutButton>
        </WorkoutHistory>
    );
}

export default AddWorkout;
