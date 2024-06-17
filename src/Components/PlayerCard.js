import { React, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deathPlayer, EmptydeathPlayer } from '../features/fight/fightSlice';
import ButtonCapacity from './ButtonCapacity';
import ProgressBar from './ProgressBar';
import './playerCard.css';
import Carousel from 'react-bootstrap/Carousel';

const PlayerCard = (props) => {

    const HavePlayed = useRef();
    const divToInner = HavePlayed.current;
    const dispatch = useDispatch()

    const player = useSelector(state =>
        state.fight.players.find(player => player.id === props.player.id)
    );

    const deathplayer = useSelector(state => state.fight.turnInfo.death)

    if (deathplayer.length == 3) {
        dispatch(EmptydeathPlayer())
    }
    useEffect(() => {
        if (props.player.pv <= 0) {
            dispatch(deathPlayer({ playerID: props.player.id }))
        }
    }, [player.pv]);


    if (divToInner != undefined) {

        if ((props.turn.played).includes(props.player.id) == true) {
            divToInner.classList.add("havePlayed")
        } else if ((props.turn.played).includes(props.player.id) == false) {
            setTimeout(() => { divToInner.classList.remove("havePlayed") }, 1500)
        }

        if (props.player.pv <= 0 ) {
            divToInner.classList.remove("havePlayed")
            divToInner.classList.add(`${props.player.name}dead`)
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