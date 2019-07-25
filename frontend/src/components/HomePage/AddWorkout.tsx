import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Workout from "./Workout";
import Exercise from "./Exercise";
import AddExercises from "./AddExercises";

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
    width: 27%;
    padding: 2em 1.5%;
    margin: 2em 1.5%;
`;

const AddWorkoutButton = styled.div`
    background-color: rgb(0,150,0);
    width: fit-content;
    padding: 0.30em;
    margin: auto;
    cursor: pointer;

    color: white;
    font-weight: lighter;
    font-size: 1.5em;
    :hover {
        background-color: rgb(0,100,0);
    }
`;

type Props = {
    username: string,
}

type Exercise = {
    name: string,
    reps: string,
    title: string
}

function AddWorkout(props: Props) {
    const [titleInput, setTitleInput] = useState<string>("Title");
    const [exercises, setExercises] = useState<Exercise[]>([]);
    let updateTitle = (event: any) => {
        setTitleInput(event.target.value);
    };
    let createExercise = (exercise: Exercise) => {
        let newExercise = exercises.slice(0);
        newExercise.push(exercise);
        setExercises(newExercise);
    };

    let createWorkout = () => {
        console.log('trying to add workout');
        if (exercises.length > 1) {
            let xhr = new XMLHttpRequest();
            xhr.onload = async () => {
                console.log('create workout request loaded');
            };
            xhr.open("POST", "http://localhost:8000/addworkout");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            console.log({ title: titleInput, exercises: exercises, username: props.username });
            xhr.send({ title: titleInput, exercises: exercises, username: props.username });
        }
    }

    return (
        <WorkoutHistory>
            <WorkoutTitle value={titleInput} onChange={updateTitle} />
            {exercises.map((ele: any, i: number) => {
                return (<Exercise exercise={ele} key={i} />)
            })}
            <AddExercises addExercise={createExercise} />
            <AddWorkoutButton onClick={createWorkout}>Add Workout</AddWorkoutButton>
        </WorkoutHistory>
    );
}

export default AddWorkout;
