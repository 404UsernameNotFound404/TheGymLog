import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../img/Logo.png";

const TitleContainer = styled.div`
    border-bottom: solid grey thin;
    display: flex;
    height: 5rem;
`;

const Title = styled.h1`
    font-size: 1.75em;
    margin: 0 0.5em;
    line-height: 5rem;
    font-weight: 300;
`;

const TitleImage = styled.img`
    width: 2em;
    margin: auto;
    margin-left: auto;
    margin-right: 1em;
`;

const UserInfo = styled.h2`
    font-size: 1.25em;
    margin: 0 0.5em;
    margin-top: 0.1em;
    line-height: 5rem;
    font-weight: lighter;
`;

type Props = {
    loggedIn: boolean;
    user: string;
};

function NavBar(props: Props) {
    const { loggedIn, user } = props;
    return (
        <TitleContainer>
            <Title>The Gym Log</Title>
            <UserInfo>{loggedIn ? `User: ${user}` : ""}</UserInfo>
            <TitleImage src={Logo} />
        </TitleContainer>
    );
}

export default NavBar;
