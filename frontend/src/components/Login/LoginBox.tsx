import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 25%;
    margin: 3em auto;
    padding: 2em;
    -webkit-box-shadow: 5px 5px 15px 5px rgba(176, 176, 176, 0.81);
    box-shadow: 5px 5px 15px 5px rgba(176, 176, 176, 0.81);
`;

const LoginTitle = styled.h1`
    font-size: 2em;
    font-weight: lighter;
    margin: 0;
    margin-bottom: 0.5em;
`;

const InputLabel = styled.h4`
    font-size: 1em;
    color: black;
    margin: 0.15em;
`;

const LoginInput = styled.input`
    font-size: 1.5em;
    font-weight: 100;
    color: rgb(150, 150, 150);

    width: 100%;
    border: none;
    background-color: rgb(240, 240, 240);
    margin-bottom: 1em;
    padding: 0.2em;
    :focus {
        outline: none;
    }
`;

const LoginButton = styled.div`
    cursor: pointer;
    border-radius: 0.5em;
    background-color: black;
    width: 100%;
    height: 2em;
    margin: 0.5em auto;
    /* Text setting below */
    text-align: center;
    line-height: 2em;
    font-size: 1.5em;
    color: white;
    :hover {
        background-color: rgb(50, 50, 50);
    }
`;

const ErrorText = styled.h3`
    color: red;
    font-size: 0.75em;
`;

const ReEnterPassword = styled.div<RegisterCheck>`
    display: ${p => (p.register ? "" : "none")};
`;

const SwitchRegisterLogin = styled.h3`
    font-weight: lighter;
    font-size: 1em;
    margin: 0;
    margin-top: -0.5em;
    color: blue;
    :hover {
        text-decoration: underline;
    }
    cursor: pointer;
`;

type RegisterCheck = {
    register: boolean;
};

type Props = {
    tryLogin: any;
    tryRegister: any;
    error: { state: boolean; message: string };
};

function LoginBox(props: Props) {
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [error, setError] = useState<{ state: boolean; message: string }>(
        props.error
    );
    useEffect(() => {
        console.log("use effect");
        setError(props.error);
    }, [props]);
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [repasswordInput, setRePasswordInput] = useState<string>("");
    const [register, setRegister] = useState<boolean>(false);

    const updateusernameInput = (event: any) => {
        setUsernameInput(event.target.value);
    };
    const updatePasswordInput = (event: any) => {
        setPasswordInput(event.target.value);
    };

    const updateRePasswordInput = (event: any) => {
        setRePasswordInput(event.target.value);
    };

    const tryAction = () => {
        let error = false;

        if (register) {
            if (usernameInput.length < 4 || usernameInput.length > 20) {
                error = true;
                setError({
                    state: true,
                    message: "The Username Must be between 1 and 20 characters"
                });
            }
            if (passwordInput.length < 4 || passwordInput.length > 20) {
                error = true;
                setError({
                    state: true,
                    message: "The Password Must be between 1 and 20 characters"
                });
            }
            if (!error) {
                if (passwordInput === repasswordInput) {
                    setRegister(false);
                    props.tryRegister(usernameInput, passwordInput);
                } else {
                    setError({
                        state: true,
                        message: "The passwords must match"
                    });
                }
            }
        } else {
            props.tryLogin(usernameInput, passwordInput);
        }
        setPasswordInput("");
        setRePasswordInput("");
    };

    const clearError = () => {
        setError({ state: false, message: "" });
    };

    const switchRegisterLogin = () => {
        if (register) {
            setRegister(false);
        } else {
            setRegister(true);
        }
    };

    return (
        <Container>
            <LoginTitle>{register ? "Register" : "Login"}</LoginTitle>
            <ErrorText>{!error.state ? "" : error.message}</ErrorText>
            <InputLabel>Username</InputLabel>
            <LoginInput
                onFocus={clearError}
                value={usernameInput}
                onChange={updateusernameInput}
                type="text"
            />
            <InputLabel>Password</InputLabel>
            <LoginInput
                onFocus={clearError}
                value={passwordInput}
                onChange={updatePasswordInput}
                type="password"
            />
            <ReEnterPassword register={register}>
                <InputLabel>Re-enter Password</InputLabel>
                <LoginInput
                    onFocus={clearError}
                    value={repasswordInput}
                    onChange={updateRePasswordInput}
                    type="password"
                />
            </ReEnterPassword>
            <SwitchRegisterLogin onClick={switchRegisterLogin}>
                {register ? "Click Here To Login" : "Click Here To Register"}
            </SwitchRegisterLogin>
            <LoginButton onClick={tryAction}>
                {register ? "Register" : "Login"}
            </LoginButton>
        </Container>
    );
}

export default LoginBox;
