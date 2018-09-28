import React, { Component } from "react";
import { FormService } from "../services/FormService";

export class FRSubInput extends Component {
  SubVisibleHelperFunc() {
    const { parent, object } = this.props;
    if (parent.type === "text" || parent.type === "yes_no") {
      return parent.value === object.conditionValue;
    }

    if (object.condition === "equals") {
      return parent.value === object.conditionValue;
    } else if (object.condition === "greater") {
      return parent.value > object.conditionValue;
    }
    return parent.value < object.conditionValue;
  }

  handleChange(type, event) {
    const { object, origin, updateFunction, connectedDb } = this.props;

    FormService.handleSubInputChange(
      type,
      object.id,
      origin,
      event.target.value,
      newInput => {
        updateFunction(connectedDb, { ...newInput });
      }
    );
  }

  inputTypeHelperFunc() {
    const { type, value, id } = this.props.object;
    if (type === "text") {
      return (
        <input
          type="text"
          className="frInputText"
          value={value}
          onChange={event => this.handleChange("value", event)}
        />
      );
    } else if (type === "number") {
      return (
        <input
          type="number"
          className="frInputText"
          value={value}
          onChange={event => this.handleChange("value", event)}
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
            onChange={event => this.handleChange("value", event)}
          />
          <span>Yes</span>
        </div>
        <div className="frRadio">
          <input
            name={id}
            type="radio"
            value="no"
            onChange={event => this.handleChange("value", event)}
          />
          <span>No</span>
        </div>
      </div>
    );
  }

  render() {
    const { question, subinputs } = this.props.object;
    const { object, connectedDb, updateFunction, origin } = this.props;
    if (this.SubVisibleHelperFunc()) {
      return (
        <div>
          <div className="frInput">
            <span className="frQuestion">{question}</span>
            {this.inputTypeHelperFunc()}
          </div>
          {subinputs.map(subinput => {
            return (
              <FRSubInput
                key={subinput.id}
                object={subinput}
                updateFunction={updateFunction}
                connectedDb={connectedDb}
                parent={object}
                origin={origin}
              />
            );
          })}
        </div>
      );
    }
    return null;
  }
}
