import React, { Component } from "react";
import FormBuilder from "./containers/FormBuilder";
import FormResult from "./containers/FormResult";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="col">
          <FormBuilder />
        </div>
        <div className="col">
          <FormResult />
        </div>
      </div>
    );
  }
}
