import React from 'react';
import { connect } from 'react-redux';
import AddEquipment from "../Components/Equipment/AddEquipment";

function AddEquipmentContainer(props) {
    return (
        <AddEquipment state={props} />
    )
}
const mapStateToProps = function(state) {
    return {
        formAddEquipment: state.formAddEquipment,
    }
};

export default connect(mapStateToProps)(AddEquipmentContainer);