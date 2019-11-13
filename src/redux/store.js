import {createStore, applyMiddleware} from "redux";
import userReducer from "./reducer";
import thunk from 'redux-thunk';

const initialState = {
    buildings: {},
    equipment: {},
    outputBuildings: {},
    outputEquipment: {},
    selectEquipment: {
        id: undefined,
        isRoom: false,
        block: {},
    },
    formAddEquipment: {
        name: '',
        count: 0,
        room: '',
    }
};
let store = createStore(userReducer, applyMiddleware(thunk));
export {store, initialState};