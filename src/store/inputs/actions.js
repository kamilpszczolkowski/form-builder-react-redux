import * as types from "./actionTypes";
import { IndexedDBService } from "../../services/IndexedDBService";

export const openDatabase = () => {
  return dispatch => {
    IndexedDBService.openDB((db, inputs) => {
      dispatch({
        type: types.DATABASE_OPENED,
        payload: { db, inputs }
      });
    });
  };
};

export const inputCreate = (dbConnected, oldInputs) => {
  return dispatch => {
    IndexedDBService.addInput(dbConnected, oldInputs, newInputs => {
      dispatch({
        type: types.INPUT_CREATED,
        newInputs
      });
    });
  };
};

export const inputUpdate = (dbConnected, inputData) => {
  return dispatch => {
    IndexedDBService.updateInput(dbConnected, inputData, newInputs => {
      dispatch({
        type: types.INPUT_UPDATED,
        newInputs
      });
    });
  };
};

export const inputDelete = (dbConnected, inputId) => {
  return dispatch => {
    IndexedDBService.deleteInput(dbConnected, inputId, newInputs => {
      dispatch({
        type: types.INPUT_DELETED,
        newInputs
      });
    });
  };
};
