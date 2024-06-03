import React from 'react';
import './Monster.css'
import ProgressBar from './ProgressBar';

const MonsterCard = (props) => {

  return (
    <div id="monsterCard">
      <img src={`${props.monster.photo}`} alt='monstre' />
      <h5 className="card-title text-white">{props.monster.name}</h5>
      <div className='lifeBar'>
        <ProgressBar pv={props.monster.pv} pvMax={props.monster.pvmax} bgType='bg-danger' faType='fa-heart' barName=' : pv' />
        <ProgressBar pv={props.monster.rage} pvMax={props.monster.ragemax} bgType='bg-danger' barName=' rage' />
      </div>
    </div>
  )
}

export default MonsterCard;