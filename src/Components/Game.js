import React from 'react';
import './Game.css';
import MonsterList from './MonsterList';
import PlayerList from './PlayerList';
import { useSelector } from 'react-redux';


const Game = () => {

  const turn = useSelector(state => state.fight.turnInfo);
  console.log(turn)
  return (
    <>
    <div id='logo'>
      <div id='compteur'>Tour numéro : {turn.turnNumber}</div>
      <img src='/logo.png'/>
    </div>
      <div className="App d-flex">
        <section className="container-fluid m-5">
          <PlayerList />
        </section >
        <section className='mx-5'>
          <MonsterList />
        </section>
        <br></br>
      </div>
    </>
  )
}

export default Game;