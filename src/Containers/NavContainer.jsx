import React from 'react';
import { connect } from 'react-redux';
import Nav from "../Components/Nav/Nav";

function NavContainer(props) {
    return (
        <Nav state={props} />
    )
}
const mapStateToProps = function(state) {
    return {
        outputBuildings: state.outputBuildings,
        equipment: state.equipment,
    }
};

export default connect(mapStateToProps)(NavContainer);