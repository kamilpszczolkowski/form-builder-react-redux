import React, { Component } from "react";
import { FormService } from "../services/FormService";
import { FBSubInput } from "./FBSubInput";
import "./FBInput.css";

export class FBInput extends Component {
  handleInputChange(event) {
    const { updateFunction, connectedDb, object } = this.props;
    updateFunction(connectedDb, { ...object, question: event.target.value });
  }

  handleSelectChange(event) {
    const { updateFunction, connectedDb, object } = this.props;
    updateFunction(connectedDb, {
      ...object,
      type: event.target.value,
      value: ""
    });
  }

  handleDeleteClick() {
    const { deleteFunction, connectedDb, object } = this.props;
    deleteFunction(connectedDb, object.id);
  }

  handleCreateSubinputClick() {
    const { updateFunction, connectedDb, object } = this.props;
      updateFunction(connectedDb, {
      ...object,
      subinputs: FormService.createFirstSubinput(object.subinputs, object.id, object.type)
    });
  }

  render() {
    const { question, type, subinputs } = this.props.object;
    const { updateFunction, connectedDb, object } = this.props;
    return (
      <div>
        <div className="fbInput">
          <span className="question">Question:</span>
          <input
            name="question"
            className="inputQuestion"
            type="text"
            value={question}
            onChange={this.handleInputChange.bind(this)}
          />
          <span className="question">Type:</span>
          <select
            className="inputQuestion"
            name="type"
            value={type}
            onChange={this.handleSelectChange.bind(this)}
          >
            <option value="text">Text</option>
            <option value="yes_no">Yes or No</option>
            <option value="number">Number</option>
          </select>
          <button
            type="button"
            className="subInputBttn"
            onClick={this.handleCreateSubinputClick.bind(this)}
          >
            Create Subinput
          </button>
          <button
            type="button"
            className="deleteBttn"
            onClick={this.handleDeleteClick.bind(this)}
          >
            Delete
          </button>
        </div>
          {subinputs.map(subinput => {
              return <FBSubInput
                  key={subinput.id}
                  object={subinput}
                  updateFunction={updateFunction}
                  connectedDb={connectedDb}
                  parentType={type}
                  parent={object}
              />
          })}
      </div>
    );
  }
}
