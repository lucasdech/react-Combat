import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  players: [
    {
      "id": 1,
      "name": "Luffy",
      "pv": 100,
      "pvmax": 100,
      "attack": 25,
      "mana": 0,
      "manamax": 5,
      "photo": "/luffy.png",
      "isturn": true,
    },
    {
      "id": 2,
      "name": "Zoro",
      "pv": 110,
      "pvmax": 110,
      "attack": 30,
      "mana": 0,
      "manamax": 5,
      "photo": "/Zoro.png",
      "isturn": true,
    },
    {
      "id": 3,
      "name": "Sanji",
      "pv": 110,
      "pvmax": 110,
      "attack": 30,
      "mana": 0,
      "manamax": 5,
      "photo": "/sanji.png",
      "isturn": true,
    },
  ],
  monster:
  {
    "id": 0,
    "name": "fatome",
    "pv": 10000000,
    "pvmax": 10000000,
    "attack": 1000,
    "rage": 10,
    "ragemax": 10,
    "photo": "/fantome.png"
  },
  isTurnArray: {
    "played": [],
    "turn": 0
  },
};

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {

    ChooseMonster: (state, action) => {
      console.log(action.payload.monster.id)
      let newState = {
        ...state, monster: {
          ...state.monster,
          id: action.payload.monster.id,
          name: action.payload.monster.name,
          pv: action.payload.monster.pv,
          pvmax: action.payload.monster.pvmax,
          attack: action.payload.monster.attack,
          rage: action.payload.monster.rage,
          ragemax: action.payload.monster.ragemax,
          photo: action.payload.monster.photo
        }
      }

      return newState
    },

    hitMonster: (state, action) => {

      let newState = { ...state, monster: { ...state.monster, pv: (state.monster.pv) - (action.payload.dammage), rage: state.monster.rage + 1} }
      if ((newState.monster.pv) <= 0) {
        newState = initialState
      }
      return newState
    },

    getMana: (state, action) => {
      const player = state.players.find(
        (player) => player.id === action.payload.playerID
      );
      if (player) {
        player.mana += action.payload.mana;
        if (player.mana > player.manamax) {
          player.mana = 5
        }
      }
    },

    hitBack: (state, action) => {
      const player = state.players.find(
        (player) => player.id === action.payload.playerID
      );
      if (player) {
        player.pv -= action.payload.riposte;
        if (player.pv < 0) {
          player.pv = 0;
        }
      }
    },

    SuperAttack: (state, action) => {
      console.log(action.payload)
      let newState = { ...state, monster: { ...state.monster, pv: (state.monster.pv) - (action.payload.super) } }
      console.log(newState)
      if ((newState.monster.pv) <= 0) {
        newState = initialState
      }
      return newState
    },

    ResetMana: (state, action) => {
      const player = state.players.find(
        (player) => player.id === action.payload.playerID
      );
      if (player) {
        player.mana = 0
      }
    },

    health: (state, action) => {
      const player = state.players.find(
        (player) => player.id === action.payload.playerID
      );
      if (player) {
        player.pv += action.payload.soins;
        if (player.pv >= player.pvmax) {
          player.pv = player.pvmax;
        }
      }
    },
  },
})

export const { hitMonster, hitBack, ChooseMonster, health, getMana, SuperAttack, ResetMana } = fightSlice.actions

export default fightSlice.reducer;