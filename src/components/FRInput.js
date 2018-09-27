import React, { Component } from "react";
import "./FRInput.css";

export class FRInput extends Component {
  handleInputChange(event) {
    const { updateFunction, connectedDb, object } = this.props;
    updateFunction(connectedDb, { ...object, value: event.target.value });
  }

  inputTypeHelperFunc() {
    const { type, value, id } = this.props.object;
    if (type === "text") {
      return (
        <input
          type="text"
          className="frInputText"
          value={value}
          onChange={this.handleInputChange.bind(this)}
        />
      );
    } else if (type === "number") {
      return (
        <input
          type="number"
          className="frInputText"
          value={value}
          onChange={this.handleInputChange.bind(this)}
        />
      );
    }

    return (
      <div className="frYesNo">
        <div className="frRadio">
          <input
            name={id}
            type="radio"
            value="yes"
            onChange={this.handleInputChange.bind(this)}
          />
          <span>Yes</span>
        </div>
        <div className="frRadio">
          <input
            name={id}
            type="radio"
            value="no"
            onChange={this.handleInputChange.bind(this)}
          />
          <span>No</span>
        </div>
      </div>
    );
  }

  render() {
    const { object } = this.props;
    return (
      <div className="frInput">
        <span className="frQuestion">{object.question}</span>
        {this.inputTypeHelperFunc()}
      </div>
    );
  }
}
