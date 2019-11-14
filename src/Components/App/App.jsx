import React from 'react';
import style from './App.module.scss';
import Scorocode from "../../lib/scorocode";
import {store} from "../../redux/store";
import {updateScorocode} from "../../redux/action";
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

    initApp = () => {
        Scorocode.Init({
            ApplicationID: "3196b2e873234547ad8b06ed636d3538",
            JavaScriptKey: "5e85f685a23e44e6abad95accc1dd2ea",
            MasterKey: "659d718ff9664f6fafbdb79efc93cb34"
        });
        store.dispatch(updateScorocode());
    };
}