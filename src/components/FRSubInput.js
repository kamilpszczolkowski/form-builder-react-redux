import React, { Component } from "react";
import { FormService } from "../services/FormService";

export class FRSubInput extends Component {
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
    const { object, connectedDb, updateFunction, origin, parent } = this.props;
    if (FormService.isInputVisible(parent, object)) {
      return (
        <div>
          <div className="frInput">
            <label>
              <span className="frQuestion">{question}</span>
              {this.inputTypeHelperFunc()}
            </label>
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
