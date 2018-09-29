import * as types from "./actionTypes";

const initialState = {
  inputs: [],
  dbConnected: {}
};

export function inputsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.DATABASE_OPENED:
      return {
        ...state,
        dbConnected: action.payload.db,
        inputs: action.payload.inputs
      };
    case types.INPUT_CREATED:
      return { ...state, inputs: action.newInputs };
    case types.INPUT_UPDATED:
      return { ...state, inputs: action.newInputs };
    case types.INPUT_DELETED:
      return { ...state, inputs: action.newInputs };
    default:
      return state;
  }
}

export function getInputs(state) {
  return state.inputsReducer.inputs;
}

export function getConnectedDb(state) {
  return state.inputsReducer.dbConnected;
}
