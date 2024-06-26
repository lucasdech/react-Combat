import React from 'react';
import PlayerCard from './PlayerCard';
import { useSelector } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import "./playerCard.css"

const PlayerList = () => {

  const players = useSelector(state => state.fight.players);
  const Turn = useSelector(state => state.fight.turnInfo);

  return (
    <div className='row'>
      <Carousel id="caroussel" interval={100000000000}>
        {
          players.map((player, key) => (
            <Carousel.Item id='player'>
              <PlayerCard key={key} player={player} turn={Turn}/>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </div>
  );
}

export default PlayerList;