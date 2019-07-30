import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Workout from "./AddWorkout/Workout";
import AddWorkout from "./AddWorkout/AddWorkout";
import { BaseURL } from "../../types";

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
    username: string;
};

function HomePage(props: Props) {
    const [workouts, setWorkouts] = useState<any>([]);
    useEffect(() => {
        apiFetch();
    }, [props]);

    // let whichIsBigger = (
    //     value1: number,
    //     value2: number,
    //     biggest: any,
    //     array: Array<{ date: { year: string; month: string; day: string } }>,
    //     index: number
    // ) => {
    //     if (value1 < value2) {
    //         console.log("found one");
    //         biggest = array[x];
    //         array.splice(x, 2);
    //         found = true;
    //     } else {
    //         console.log("smaller");
    //         console.log(
    //             `${parseInt(biggest.date.year)} < ${parseInt(
    //                 array[x].date.year
    //             )}`
    //         );
    //     }
    // };

    let sort = (
        length: number,
        array: Array<{ date: { year: string; month: string; day: string } }>
    ) => {
        let newArray = [];
        for (let x = 0; x < length; x++) {
            let biggest = array[0];
            let found = false;
            for (let x = 0; x < array.length; x++) {
                if (
                    parseInt(biggest.date.year) !== parseInt(array[x].date.year)
                ) {
                    if (
                        parseInt(biggest.date.year) <
                        parseInt(array[x].date.year)
                    ) {
                        console.log("found one");
                        biggest = array[x];
                        array.splice(x, 1);
                        found = true;
                    }
                } else {
                    if (
                        parseInt(biggest.date.month) !==
                        parseInt(array[x].date.month)
                    ) {
                        if (
                            parseInt(biggest.date.month) <
                            parseInt(array[x].date.month)
                        ) {
                            biggest = array[x];
                            array.splice(x, 1);
                            found = true;
                        }
                    } else {
                        if (
                            parseInt(biggest.date.day) !==
                            parseInt(array[x].date.day)
                        ) {
                            if (
                                parseInt(biggest.date.day) <
                                parseInt(array[x].date.day)
                            ) {
                                console.log("found one");
                                biggest = array[x];
                                array.splice(x, 1);
                                found = true;
                            }
                        }
                    }
                }
            }

            if (biggest !== undefined) {
                newArray.push(biggest);
            }
            if (!found) {
                array.splice(0, 1);
            }
        }
        return newArray;
    }; //clean up it's a fucking mess

    let apiFetch = async () => {
        console.log("fetchApi");
        let xhr = new XMLHttpRequest();
        xhr.onload = async () => {
            try {
                let data = JSON.parse(xhr.responseText);
                let dataLength = data.length;
                let sortedArray = sort(dataLength, data);
                console.log(data);
                console.log(sortedArray);
                setWorkouts(sortedArray);
            } catch (error) {
                console.log(error);
            }
        };
        xhr.open("POST", `${BaseURL}/workouts`);
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        xhr.send(`token=${props.token}`);
    };

    let deleteWorkout = (id: string) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = async () => {
            apiFetch();
        };
        xhr.open("DELETE", `${BaseURL}/workout`);
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        console.log(id);
        xhr.send(`token=${props.token}&id=${id}`);
    };

    return (
        <HomePageContainer>
            <QuoteContainer>
                <QuoteOfTheDay>
                    "The simple act of paying attention can take you a long
                    way."
                </QuoteOfTheDay>
                <QuoteAuthor>-Kenau Reeves</QuoteAuthor>
            </QuoteContainer>
            <Workout
                id={""}
                title={"Title"}
                exerciseDesc={[]}
                date={{ year: "2019", month: "08", day: "22" }}
                deleteWorkout={() => {}}
                editModeLock={true}
                numberOfWorkouts={workouts.length}
                apiFetch={apiFetch}
                token={props.token}
            />
            <WorkoutHistory>
                {workouts.map((ele: any, i: number) => {
                    return (
                        <Workout
                            id={ele._id}
                            title={ele.title}
                            exerciseDesc={ele.exercises}
                            date={ele.date}
                            deleteWorkout={deleteWorkout}
                            editModeLock={false}
                            token={props.token}
                            numberOfWorkouts={0}
                            apiFetch={apiFetch}
                            key={i}
                        />
                    );
                })}
            </WorkoutHistory>
        </HomePageContainer>
    );
}

export default HomePage;
