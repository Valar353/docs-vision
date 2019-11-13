import React from 'react';
import { connect } from 'react-redux';
import Equipment from "../Components/Equipment/Equipment";

function EquipmentContainer(props) {
    return (
        <Equipment state={props} />
    )
}
const mapStateToProps = function(state) {
    return {
        equipment: state.equipment,
        outputEquipment: state.outputEquipment,
        selectEquipment: state.selectEquipment,
    }
};

export default connect(mapStateToProps)(EquipmentContainer);