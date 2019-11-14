import {createStore, applyMiddleware} from "redux";
import userReducer from "./reducer";
import thunk from 'redux-thunk';

const initialState = {
    outputBuildings: {},
    outputEquipment: {},
    selectEquipment: {
        id: undefined,
        isRoom: false,
        block: {},
    },
    formAddEquipment: {
        name: '',
        count: '',
        room: '',
    }
};
let store = createStore(userReducer, applyMiddleware(thunk));
export {store, initialState};