import React from 'react';
import styled from 'styled-components';
import logo from '../Images/logo.png';

const HeaderWrapper = styled.div`
    background-color: red;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Header() {
    return (
        <>
            <HeaderWrapper>
                <img src={logo} alt="pokemon memory logo" />
            </HeaderWrapper>
            <div style={{ backgroundColor: 'black', height: 30}}></div>
        </>
    );
}