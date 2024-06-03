import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SuperAttack, hitMonster, hitBack, health, getMana, ResetMana } from '../features/fight/fightSlice';
import { Button } from 'react-bootstrap';



const ButtonCapacity = (props) => {

    const monster = useSelector(state => state.fight.monster);

    const dispatch = useDispatch()

    const combat = () => {
        dispatch(hitMonster({ dammage: (props.player.attack),playerID: props.player.id }))
        dispatch(hitBack({ playerID: props.id, riposte: monster.attack }))
    }

    const soigner = () => {
        dispatch(health({ playerID: props.id, soins: 15 }))
    }

    const mana = () => {
        dispatch(getMana({playerID: props.id, mana: 1}))
    }

    const MaxAttack = () => {
        console.log(props)
        dispatch(SuperAttack({super: (props.player.attack) * 3}))
        dispatch(ResetMana({playerID: props.id}))
    }
 

    return (
        <>
            <Button type="button" id='btnfight' data-idbtn={props.player.id} onClick={() => { combat() ; mana() }} disabled={props.player.pv <= 0} className="btn btn-success mx-2 my-2 material-tooltip-main ">
                hit
                <i className="fas fa-bomb"></i> 5
            </Button>

            <Button type="button" id='btnfight' data-idbtn={props.player.id} onClick={soigner} disabled={props.player.pv > 100} className="btn btn-success mx-2 my-2 material-tooltip-main ">
                santé
                <i class="fa-solid fa-heart"></i>
            </Button>

            <Button type="button" id='btnfight' data-idbtn={props.player.id} onClick={ MaxAttack } disabled={props.player.mana < 5} className="btn btn-success mx-2 my-2 material-tooltip-main ">
                super
                <i class="fa-solid fa-burst"></i>
            </Button>
        </>

    )
}

export default ButtonCapacity;