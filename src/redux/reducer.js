import {initialState} from './store';
import {
    CHANGE_FORM_COUNT,
    CHANGE_FORM_NAME,
    INIT_APP,
    SELECT_EQUIPMENT,
    UPDATE_OUTPUT_BUILDING,
    UPDATE_OUTPUT_EQUIPMENT
} from "./constant";

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_APP:
            return {
                ...state,
                buildings: action.buildings,
                equipment: action.equipment,
            };
        case UPDATE_OUTPUT_BUILDING:
            return {
                ...state,
                outputBuildings: action.outputBuildings
            };
        case UPDATE_OUTPUT_EQUIPMENT:
            return {
                ...state,
                outputEquipment: action.outputEquipment
            };
        case SELECT_EQUIPMENT:
            // console.log(action)
            return {
                ...state,
                selectEquipment: {
                    id: action.id,
                    isRoom: action.isRoom,
                    block: action.block,
                },
                formAddEquipment: {
                    ...state.formAddEquipment,
                    room: action.id,
                }
            };
        case CHANGE_FORM_NAME:
            return {
                ...state,
                formAddEquipment: {
                    ...state.formAddEquipment,
                    name: action.name,
                }
            };
        case CHANGE_FORM_COUNT:
            return {
                ...state,
                formAddEquipment: {
                    ...state.formAddEquipment,
                    count: action.count,
                }
            };
        default:
            return state;
    }
}