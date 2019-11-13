import React from 'react';
import style from './Nav.module.scss';
import {store} from "../../redux/store";
import {actionSelectEquipment, actionUpdateBuildings, selectEquipment} from "../../redux/action";
import equipmentIcon from '../../img/equipment.png';

export default class Nav extends React.Component {
    componentDidMount() {
        // const buildings = this.initBuilds(this.props.state.buildings);
    }

    render() {
        let buildings = <div/>;
        if (Object.keys(this.props.state.outputBuildings).length !== 0) {
            buildings = this.createHierarchy(this.props.state.outputBuildings);
        }

        return (
            <div className={style.nav}>
                <div className={style.buildings}>
                    {buildings}
                </div>
            </div>
        )
    }

    createHierarchy = (arr) => {
        const createBlock = (bl) => {
            return bl.map(block=>{
                let iconIsEmpty = '';
                if(typeof block.children !== 'undefined'){
                    const children = createBlock(block.children);
                    if(!block.isEmpty){
                        iconIsEmpty = <img src={equipmentIcon} className={style.equipmentIcon} />;
                    }
                    // console.log(block)
                    return <div key={block.id} className={style.roomBlock}>
                        <div className={style.title} onClick={()=>this.selectNode(block)}>{iconIsEmpty}{block.name}</div>
                        <div>{children}</div>
                    </div>;
                }else{
                    // console.log(block.isEmpty)
                    if(!block.isEmpty){
                        iconIsEmpty = <img src={equipmentIcon} className={style.equipmentIcon} />;
                    }
                    return <div key={block.id} className={style.roomBlock} onClick={()=>this.selectRoom(block)}>{iconIsEmpty}{block.name}</div>;
                }
            });
        };
        return createBlock(arr);
    };

    selectNode = (block) =>{
        store.dispatch(actionSelectEquipment(block.id,false, block))
    };
    selectRoom = (block) => {
        store.dispatch(actionSelectEquipment(block.id,true, block))
    };

}