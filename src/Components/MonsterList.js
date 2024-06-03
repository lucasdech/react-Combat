import React from 'react';
import MonsterCard from './Monster';
import { useSelector } from 'react-redux';
import "./playerCard.css"

const MonsterList = () => {

  const monsters = useSelector(state => state.fight.monster);

  return (
    <div className='row'>
        <MonsterCard monster={monsters} />
    </div>
  );
}

export default MonsterList;