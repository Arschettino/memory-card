import React, { useState, useEffect } from 'react';
import Card from './Card';
import styled from 'styled-components';

export const StyledBoard = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 20px;
`;

export default function Board(props) {
    if(!props.cards) return false;
    return (
        <StyledBoard>
            {props.cards.map((card) => {
                    return (
                        <Card image={card.image} description={card.name} key={card.id} id={card.id} handler={props.handler} />
                    );
                })
            }
        </StyledBoard>
    );
}