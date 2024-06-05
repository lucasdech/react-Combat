import React from 'react';
import { useRef } from 'react';
import ButtonCapacity from './ButtonCapacity';
import ProgressBar from './ProgressBar';
import './playerCard.css';
import Carousel from 'react-bootstrap/Carousel';

const PlayerCard = (props) => {

    console.log(props.player.id)
    console.log(props.turn.played)

    const HavePlayed = useRef();
    const divToInner = HavePlayed.current;


    if (divToInner != undefined) {
        if ((props.turn.played).includes(props.player.id) == true) {
            console.log(divToInner.classList);
            divToInner.classList.add("havePlayed")
        } else if ((props.turn.played).includes(props.player.id) == false) {
            setTimeout(() => {divToInner.classList.remove("havePlayed")}, 1500)
        }
    }

    const getImageSrc = () => {
        if (props.player.mana < props.player.manamax) {
            return `${props.player.photo}`;
        } else if (props.player.mana >= props.player.manamax) {
            return `${props.player.photo2}`;
        }
    };


    return (
        <>
            <div ref={HavePlayed} className='d-flex justify-content-center'>
                <img src={getImageSrc()} alt='player' className='p-5' />
            </div>
            <Carousel.Caption>
                <h3>{props.player.name}</h3>
                <div>
                    <ProgressBar pv={props.player.pv} pvMax={props.player.pvmax} faType='fa-heart' barName=' : pv ' bgType='bg-danger' />
                    <ProgressBar pv={props.player.mana} pvMax={props.player.manamax} faType='fa-blue' barName=' : fluide ' bgType='bg-primary' />
                    <div className="row">
                        <div >
                            <ButtonCapacity id={props.player.id} player={props.player} turn={props.turn} />
                        </div>
                    </div>
                </div>
            </Carousel.Caption>
        </>
    )
}


export default PlayerCard;