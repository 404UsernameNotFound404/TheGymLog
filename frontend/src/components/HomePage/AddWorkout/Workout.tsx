import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Exercise from "./Exercise";
import AddExercises from "./AddExercises";
import AddDate from "./AddDate";
import { collumType, BaseURL } from "../../../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkoutTitleInput = styled.input`
    font-size: 1.75em;
    margin: 0;
    margin-bottom: 0.5em;
    border: none;
    width: 90%;
    :focus {
        outline: none;
    }
`;

const WorkoutTitle = styled.h1`
    font-size: 1.75em;
    margin: 0;
`;

const WorkoutHistory = styled.div`
    border: rgb(100, 100, 100) thin solid;
    width: 43.5%;
    padding: 2em 1.5%;
    margin: 2em 1.5%;
`;

const WorkoutInputContainer = styled.div`
    border: rgb(100, 100, 100) thin solid;
    width: 60%;
    padding: 2em 1.5%;
    margin: 2em 1.5%;
`;

const TitleContainer = styled.div`
    display: flex;
`;

const DeleteButton = styled.div`
    border: solid 0.1em red;
    color: red;
    margin: auto;
    margin-left: auto;
    margin-right: 0;
    height: fit-content;
    padding: 0.25em 0.5em;
    cursor: pointer;
    :hover {
        background-color: rgba(200, 0, 0, 0.1);
    }
`;

const DateText = styled.h4`
    font-size: 1em;
    color: grey;
    margin-top: 0.5em;
`;

const EditButton = styled.div<{ editModeLock: boolean }>`
    display: ${p => (p.editModeLock ? "none" : "block")};
    border: solid 0.1em darkgoldenrod;
    color: darkgoldenrod;
    height: fit-content;
    width: fit-content;
    padding: 0.25em 0.5em;
    margin-top: 1em;
    cursor: pointer;
    :hover {
        background-color: rgba(200, 50, 0, 0.1);
    }
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

const DateTitle = styled.h4`
    font-size: 1.25em;
    margin: 0;
    margin-bottom: 0.5em;
`;

const ExerciseContinaer = styled.div`
    margin: auto 0;
    width: fit-content;
`;

const ExerciseTextAndButton = styled.div`
    display: flex;
    margin-top: auto;
    width: 100%;
`;

const ErrorMessage = styled.h4`
    font-weight: lighter;
    color: red;
    text-align: center;
`;

type Props = {
    title: string;
    exerciseDesc: [collumType][];
    id: string;
    deleteWorkout: any;
    date: { year: string; month: string; day: string };
    editModeLock: boolean;
    numberOfWorkouts: number;
    apiFetch: any;
    token: string;
};

type Exercise = {
    collums: [collumType];
};

function Workout(props: Props) {
    const { title } = props;
    const [titleInput, setTitleInput] = useState<string>(title);
    const [exercises, setExercises] = useState<[collumType][]>(
        props.exerciseDesc
    );
    const [date, setDate] = useState<{ title: string; value: string }[]>([
        { title: "Year", value: props.date.year },
        { title: "Month", value: props.date.month },
        { title: "Day", value: props.date.day }
    ]);
    const [editMode, setEditMode] = useState<boolean>(props.editModeLock);
    const [error, setError] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>(new Date());

    let updateTitle = (event: any) => {
        setTitleInput(event.target.value);
    };

    let createExercise = (exercise: Exercise) => {
        console.log(exercise);
        if (exercises.length < 40) {
            let newExercise = exercises.slice(0);
            newExercise.push(exercise as any);
            setExercises(newExercise);
        }
    };

    let updateWorkout = () => {
        console.log(exercises.length);
        if (exercises.length > 0) {
            setEditMode(false);
            console.log("sucsseded");
            fetch(`${BaseURL}/workout`, {
                method: "PUT",
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
                    token: props.token,
                    id: props.id
                })
            }).then(res => {
                props.apiFetch();
            });
        } else {
            console.log("failed");
            setEditMode(true);
            setError("Must have at least one exercise");
        }
    };

    let createWorkout = () => {
        if (exercises.length > 0 && props.numberOfWorkouts < 100) {
            setError("");
            fetch(`${BaseURL}/workout`, {
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
            }).then(res => {
                props.apiFetch();
            });
        } else {
            let errorMessage =
                exercises.length > 0
                    ? "You can't have more then 100 workouts at once"
                    : "You must put at least one exercise.";
            setError(errorMessage);
        }
    };

    let deleteExerciseFunct = (id: number) => {
        let newArray = [];
        console.log("id");
        for (let x = 0; x < exercises.length; x++) {
            if (id !== x) {
                newArray.push(exercises[x]);
            }
        }
        setExercises(newArray);
    };

    let updateDate = (date: any) => {
        let newDate = [];
        newDate = [
            { title: "Year", value: date.getFullYear() },
            { title: "Year", value: date.getMonth() + 1 },
            { title: "Year", value: date.getDate() }
        ];
        setDate(newDate);
        setStartDate(date);
    };

    if (editMode) {
        return (
            <WorkoutInputContainer>
                <WorkoutTitleInput value={titleInput} onChange={updateTitle} />
                <ExerciseContinaer>
                    {exercises.map((ele: any, i: number) => {
                        console.log(i);
                        return (
                            <>
                                <ExerciseTextAndButton>
                                    <Exercise
                                        onChange={setExercises}
                                        collums={ele.collums}
                                        id={i}
                                        key={i}
                                    />
                                    <DeleteButton
                                        onClick={() => {
                                            deleteExerciseFunct(i);
                                        }}
                                    >
                                        Delete
                                    </DeleteButton>
                                </ExerciseTextAndButton>
                            </>
                        );
                    })}
                    <AddExercises addExercise={createExercise} />
                </ExerciseContinaer>
                <DateTitle>Date</DateTitle>
                {/* <Exercise
                    id={9999999999}
                    onChange={() => {}}
                    collums={[
                        { title: "year", value: date[0].value },
                        { title: "month", value: date[1].value },
                        { title: "day", value: date[2].value }
                    ]}
                /> */}
                {/* <AddDate updateDate={setDate} /> */}
                <DatePicker selected={startDate} onChange={updateDate} />
                <AddWorkoutButton
                    onClick={() => {
                        if (!props.editModeLock) {
                            updateWorkout();
                        } else {
                            createWorkout();
                        }
                    }}
                >
                    {!editMode ? "Update Workout" : "Add Workout"}
                </AddWorkoutButton>
                <ErrorMessage>{error}</ErrorMessage>
            </WorkoutInputContainer>
        );
    } else {
        return (
            <WorkoutHistory>
                <TitleContainer>
                    <div>
                        <WorkoutTitle>{title}</WorkoutTitle>
                        <DateText>{`${props.date.year}-${props.date.month}-${
                            props.date.day
                        }`}</DateText>
                    </div>
                    <DeleteButton
                        onClick={() => {
                            props.deleteWorkout(props.id);
                        }}
                    >
                        Delete
                    </DeleteButton>
                </TitleContainer>
                {exercises.map((ele: any, i: number) => {
                    return (
                        <Exercise
                            onChange={() => {}}
                            collums={ele.collums}
                            id={i}
                            key={i}
                        />
                    );
                })}
                <EditButton
                    editModeLock={props.editModeLock}
                    onClick={() => {
                        setEditMode(true);
                    }}
                >
                    Edit
                </EditButton>
            </WorkoutHistory>
        );
    }
}

export default Workout;
