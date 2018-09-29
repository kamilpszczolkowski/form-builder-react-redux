import React, { Component } from "react";
import { connect } from "react-redux";
import * as inputsSelectors from "../store/inputs/reducer";
import { inputUpdate } from "../store/inputs/actions";
import { FRInput } from "../components/FRInput";

class FormResult extends Component {
  render() {
    const { inputs, connectedDb, inputUpdate } = this.props;
    return (
      <form>
        <h2>Result form</h2>
        {inputs.map(input => {
          return (
            <FRInput
              key={input.id}
              object={input}
              updateFunction={inputUpdate}
              connectedDb={connectedDb}
            />
          );
        })}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    inputs: inputsSelectors.getInputs(state),
    connectedDb: inputsSelectors.getConnectedDb(state)
  };
}

function mapDispatchToProps() {
  return { inputUpdate };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(FormResult);
