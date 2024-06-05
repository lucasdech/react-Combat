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
      "photo2": "/luffy2.png",
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
      "photo2": "/Zoro2.png",
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
      "photo2": "/sanji2.png",
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
    "photo": "/fantome.png",
    "photo2": "/fantome.png",
  },
  turnInfo: {
    "played": [],
    "turnNumber": 1,
    "death": [],
  },
};

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {

    ChooseMonster: (state, action) => {
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
          photo: action.payload.monster.photo,
          photo2: action.payload.monster.photo2
        }
      }
      return newState
    },

    hitMonster: (state, action) => {

      let newState = { ...state, monster: { ...state.monster, pv: (state.monster.pv) - (action.payload.dammage), rage: state.monster.rage + 1 } }
      if ((newState.monster.pv) <= 0) {
        newState = initialState
      }
      return newState
    },

    getMana: (state, action) => {
      const player = state.players.find(
        (player) => player.id === action.payload.playerID
      );
      player.mana += action.payload.mana;
    },

    hitBack: (state, action) => {
      const player = state.players.find(
        (player) => player.id === action.payload.playerID
      );
      player.pv -= action.payload.riposte;
    },

    SuperAttack: (state, action) => {
      let newState = { ...state, monster: { ...state.monster, pv: (state.monster.pv) - (action.payload.super), rage: state.monster.rage + 3 } }
      if ((newState.monster.pv) <= 0) {
        newState = initialState
      }
      return newState
    },

    ResetMana: (state, action) => {
      const player = state.players.find(
        (player) => player.id === action.payload.playerID
      );
      player.mana = 0
    },

    health: (state, action) => {
      const player = state.players.find(
        (player) => player.id === action.payload.playerID
      );
      player.pv += action.payload.soins;
    },

    MonsterRage: (state, action) => {
      const player = state.players.find(
        (player) => player.id === action.payload.playerID
      );
      player.pv -= action.payload.maxDegat;
    },

    TurnPlayers: (state, action) => {

      const player = state.players.find(
        (player) => player.id === action.payload.playerID
      );

      let newState = {
        ...state,
        turnInfo: {
          ...state.turnInfo,
          played: [...state.turnInfo.played, player.id]
        }
      };
      return newState
    },

    EmptyTurn: (state) => {
      let newState = { ...state, turnInfo: { ...state.turnInfo, played: []} }
      return newState
    },
    
    TurnCount: (state) => {
        let newState = { ...state, turnInfo: { ...state.turnInfo, turnNumber: state.turnInfo.turnNumber + 1} }
      return newState
    },
 
  },
})

export const { hitMonster, hitBack, ChooseMonster, health, getMana, SuperAttack, ResetMana, MonsterRage, TurnPlayers, EmptyTurn, TurnCount } = fightSlice.actions

export default fightSlice.reducer;