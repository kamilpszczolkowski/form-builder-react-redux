import React, { Component } from "react";
import { FormService } from "../services/FormService";

export class FBSubInput extends Component {
  handleChange(type, event) {
    const { object, parent, updateFunction, connectedDb } = this.props;

    FormService.handleSubInputChange(
      type,
      object.id,
      parent,
      event.target.value,
      newInput => {
        updateFunction(connectedDb, { ...newInput });
      }
    );
  }

  handleDeleteBttn() {
    const { parent, object, updateFunction, connectedDb } = this.props;
    FormService.deleteSubInput(object.id, parent, newInput => {
      updateFunction(connectedDb, { ...newInput });
    });
  }

  handleAddSubinputBttn() {
    const { parent, object, updateFunction, connectedDb } = this.props;
    FormService.createSubInput(object.id, parent, newInput => {
      updateFunction(connectedDb, { ...newInput });
    });
  }

  conditionHelperFunc() {
    const { object, parentType } = this.props;
    if (parentType === "text") {
      return (
        <div className="conditionContainer">
          <select
            className="inputCondition"
            name="type"
            value={object.condition}
            onChange={event => this.handleChange("condition", event)}
          >
            <option value="equals">Equals</option>
          </select>
          <input
            name="condition"
            className="inputConditionVal"
            type="text"
            value={object.conditionValue}
            onChange={event => this.handleChange("conditionValue", event)}
          />
        </div>
      );
    } else if (parentType === "yes_no") {
      return (
        <div className="conditionContainer">
          <select
            className="inputCondition"
            name="type"
            value={object.condition}
            onChange={event => this.handleChange("condition", event)}
          >
            <option value="equals">Equals</option>
          </select>
          <select
            className="inputConditionVal"
            name="type"
            value={object.conditionValue}
            onChange={event => this.handleChange("conditionValue", event)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      );
    }
    return (
      <div className="conditionContainer">
        <select
          className="inputCondition"
          name="type"
          value={object.condition}
          onChange={event => this.handleChange("condition", event)}
        >
          <option value="equals">Equals</option>
          <option value="greater">Greater than</option>
          <option value="less">Less than</option>
        </select>
        <input
          name="condition"
          className="inputConditionVal"
          type="number"
          value={object.conditionValue}
          onChange={event => this.handleChange("conditionValue", event)}
        />
      </div>
    );
  }

  render() {
    const { question, type, subinputs } = this.props.object;
    const { updateFunction, connectedDb, parent } = this.props;
    return (
      <div className="biggerMarginLeft">
        <div className="fbInput">
          <label>
            <span className="question">Condition:</span>
            {this.conditionHelperFunc()}
          </label>
          <label>
            <span className="question">Question:</span>
            <input
              name="question"
              className="inputQuestion"
              type="text"
              value={question}
              onChange={event => this.handleChange("question", event)}
            />
          </label>
          <label>
            <span className="question">Type:</span>
            <select
              className="inputQuestion"
              name="type"
              value={type}
              onChange={event => this.handleChange("type", event)}
            >
              <option value="text">Text</option>
              <option value="yes_no">Yes or No</option>
              <option value="number">Number</option>
            </select>
          </label>
          <button
            type="button"
            className="subInputBttn"
            onClick={this.handleAddSubinputBttn.bind(this)}
          >
            Create Subinput
          </button>
          <button
            type="button"
            className="deleteBttn"
            onClick={this.handleDeleteBttn.bind(this)}
          >
            Delete
          </button>
        </div>
        {subinputs.map(subinput => {
          return (
            <FBSubInput
              key={subinput.id}
              object={subinput}
              updateFunction={updateFunction}
              connectedDb={connectedDb}
              parentType={type}
              parent={parent}
            />
          );
        })}
      </div>
    );
  }
}
