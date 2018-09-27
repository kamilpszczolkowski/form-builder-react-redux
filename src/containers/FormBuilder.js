import React, { Component } from "react";
import { connect } from "react-redux";
import {
  openDatabase,
  inputCreate,
  inputUpdate,
  inputDelete
} from "../store/inputs/actions";
import * as inputsSelectors from "../store/inputs/reducer";
import { FBInput } from "../components/FBInput";
import "./FormBuilder.css";

class FormBuilder extends Component {
  componentDidMount() {
    this.props.openDatabase();
  }

  handleAddInput() {
    const { inputCreate, connectedDb, inputs } = this.props;
    inputCreate(connectedDb, inputs);
  }

  render() {
    const { inputs, inputUpdate, connectedDb, inputDelete } = this.props;
    return (
      <div>
        <h2>Form Builder</h2>
        {inputs.map(input => {
          return (
            <FBInput
              key={input.id}
              object={input}
              updateFunction={inputUpdate}
              connectedDb={connectedDb}
              deleteFunction={inputDelete}
            />
          );
        })}
        <button
          type="button"
          id="add_input_bttn"
          onClick={this.handleAddInput.bind(this)}
        >
          Add input
        </button>
      </div>
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
  return { openDatabase, inputCreate, inputUpdate, inputDelete };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(FormBuilder);
