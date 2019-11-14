import React from 'react';
import style from './Equipment.module.scss';
import Scorocode from "../../lib/scorocode";
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
                <div className={style.equipmentList}>
                    {outputEq}
                </div>
            </div>
        )
    }

    createTitle = (selectBlock) => {
        if (typeof selectBlock.id !== 'undefined') {
            const breadcrumbs = createBreadcrumbs(selectBlock.block);
            return <div className={style.equipmentTitle}>{breadcrumbs} </div>
        } else {
            return <div className={style.equipmentTitle}>Выберите узел здания</div>
        }

        function createBreadcrumbs(selectBlock) {
            if (typeof selectBlock.parent === 'undefined') {
                return selectBlock.name
            } else {
                return createBreadcrumbs(selectBlock.parent) + '/' + selectBlock.name;
            }
        }
    };
    createEquipment = (equipment, selectEquipment) => {
        const {isRoom, id, block} = selectEquipment;
        if (Object.keys(equipment).length === 0 || typeof id === 'undefined') {
            return <div/>
        } else {
            if (isRoom) {
                const items = equipment.map(item => {
                    if (item.count === 0 || item.room === '' || typeof item.room === 'undefined') return false;
                    if (item.room !== id) return false;
                    return <div key={item.id} className={style.item}>
                        <div className={style.name}>
                            {item.name}: <strong>{item.count}</strong>
                        </div>
                        <div className={style.buttons}>
                            <div className={style.btn}
                                 onClick={() => this.changeEquipment(item.id, item.name, item.count)}>Добавить
                            </div>
                            <div className={style.btn} onClick={() => this.removeEquipment(item.id)}>Удалить</div>
                        </div>
                    </div>
                });
                return <>
                    <div className={style.equipmentList}>
                        <div className={style.wrapperForm}><AddEquipmentContainer/></div>
                        {items}
                    </div>

                </>
            } else {
                return createBlock([block]);
            }

            function createBlock(bl) {
                return bl.map(block => {
                    if (typeof block.children !== 'undefined') {
                        const children = createBlock(block.children);
                        const equipment = createItem(block);
                        return <div key={block.id} className={style.buildBlock}>
                            <div className={style.blockTitle}>{block.name}</div>
                            <div>{equipment}</div>
                            <div>{children}</div>
                        </div>;
                    } else {
                        const equipment = createItem(block, false);
                        return <div key={block.id} className={style.buildBlock}>
                            <div className={style.blockTitle}>{block.name}</div>
                            <div className={style.blockEquipmentList}>{equipment}</div>
                        </div>;
                    }
                });
            }

            function createItem(block, children = true) {
                const arr = equipment.map(item => {
                    if (block.id === item.room && item.count > 0) {
                        return (
                            <div key={item.id} className={style.item}>
                                <div className={style.name}>Наименование: {item.name}</div>
                                <div>Количество: {item.count}</div>
                            </div>
                        );
                    } else {
                        return false;
                    }
                });
                if (!children) {
                    if (arr.every(item => !item)) {
                        return <div>Оборудование отсутствует</div>
                    } else {
                        return arr
                    }
                } else {
                    return arr
                }
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
        let equip = new Scorocode.Object("equipment");
        equip.set("_id", id).set("name", name).set("count", ++count);
        equip.save().then(() => {
            store.dispatch(updateScorocode());
        });
    };

}