import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlayerList from './PlayerList';
import MonsterList from './MonsterList';
import { Button } from 'react-bootstrap';
import './Game.css'

const Game = () => {
  const death = useSelector(state => state.fight.turnInfo.death);
  const monster = useSelector(state => state.fight.monster);
  console.log(monster)

  const End = useRef();
  const btnRestart = useRef();

  const dispatch = useDispatch()


  const hidDiv = (htmlElement) => {
    if (htmlElement) {
      htmlElement.classList.add('test');
    }
  };

  useEffect(() => {
    const player = document.querySelector('#player');
    const monstre = document.querySelector('#monstre');
    const status = document.querySelector('#state');

    if (death.length === 3) {

      hidDiv(player);
      hidDiv(monstre);


      End.current.classList.add("ecranFin");

      btnRestart.current.classList.remove('test');

      status.classList.add('defeat')
    }

  }, [death, monster.pv]);


  const reload = () => {
    window.location.reload()
  }


  return (
    <>
      <div ref={End}>
        <div id='logo'>
          <img src='/logo.png' alt='logo' />
        </div>
        <div id='state' className='test' ></div>
        <div className="App d-flex">
          <section id='player' className="container-fluid m-5">
            <PlayerList />
          </section >
          <section id='monstre' className='mx-5'>
            <MonsterList />
          </section>
          <Button variant="outline-dark" ref={btnRestart} onClick={reload} className='test' id='btnCloseModal'>
            Rejouer !
          </Button>
          <br></br>
        </div>
      </div>
    </>
  );
}

export default Game;
