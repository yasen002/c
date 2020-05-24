import React, { Component } from "react";

//this component displays the values that that has gotten from interFaceA
export class DisplayArea extends Component {
  render() {
    var varName, varValue, varType, varSize;
    var data = this.props.history;

    var len = data.length;
    var dataToShow = data[len - 1];
    if (dataToShow) {
      varName = dataToShow.varName;
      varValue = dataToShow.varValue;
      varType = dataToShow.dataType;
      varSize = dataToShow.varSize;
    }

    return (
      <div>
        <p>
          this is a program that detects user input and translates it into C
          languate. writen in vanilla JS using React framework without any C
          language node package.
        </p>
        <ul>
          <li>Variable Name: {varName}</li>
          <li>Data Type: {varType}</li>
          <li>Value: {varValue}</li>
          <li>variable size: {varSize}</li>
        </ul>
      </div>
    );
  }
}

export default DisplayArea;
