import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";

const ExercisesContainer = styled.div`
    width: 20%;
`;

const ExerciseInputContainer = styled.div`
    display: flex;
    width: 40%;
`;

const InputForExercise = styled.input`
    width: 100%;
    height: 2em;
    margin: auto 0em;
    margin-left: 0.3em;
    border: none;
    :focus {
        outline: none;
    }
`;

const InputTitle = styled.h4`
    font-size: 1em;
    margin: auto 0em;
    line-height: 2em;
    height: 2em;
`;

type Props = {
    inputValue: string;
    onInputUpdate: any;
    title: string;
    id: string;
    number: boolean;
    maxInput: number;
};

function ExerciseInput(props: Props) {
    let checkInput = (event: any) => {
        let input = event.target.value;
        if (props.number) {
            if (
                (!isNaN(input[input.length - 1]) || input.length === 0) &&
                input.length < props.maxInput + 1
            ) {
                props.onInputUpdate(event);
            }
        } else {
            props.onInputUpdate(event);
        }
    };

    return (
        <ExerciseInputContainer>
            <InputTitle>{props.title + ":"}</InputTitle>
            <InputForExercise
                name={props.id}
                value={props.inputValue}
                onChange={checkInput}
            />
        </ExerciseInputContainer>
    );
}

export default ExerciseInput;
