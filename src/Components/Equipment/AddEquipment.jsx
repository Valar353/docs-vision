import React from 'react';
import style from './Equipment.module.scss';
import {store} from "../../redux/store";
import {actionChangeFormCount, actionChangeFormName, updateScorocode} from "../../redux/action";
import Scorocode from "../../lib/scorocode";

export default class AddEquipment extends React.Component {
    render() {
        const {name, count, room} = this.props.state.formAddEquipment;
        return (
            <form className={style.addForm} onSubmit={(e) => this.addEquipment(e, name, count, room)}>
                <div className={style.title}>Добавить оборудование:</div>
                <label>
                    Название:
                    <input type="text" value={name} onChange={this.changeName}/>
                </label>
                <label>
                    Количество:
                    <input type="text" value={count} onChange={this.changeCount}/>
                </label>
                <button>Добавить</button>
            </form>
        )
    }

    addEquipment = (e, name, count, room) => {
        e.preventDefault();
        let comp = new Scorocode.Object("equipment");
        comp.set("name", name);
        comp.set("room", room); // значение поля id комнаты
        comp.set("count", count);
        comp.save().then(() => {
            // console.info("Done");
            store.dispatch(updateScorocode());

        });
    };

    changeName = (e) => {
        store.dispatch(actionChangeFormName(e.target.value));
    };
    changeCount = (e) => {
        if (isNaN(e.target.value)) return;
        store.dispatch(actionChangeFormCount(+e.target.value));
    };


}