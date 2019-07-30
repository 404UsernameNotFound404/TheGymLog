import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { collumType } from "../../../types";

const ExerciseContainer = styled.div`
    display: flex;
    width: 100%;
`;

const ExerciseCollumTitle = styled.h4`
    margin: 0;
`;

const ExerciseCollumValue = styled.h4`
    font-weight: lighter;
    width: 100%;
    margin: 0;
`;

const FieldContainer = styled.div`
    width: 100%;
    margin: 0.5em 0;
`;
type Props = {
    collums: collumType[];
    onChange: any; //function to update text if in edit mode
    id: number;
};

function Exercise(props: Props) {
    return (
        <ExerciseContainer>
            {props.collums.map((ele: any, i: number) => {
                return (
                    <>
                        <FieldContainer>
                            <ExerciseCollumTitle>{`${
                                ele.title
                            }`}</ExerciseCollumTitle>
                            <ExerciseCollumValue>
                                {ele.value}
                            </ExerciseCollumValue>
                        </FieldContainer>
                    </>
                );
            })}
        </ExerciseContainer>
    );
}

export default Exercise;
