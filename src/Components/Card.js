import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const CardWrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const Sprite = styled.div`
    border: 1px solid black;
    border-radius: 15px;
    overflow: hidden;
    height: 100%;
    transition: .2s;

    &:hover {
        background-color: rgb(180,255,180);
        transform: scale(1.05);
    }
`;
const Description = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 600;
`;


export default function Card(props) {
    return (
        <CardWrapper onClick={props.handler}>
            <Sprite >
                <img src={props.image} alt="pokemon card" width="150px" id={props.id} />
            </Sprite>
            <Description>
                {props.description}
            </Description>
        </CardWrapper>
    );
}

