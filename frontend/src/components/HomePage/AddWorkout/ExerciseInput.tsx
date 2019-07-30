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

const ExerciseCollumValue = styled.input`
    font-weight: lighter;
    margin: 0;
    border: none;
    width: 100%;
    :focus {
        outline: none;
    }
`;

const FieldContainer = styled.div`
    width: 40%;
    margin: 0.5em 0;
`;

const ExerciseCollumTitle = styled.h4`
    margin: 0;
`;

type Props = {
    inputValue: string;
    onInputUpdate: any;
    title: string;
    id: string;
    number: boolean;
    maxInput: number;
    disabled: boolean;
};

function ExerciseInput(props: Props) {
    let checkInput = (event: any) => {
        let input = event.target.value;
        if (!props.disabled) {
            if (props.number) {
                if (
                    (!isNaN(input[input.length - 1]) || input.length === 0) &&
                    input.length < props.maxInput + 1
                ) {
                    props.onInputUpdate(event);
                }
            } else {
                if (input.length < props.maxInput + 1) {
                    props.onInputUpdate(event);
                }
            }
        }
    };
    if (props.disabled) {
        return (
            <FieldContainer>
                <ExerciseCollumTitle>{`${props.title}`}</ExerciseCollumTitle>
                <ExerciseCollumValue value={props.inputValue} />
            </FieldContainer>
        );
    } else {
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
}

export default ExerciseInput;
