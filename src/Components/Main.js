import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Board, {StyledBoard} from './Board';

const MainWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
    background-color: rgb(250,250,250);
    padding: 20px;
`;

const ScoreBoardWrapper = styled.div`
    display: flex;
    gap: 100px;
    justify-content: center;
    align-items: center;
`;

const current_style = {
    width: 200,
    backgroundColor: 'rgb(255,180,180)',
    padding: '10px 10px',
    borderRadius: 20,
    fontWeight: 600,
    textAlign: 'center',
}

const best_style = {
    width: 200,
    backgroundColor: 'rgb(180,255,180)',
    padding: '10px 10px',
    borderRadius: 20,
    fontWeight: 600,
    textAlign: 'center',
}


function ScoreBoard(props) {
    return (
        <ScoreBoardWrapper>
            <div className="current" style={current_style}>
                Current Score: {props.currentScore}
            </div>
            <div className="best" style={best_style}>
                Best Score: {props.bestScore}
            </div>
        </ScoreBoardWrapper>
    );
}



export default function Main() {
    const cardCount = 12;
    const [pokemon, setPokemon] = useState([]);  //array of objects with id, name, image
    const [clickedPokemon, setClickedPokemon] = useState([]); //array 
    const [bestScore, setBestScore] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        async function createPokemon() {
            setPokemon(shuffleArray(await fetchNPokemon(cardCount)));
        }
        createPokemon();
        setClickedPokemon(new Array(cardCount).fill(0));
    }, [])

    function testClick(id) {
        let copy = [...clickedPokemon];
        if(copy[id] === 1) {
            resetGame();
            setScore(0);
        }
        else {
            copy[id] = 1;
            setClickedPokemon(copy);
            let temp = copy.reduce((acc, cur) => {
                return acc + cur;
            })
            setScore(temp);
            if (temp > bestScore) setBestScore(temp);
            setPokemon(shuffleArray(pokemon));
        }
    }

    function resetGame() {
        setPokemon(shuffleArray(pokemon));
        setClickedPokemon(new Array(cardCount).fill(0));
    }

    function handleClick(e) {
        testClick(e.target.id);
        console.log('click');
    }

    return (

        <MainWrapper>
            <ScoreBoard currentScore={score} bestScore={bestScore} />
            <Board cards={pokemon} handler={handleClick} />
        </MainWrapper>
    );
}




//pokemon API util

async function fetchNPokemon(num) {

    let pokemonData = [];
    for (let i = 0; i < num; i++) {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${i + 1}`
        pokemonData.push(fetch(pokemonUrl, { mode: 'cors' }));
    }
    let data = await Promise.all(pokemonData);
    let json = data.map( (response) => response.json());
    let objects = await Promise.all(json);
    let newPokemon;

    try {
        newPokemon = objects.map((pkmn) => {
            return { id: pkmn.id - 1, name: capCase(pkmn.name), image: pkmn.sprites.front_default }
        });
    } catch {
        console.log('Fetch error');

    }
    return newPokemon;
}


//utils

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function capCase(str) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}