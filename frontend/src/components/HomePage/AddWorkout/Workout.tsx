import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Exercise from "./Exercise";
import { collumType } from "../../../types";

const WorkoutTitle = styled.h1`
    font-size: 1.75em;
    margin: 0;
`;

const WorkoutHistory = styled.div`
    border: rgb(100, 100, 100) thin solid;
    width: 27%;
    padding: 2em 1.5%;
    margin: 2em 1.5%;
`;

const TitleContainer = styled.div`
    display: flex;
    margin-bottom: 1em;
`;

const DeleteButton = styled.div`
    border: solid 0.1em red;
    color: red;
    margin-left: auto;
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
    margin: 0 1em;
    margin-top: 0.5em;
`;

type Props = {
    title: string;
    exerciseDesc: [[collumType]];
    id: string;
    deleteWorkout: any;
    date: { year: string; month: string; day: string };
};

function Workout(props: Props) {
    const { title, exerciseDesc } = props;
    // console.log(exerciseDesc[0]);
    return (
        <WorkoutHistory>
            <TitleContainer>
                <WorkoutTitle>{title}</WorkoutTitle>
                <DateText>{`${props.date.year}-${props.date.month}-${
                    props.date.day
                }`}</DateText>
                <DeleteButton
                    onClick={() => {
                        props.deleteWorkout(props.id);
                    }}
                >
                    Delete
                </DeleteButton>
            </TitleContainer>
            {exerciseDesc.map((ele: any, i: number) => {
                return <Exercise collums={ele.collums} key={i} />;
            })}
        </WorkoutHistory>
    );
}

export default Workout;
