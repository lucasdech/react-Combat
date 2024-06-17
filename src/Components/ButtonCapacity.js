import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SuperAttack, hitMonster, hitBack, health, getMana, ResetMana, MonsterRage, TurnPlayers, EmptyTurn, deathPlayer } from '../features/fight/fightSlice';
import { Button } from 'react-bootstrap';



const ButtonCapacity = (props) => {

    const monster = useSelector(state => state.fight.monster);
    const Turn = useSelector(state => state.fight.turnInfo.played);
    const deadPlayer = useSelector(state => state.fight.turnInfo.death);
    const dispatch = useDispatch()


    if ((Turn.length + deadPlayer.length) == 3) {
        dispatch(EmptyTurn())
    }

    const combat = () => {
        dispatch(hitMonster({ dammage: (props.player.attack), playerID: props.player.id }))
        setTimeout(() => { dispatch(hitBack({ playerID: props.id, riposte: monster.attack })) }, 1000)
        dispatch(TurnPlayers({ playerID: props.player.id }))
        if (monster.rage >= monster.ragemax) {
            dispatch(MonsterRage({ playerID: props.player.id, maxDegat: monster.attack * 3 }))
        }
    }

    const soigner = () => {
        dispatch(TurnPlayers({ playerID: props.player.id }))
        if (props.player.pv >= props.player.pvmax) {
            props.player.pv = props.player.pvmax;
        } else {
            if (props.player.pv == 0) {
                return
            } else {
                dispatch(health({ playerID: props.id, soins: 15 }))
            }
        }
    }

    const mana = () => {
        if (props.player.mana < props.player.manamax) {
            dispatch(getMana({ playerID: props.id, mana: 1 }))
        }
    }

    const MaxAttack = () => {
        dispatch(TurnPlayers({ playerID: props.player.id }))
        dispatch(SuperAttack({ super: (props.player.attack) * 4 }))
        dispatch(ResetMana({ playerID: props.id }))
        if (monster.rage >= monster.ragemax) {
            dispatch(MonsterRage({ playerID: props.player.id, maxDegat: monster.attack * 3 }))
        }
    }

    return (

        <>
            <Button type="button" id='btnfight' data-idbtn={props.player.id} onClick={() => { combat(); mana() }} disabled={props.player.pv <= 0 || Turn.includes(props.player.id)} className="btn btn-success mx-2 my-2 material-tooltip-main ">
                hit
                <i className="fas fa-bomb"></i> 5
            </Button>

            <Button type="button" id='btnfight' data-idbtn={props.player.id} onClick={soigner} disabled={props.player.pv >= props.player.pvmax || props.player.pv <= 0 || Turn.includes(props.player.id)} className="btn btn-success mx-2 my-2 material-tooltip-main ">
                santé
                <i class="fa-solid fa-heart"></i>
            </Button>

            <Button type="button" id='btnfight' data-idbtn={props.player.id} onClick={MaxAttack} disabled={props.player.mana < 5 || props.player.pv == 0 || Turn.includes(props.player.id)} className="btn btn-success mx-2 my-2 material-tooltip-main ">
                super
                <i class="fa-solid fa-burst"></i>
            </Button>
        </>

    )
}

export default ButtonCapacity;