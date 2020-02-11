import React, { Component } from 'react'

export class DisplayArea extends Component {

  
  

  render() {
    var varName, varValue, varType;
    var data = this.props.history;
    var len = data.length;
    var dataToShow = data[len-1]
    if(dataToShow){
      varName = dataToShow.varName;
      varValue = dataToShow.varValue;
      varType = dataToShow.dataType;
     
    }
    return (
      <div>
        <p>Currently, this project only detectes C++ syntax, and store the data in State. I am looking to team with someone who is good at CSS animation or D3 JS</p>
        <p> </p>
        <ul>
          <li>Variable Name:  {varName}</li>
          <li>Data Type:  {varType}</li>
          <li>Value:  {varValue}</li>
        </ul> 
      </div>
    )
  }
}

export default DisplayArea
