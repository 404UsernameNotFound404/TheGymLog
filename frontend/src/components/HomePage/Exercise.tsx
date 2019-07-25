import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";

const ExerciseContainer = styled.div`
    display: flex;
`;

const ExerciseCollum = styled.h4`
    margin: 0.25em 0.5em;
`;
type Props = {
    exercise: { name: string; sets: string; reps: string };
};

function Exercise(props: Props) {
    const { exercise } = props;
    return (
        <ExerciseContainer>
            <ExerciseCollum>{`Name: ${exercise.name}`}</ExerciseCollum>
            <ExerciseCollum>{`Sets: ${exercise.sets}`}</ExerciseCollum>
            <ExerciseCollum>{`Reps: ${exercise.reps}`}</ExerciseCollum>
        </ExerciseContainer>
    );
}

export default Exercise;
