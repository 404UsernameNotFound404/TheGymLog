import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { collumType } from "../../../types";

const ExerciseContainer = styled.div`
    display: flex;
`;

const ExerciseCollum = styled.h4`
    margin: 0.25em 0.5em;
`;
type Props = {
    collums: [collumType];
};

function Exercise(props: Props) {
    return (
        <ExerciseContainer>
            {props.collums.map((ele: any, i: number) => {
                return (
                    <ExerciseCollum>{`${ele.title}: ${
                        ele.value
                    }`}</ExerciseCollum>
                );
            })}
        </ExerciseContainer>
    );
}

export default Exercise;
