import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import LoginBox from "./Login/LoginBox";
import NavBar from "./NavBar";
import HomePage from "./HomePage/HomePage";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    BrowserRouter
} from "react-router-dom";

const TitleContainer = styled.div`
    border-bottom: solid grey thin;
    display: flex;
    padding: 0.5em;
`;

const Title = styled.h1`
    font-size: 1.75em;
    margin: 0.5em;
    font-weight: lighter;
`;

const TitleImage = styled.img`
    width: 2em;
    margin: auto;
    margin-left: auto;
    margin-right: 1em;
`;

function Routing() {
    const [error, setError] = useState<{ state: boolean; message: string }>({
        state: false,
        message: ""
    });
    const [homeRedirect, setHomeRedirect] = useState<boolean>(false);
    const [usersState, setUsersState] = useState<{
        loggedIn: boolean;
        user: string;
    }>({ loggedIn: false, user: "" });

    const [token, setToken] = useState<string>("");

    const tryLogin = async (userName: string, password: string) => {
        console.log("login");
        let xhr = new XMLHttpRequest();
        xhr.onload = response => {
            console.log(xhr.status);
            console.log(xhr.responseType);
            if (xhr.status !== 201) {
                console.log(xhr.responseText);
                setError({ state: true, message: xhr.responseText });
            } else {
                setHomeRedirect(true);
                setUsersState({ loggedIn: true, user: userName });
                setToken(xhr.response);
            }
        };
        xhr.open("POST", "http://localhost:8000/login");
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        console.log(password);
        xhr.send(`username=${userName}&password=${password}`);
    };

    const tryRegister = (userName: string, password: string) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = response => {
            if (xhr.status === 420) {
                console.log("someone allready has that username sorry!");
            }
            console.log(response);
        };
        xhr.open("POST", "http://localhost:8000/register");
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        xhr.send(`username=${userName}&password=${password}`);
    };
    return (
        <div>
            <NavBar loggedIn={usersState.loggedIn} user={usersState.user} />
            <Redirect path="/" to="/login" />
            <Route
                path="/login"
                component={() => {
                    return (
                        <LoginBox
                            error={error}
                            tryRegister={tryRegister}
                            tryLogin={tryLogin}
                        />
                    );
                }}
            />
            <Route
                path="/home"
                component={() => {
                    return (
                        <HomePage token={token} username={usersState.user} />
                    );
                }}
            />
            {homeRedirect ? <Redirect path="/login" to="/home" /> : ""}
        </div>
    );
}

export default Routing;
