import React, { Component } from 'react'

export class InputCodeArea extends Component {

  render() {
    return (
    <div className="inputCodeArea">
      <input 
      className="defaultTextBox" 
      type="text" id="codeInput" 
      name="codeInput" 
      placeholder="Your c++ code.."
      value= {this.props.code}
      onChange={this.props.handleInput}
      ></input>
      </div>
    )
  }
}

export default InputCodeArea
