import React from 'react';
import style from './App.module.scss';
import Scorocode from "../../lib/scorocode";
import {store} from "../../redux/store";
import {actionInitApp, actionUpdateBuildings, actionUpdateEquipment, updateScorocode} from "../../redux/action";
import EquipmentContainer from "../../Containers/EquipmentContainer";
import NavContainer from "../../Containers/NavContainer";

export default class App extends React.Component {
    componentDidMount() {
        this.initApp();
    }

    render() {
        return (
            <div className={style.page}>
                <NavContainer/>
                <EquipmentContainer/>
            </div>
        );
    }

    initApp = async () => {
        Scorocode.Init({
            ApplicationID: "3196b2e873234547ad8b06ed636d3538",
            JavaScriptKey: "5e85f685a23e44e6abad95accc1dd2ea",
            MasterKey: "659d718ff9664f6fafbdb79efc93cb34"
        });
        // const buildings = new Scorocode.Query("buildings");
        // const equipment = new Scorocode.Query("equipment");
        store.dispatch(updateScorocode());

        // const eq = await this.updateEquipment(equipment)
        // await this.updateHierarchy(buildings, eq);
        // store.dispatch(actionInitApp(buildings, equipment));
    };
    // updateHierarchy = async (buildings, eq) => {
    //     const init = (buildings) => {
    //         // console.log(buildings)
    //         return buildings.find().then((finded) => {
    //             let buildings = finded.result;
    //             return buildings.map((build) => {
    //                 // console.log(build)
    //                 let fl = createRoomBlock(build.rooms, build);
    //                 // console.info(fl)
    //                 return {id: build._id, name: build.name, children: fl, isEmpty: true}
    //             });
    //         });
    //
    //         function createRoomBlock(block, parent = {}) {
    //             return block.map(bl => {
    //                 if (typeof bl.children !== 'undefined') {
    //                     let rooms = createRoomBlock(bl.children, block);
    //                     const par = searchParent(bl, parent);
    //                     return {id: bl.id, name: bl.name, parent: par, children: rooms, isEmpty: true}
    //                 } else {
    //                     const par = searchParent(bl, parent);
    //                     return {id: bl.id, parent: par, name: bl.name, isEmpty: true}
    //                 }
    //             });
    //             function searchParent(block, parent) {
    //                 let par = [];
    //                 if(typeof parent.length !== 'undefined'){
    //                     par = parent.find(p => {
    //                         return p.children.find(ch => {
    //                             if(block.id === ch.id) return true;
    //                         })
    //                     })
    //                 }else{
    //                     par = parent
    //                 }
    //                 return par;
    //             }
    //         }
    //     };
    //
    //     let per = await init(buildings);
    //     // console.log(per)
    //
    //     per = await this.checkEquipment(per, eq);
    //     await this.checkEquipment(per, eq);
    //     // console.log(per)
    //     await store.dispatch(actionUpdateBuildings(per));
    // };
    // checkEquipment = (block, eq) => {
    //     const check = (bl, eq) => {
    //         // console.log(bl);
    //         let cos = searchPar(bl);
    //         // console.log(cos);
    //         return cos;
    //         function searchPar(block, e = true) {
    //             // console.log(block)
    //             return block.map(child=>{
    //                 if(typeof child.children === 'undefined'){
    //                     // console.log(child.id, eq.room)
    //                     let ll = eq.filter(item=> child.id === item.room);
    //                     if(ll.length > 0){
    //                         child.isEmpty = false;
    //                     }
    //
    //                     return child
    //                 }else{
    //                     let g = searchPar(child.children);
    //                     let par = g[0].parent;
    //                     // console.log(child, g)
    //
    //                     if(typeof g[0].parent === 'undefined'){
    //                         par = g[g.length-1].parent;
    //
    //                     }
    //                     return {...par, children: g}
    //                 }
    //             })
    //
    //         }
    //         function searchP(parent) {
    //             parent.isEmpty = false;
    //             // console.log(parent)
    //             if(typeof parent === 'undefined'){
    //                 return searchP(parent.parent);
    //             }else{
    //                 // console.log(parent)
    //                 return parent;
    //             }
    //         }
    //     };
    //     return check(block, eq);
    // };
    // updateEquipment = (equipment) => {
    //     return equipment.find().then((found) => {
    //         let equipment = found.result;
    //         // console.info(equipment);
    //
    //         return equipment.map(item => {
    //             return {id: item._id, name: item.name, count: item.count, room: item.room}
    //         });
    //     })
    //         .then(value => {
    //             store.dispatch(actionUpdateEquipment(value));
    //             return value;
    //         });
    // }
}