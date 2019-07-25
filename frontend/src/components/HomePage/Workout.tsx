import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Exercise from "./Exercise";

const WorkoutTitle = styled.h1`
    font-size: 1.75em;
    margin: 0;
    margin-bottom: 0.5em;
`;

const WorkoutHistory = styled.div`
    border: rgb(100, 100, 100) thin solid;
    width: 27%;
    padding: 2em 1.5%;
    margin: 2em 1.5%;
`;

type Props = {
    title: string;
    exerciseDesc: { name: string; sets: string; reps: string }[];
};

function Workout(props: Props) {
    const { title, exerciseDesc } = props;
    return (
        <WorkoutHistory>
            <WorkoutTitle>{title}</WorkoutTitle>
            {exerciseDesc.map(
                (ele: { name: string; sets: string; reps: string }, i: number) => (
                    <Exercise exercise={ele} key={i} />
                )
            )}
        </WorkoutHistory>
    );
}

export default Workout;
