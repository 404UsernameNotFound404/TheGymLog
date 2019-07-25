import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Workout from "./Workout";
import AddWorkout from "./AddWorkout";

const HomePageContainer = styled.div`
    width: 75em;
    margin: auto;
`;

const QuoteContainer = styled.div`
    width: fit-content;
    max-width: 100%;
    margin: auto;
`;
const QuoteOfTheDay = styled.h1`
    font-size: 3em;
    text-align: center;
`;

const QuoteAuthor = styled.h3`
    font-size: 1.5em;
    color: grey;
    text-align: center;
`;

const WorkoutHistory = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
`;

type Props = {
    token: string;
};

function HomePage(props: Props) {
    const [workouts, setWorkouts] = useState<any>([]);
    useEffect(() => {
        apiFetch();
    }, [props]);

    let apiFetch = async () => {
        let xhr = new XMLHttpRequest();
        xhr.onload = async () => {
            try {
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                setWorkouts(data);
            } catch (error) {
                console.log(error);
                //error handle activate later
            }
            console.log(xhr.response);
        };
        xhr.open("POST", "http://localhost:8000/workouts");
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        console.log(props.token);
        xhr.send(`token=${props.token}`);
    };
    return (
        <HomePageContainer>
            <QuoteContainer>
                <QuoteOfTheDay>
                    "Your Breathtaking, and I want more text becuase I want to
                    see what it will look like."
                </QuoteOfTheDay>
                <QuoteAuthor>-Kenau Reeves</QuoteAuthor>
            </QuoteContainer>
            <AddWorkout username={(workouts.lenght > 1) ? workouts[0].username : ''} />
            <WorkoutHistory>
                {workouts.map((ele: any, i: number) => {
                    console.log(ele);
                    return (
                        <Workout
                            title={ele.title}
                            exerciseDesc={ele.exercises}
                            key={i}
                        />
                    );
                })}
            </WorkoutHistory>
        </HomePageContainer>
    );
}

export default HomePage;
