import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import ExerciseInput from "./ExerciseInput";
import { string } from "prop-types";

const DateInputContainer = styled.div`
    display: flex;
`;

const SetDateButon = styled.div`
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
    updateDate: any;
};

function AddDate(props: Props) {
    const [dateInputs, setDateInputs] = useState<
        {
            id: string;
            value: string;
            number: boolean;
            maxInput: number;
            title: string;
        }[]
    >([
        { id: "0", value: "2019", number: true, maxInput: 4, title: "Year" },
        { id: "1", value: "08", number: true, maxInput: 2, title: "Month" },
        { id: "2", value: "22", number: true, maxInput: 2, title: "Day" }
    ]);

    let updateExercises = (event: any) => {
        let newInputs: any = dateInputs.map(ele => {
            if (ele.id === event.target.name) {
                ele.value = event.target.value;
            }
            return ele;
        });
        setDateInputs(newInputs);
    };

    let setDate = () => {};

    return (
        <>
            <DateInputContainer>
                {dateInputs.map((ele: any, i: number) => {
                    return (
                        <ExerciseInput
                            onInputUpdate={updateExercises}
                            inputValue={ele.value}
                            title={ele.title}
                            id={ele.id}
                            number={ele.number}
                            maxInput={ele.maxInput}
                            disabled={false}
                            key={i}
                        />
                    );
                })}
            </DateInputContainer>
            <SetDateButon
                onClick={() => {
                    props.updateDate([
                        { title: "Year", value: dateInputs[0].value },
                        { title: "Month", value: dateInputs[1].value },
                        { title: "Day", value: dateInputs[2].value }
                    ]);
                }}
            >
                Add Date
            </SetDateButon>
        </>
    );
}

export default AddDate;
