import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import ExerciseInput from "./ExerciseInput";

const ExercisesContainer = styled.div`
    width: 100%;
`;

const InputsContainer = styled.div`
    width: 100%;
    height: 2em;
    display: flex;
`;

const AddExercise = styled.h4`
    border: green solid 0.1em;
    width: fit-content;
    padding: 0.3em;
    cursor: pointer;
    margin-top: 0.5em;
    margin-bottom: 1.5em;
    color: green;
    font-weight: lighter;
    :hover {
        border-width: 0.2em;
        padding: 0.2em;
    }
`;

type Props = {
    addExercise: any;
};

function AddExercises(props: Props) {
    const [Inputs, setInputs] = useState<
        {
            id: string;
            value: string;
            name: string;
            number: boolean;
            maxInput: number;
        }[]
    >([
        { id: "0", value: "", name: "Name", number: false, maxInput: 8 },
        { id: "1", value: "", name: "Reps", number: true, maxInput: 8 },
        { id: "2", value: "", name: "sets", number: true, maxInput: 8 }
    ]);
    let updateExercises = (event: any) => {
        let newInputs: any = Inputs.map(ele => {
            if (ele.id === event.target.name) {
                ele.value = event.target.value;
            }
            return ele;
        });
        setInputs(newInputs);
    };

    let createExercise = () => {
        let validInput = true;
        Inputs.forEach(ele => {
            if (ele.value.length < 1) {
                validInput = false;
            }
        });
        if (validInput) {
            props.addExercise({
                collums: [
                    { title: "name", value: Inputs[0].value },
                    { title: "reps", value: Inputs[1].value },
                    { title: "sets", value: Inputs[2].value }
                ]
            });
        }
    };

    return (
        <ExercisesContainer>
            <InputsContainer>
                {Inputs.map((ele: any, i: number) => {
                    return (
                        <ExerciseInput
                            id={ele.id}
                            inputValue={ele.value}
                            onInputUpdate={updateExercises}
                            title={ele.name}
                            number={ele.number}
                            maxInput={ele.maxInput}
                            key={i}
                        />
                    );
                })}
            </InputsContainer>
            <AddExercise onClick={createExercise}>Add Exercise</AddExercise>
        </ExercisesContainer>
    );
}

export default AddExercises;
