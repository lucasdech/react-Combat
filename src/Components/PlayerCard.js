import React from 'react';
import ButtonCapacity from './ButtonCapacity';
import ProgressBar from './ProgressBar';
import './playerCard.css'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

const PlayerCard = (props) => {

    return (
        <>
            <div className='d-flex justify-content-center'>
                <img src={props.player.photo} alt='player' className='p-5' />
            </div>
            <Carousel.Caption>
                <h3>{props.player.name}</h3>
                <div>
                    <ProgressBar pv={props.player.pv} pvMax={props.player.pvmax} faType='fa-heart' barName=' : pv ' bgType='bg-danger' />
                    <ProgressBar pv={props.player.mana} pvMax={props.player.manamax} faType='fa-blue' barName=' : fluide ' bgType='bg-primary' />
                    <div className="row">
                        <div >
                            <ButtonCapacity id={props.player.id} player={props.player} />
                        </div>
                    </div>
                </div>
            </Carousel.Caption>
        </>
    )
}


export default PlayerCard;