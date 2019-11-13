import React from 'react';
import style from './Equipment.module.scss';
import Scorocode from "../../lib/scorocode";
// import AddEquipment from "./AddEquipment";
import AddEquipmentContainer from "../../Containers/AddEquipmentContainer";
import {store} from "../../redux/store";
import {updateScorocode} from "../../redux/action";

export default class Equipment extends React.Component {
    render() {
        const {outputEquipment, selectEquipment} = this.props.state;
        const outputEq = this.createEquipment(outputEquipment, selectEquipment);
        const title = this.createTitle(selectEquipment);
        return (
            <div className={style.equipment}>
                {title}
                {outputEq}

            </div>
        )
    }
    createTitle = (selectBlock) => {
        if(typeof selectBlock.id !== 'undefined'){
            return <div className={style.equipmentTitle}>Выбран {selectBlock.block.name} </div>
        }else{
            return <div className={style.equipmentTitle}>Выберите узел здания</div>
        }
    };
    createEquipment = (equipment, selectEquipment) => {
        // console.log(equipment, selectEquipment)
        const {isRoom, id, block} = selectEquipment;
        if (Object.keys(equipment).length === 0 || typeof id === 'undefined') {
            return <div/>
        } else {
            if (isRoom) {
                const items = equipment.map(item => {
                    if (item.count === 0 || item.room === '' || typeof item.room === 'undefined') return false;
                    if (item.room !== id) return false;
                    return <div key={item.id} className={style.item}>
                        <div className={style.name}>Наименование: {item.name}</div>
                        <div className={style.count}>Количество: {item.count}</div>
                        {/*<div className={style.count}>Комната: {item.room}</div>*/}
                        <div className={style.btn} onClick={() => this.changeEquipment(item.id, item.name, item.count)}>Добавить</div>
                        <div className={style.btn} onClick={() => this.removeEquipment(item.id)}>Удалить</div>
                    </div>
                });
                return <>
                    {items}
                    <AddEquipmentContainer />
                </>
            } else {
                return createBlock([block]);

            }
            function createBlock(bl) {
                return bl.map(block=>{
                    if(typeof block.children !== 'undefined'){
                        const children = createBlock(block.children);
                        const equipment = createItem(block);
                        // console.log(equipment)
                        return <div key={block.id} className={style.buildBlock}>
                            <div>{block.name}</div>
                            <div>{equipment}</div>
                            <div>{children}</div>
                        </div>;
                    }else{
                        const equipment = createItem(block);
                        return <div key={block.id} className={style.buildBlock}>{block.name}
                            <div>{equipment}</div>
                        </div>;
                    }
                });
            }
            function createItem(block) {
                return equipment.map(item => {
                    if(block.id === item.room && item.count > 0){
                        // console.log(item);
                        return (
                            <div key={item.id} className={style.item}>
                                <div className={style.name}>Наименование: {item.name}</div>
                                <div className={style.count}>Количество: {item.count}</div>
                            </div>
                        );
                    }else{
                        return false;
                    }
                });
            }
        }
    };

    removeEquipment = (id) => {
        let equip = new Scorocode.Object("equipment");
        equip.getById(id).then((item) => {
            equip.remove(item).then(() => {
                store.dispatch(updateScorocode());
            });
        });

    };
    changeEquipment = (id, name, count) => {

        // let equip = this.props.state.equipment;
        let equip = new Scorocode.Object("equipment");
        equip.set("_id", id).set("name", name).set("count", ++count);
        equip.save().then(() => {
            store.dispatch(updateScorocode());
        });

    };

}