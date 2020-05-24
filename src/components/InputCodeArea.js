import React, { Component } from "react";

export class InputCodeArea extends Component {
  render() {
    return (
      <div className="inputCodeArea">
        <input
          className="textBox"
          type="text"
          id="codeInput"
          name="codeInput"
          placeholder="Your c++ code..."
          value={this.props.code}
          onChange={this.props.handleInput}
          onKeyDown={this.props.handleDelete}
        ></input>
      </div>
    );
  }
}

export default InputCodeArea;
