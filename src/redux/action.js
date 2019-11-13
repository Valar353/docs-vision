import {store} from "./store";
import {
    CHANGE_FORM_COUNT,
    CHANGE_FORM_NAME,
    INIT_APP,
    SELECT_EQUIPMENT,
    UPDATE_OUTPUT_BUILDING,
    UPDATE_OUTPUT_EQUIPMENT
} from "./constant";
import Scorocode from "../lib/scorocode";

export function actionInitApp(buildings, equipment) {
    return {
        type: INIT_APP,
        buildings,
        equipment
    }
}
export function actionUpdateBuildings(outputBuildings) {
    return {
        type: UPDATE_OUTPUT_BUILDING,
        outputBuildings
    }
}
export function actionUpdateEquipment(outputEquipment) {
    return {
        type: UPDATE_OUTPUT_EQUIPMENT,
        outputEquipment
    }
}
export function actionSelectEquipment(id, isRoom = true, block ={}) {
    return {
        type: SELECT_EQUIPMENT,
        id,
        isRoom,
        block
    }
}
export function actionChangeFormName(name) {
    return {
        type: CHANGE_FORM_NAME,
        name,
    }
}
export function actionChangeFormCount(count) {
    return {
        type: CHANGE_FORM_COUNT,
        count,
    }
}
export const updateScorocode = () => {
    const updateHierarchy = async (buildings, eq) => {
        const init = (buildings) => {
            // console.log(buildings)
            return buildings.find().then((finded) => {
                let buildings = finded.result;
                return buildings.map((build) => {
                    // console.log(build)
                    let fl = createRoomBlock(build.rooms, build);
                    // console.info(fl)
                    return {id: build._id, name: build.name, children: fl, isEmpty: true}
                });
            });

            function createRoomBlock(block, parent = {}) {
                return block.map(bl => {
                    if (typeof bl.children !== 'undefined') {
                        let rooms = createRoomBlock(bl.children, block);
                        const par = searchParent(bl, parent);
                        return {id: bl.id, name: bl.name, parent: par, children: rooms, isEmpty: true}
                    } else {
                        const par = searchParent(bl, parent);
                        return {id: bl.id, parent: par, name: bl.name, isEmpty: true}
                    }
                });
                function searchParent(block, parent) {
                    let par = [];
                    if(typeof parent.length !== 'undefined'){
                        par = parent.find(p => {
                            return p.children.find(ch => {
                                if(block.id === ch.id) return true;
                            })
                        })
                    }else{
                        par = parent
                    }
                    return par;
                }
            }
        };

        let per = await init(buildings);
        // console.log(per)

        per = await checkEquipment(per, eq);
        // console.log(per)
        await store.dispatch(actionUpdateBuildings(per));
    };
    const checkEquipment = (block, eq) => {
        const check = (bl, eq) => {
            let cos = searchPar(bl);
            // console.log(cos);
            return cos;
            function searchPar(block, e = true) {
                // console.log(block)
                return block.map(child=>{
                    if(typeof child.children === 'undefined'){
                        let ll = eq.filter(item=> child.id === item.room && item.count > 0);
                        if(ll.length > 0){
                            child.isEmpty = false;
                        }
                        return {ch:child, emp: false}
                    }else{
                        const arr = searchPar(child.children);
                        let childArr = [];
                        let isEmpty = [];
                        arr.map(it => {
                            childArr.push(it.ch);
                            isEmpty.push(it.emp);
                        });
                        let g = isEmpty.some(b => b);
                        if(typeof g === 'undefined'){
                            child.isEmpty = false;

                        }else{
                            // console.log(g, child)

                            if(!g){
                                child.isEmpty = false;
                            }else{

                                child.isEmpty = true;

                            }


                        }
                        if(typeof childArr[0] === 'undefined'){
                            // console.log(childArr, isEmpty, child)
                            return {...child, children: child.children }
                        }


                        // if(!emp)child.isEmpty = false;
                        return {...child, children: childArr }
                    }
                })
            }
        };
        return check(block, eq);
    };
    const updateEquipment = (equipment) => {
        return equipment.find().then((found) => {
            let equipment = found.result;
            // console.info(equipment);

            return equipment.map(item => {
                return {id: item._id, name: item.name, count: item.count, room: item.room}
            });
        })
            .then(value => {
                store.dispatch(actionUpdateEquipment(value));
                return value;
            });
    };
    return async dispatch =>{
        const buildings = new Scorocode.Query("buildings");
        const equipment = new Scorocode.Query("equipment");
        const eq = await updateEquipment(equipment)
        await updateHierarchy(buildings, eq);
    }

};
