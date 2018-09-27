import React, { Component } from "react";
import "./FBInput.css";

export class FBInput extends Component {
  handleInputChange(event) {
    const { updateFunction, connectedDb, object } = this.props;
    updateFunction(connectedDb, { ...object, question: event.target.value });
  }

  handleSelectChange(event) {
    const { updateFunction, connectedDb, object } = this.props;
    updateFunction(connectedDb, { ...object, type: event.target.value, value: "" });
  }

  handleDeleteClick() {
    const { deleteFunction, connectedDb, object } = this.props;
    deleteFunction(connectedDb, object.id);
  }

  render() {
    const { question, type } = this.props.object;
    return (
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
          className="deleteBttn"
          onClick={this.handleDeleteClick.bind(this)}
        >
          Delete Input
        </button>
      </div>
    );
  }
}
