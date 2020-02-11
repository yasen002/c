import React, { Component } from 'react'
import DisplayArea from './DisplayArea';
import InputCodeArea from './InputCodeArea';

export class FaceA extends Component {
  state={
    codeInput:"",
    data:null,
    history:[],
    dataType:null,
    restString:"",
    varValue:null,
    varSize:null,
    varName:null,
    autoSpace:false,
    autoValue:false,
   
  }


  handleInput =async (e)=>{
    var {varName, dataType} = this.state;
    var {name, value} = e.target;
    this.setState({
      [name]:value
    })

// VALIDATE DATA TYPE 
    await this.validateFirst(value);
    await this.validateSecond();
    
//VALIDATE VARIABLE NAME
    if(dataType != null){
      var varNameStart = value.replace(dataType,'');
      await this.varName(varNameStart);
    }

//SET VAR VALUE AND AUTOSPACE
    if(varName != null && !varName.endsWith(";")){
      var varValueStart = value.replace(dataType + varName + " = ",'');
      this.varValue(varValueStart);
    }

//END LINE WITH ';'
    if(value.endsWith(";") && this.state.varName){
      this.endSentence();
    }
  }

//Validate second
  validateSecond(){
    var {dataType}= this.state
    if(dataType==="long " || dataType==="short " ||dataType==="signed "||dataType==="unsigned "){
        var {codeInput} = this.state;
        var secondTypeStart = codeInput.replace(dataType,'');
        const dataTypes = [/^int\s/, /^unsigned\s/, /^signed\s/,  /^float\s/, /^double\s/, /^char\s/, /^boolean\s/, /^string\s/,/^short\s/, /^long\s/];
        var type = null
        for(var i=0; i<dataTypes.length; i++){
          var a = dataTypes[i].exec(secondTypeStart);
          if(a){
            type = String(a); 
          }
        }
        this.setState({dataType:(this.state.dataType + type)});
        console.log("second var type expected",secondTypeStart);
    }
  }


//push inputs to state.history and set other values to null
endSentence(){
  var{codeInput, varName, dataType, varValue} = this.state;
  var historyValue = this.state.history.slice();
  historyValue.push({line:codeInput, varName:varName, dataType:dataType, varValue:varValue});
  this.setState({
    autoSpace:false,
    history:historyValue,
    codeInput:'',
    varName: null,
    dataType:null,
    varValue:null,
    varSize:null  
  })
}

//test var value
varValue(s){
  // test if the var value matches the correct type
  this.setState({varValue: s});
}

//test var name
  varName(s){
    var randomValue = this.randomValGen().varValue;
    var varSize = this.randomValGen().size;
    var reVarName = /^\w+\s+$/;
    var a = reVarName.exec(s);
    // var ame end with space
    if(a){
      this.setState({
        varName:String(a), autoSpace:false})
      if(!this.state.autoSpace){
        this.setState({
          codeInput:(this.state.codeInput + " = " + randomValue),
          autoSpace:true,
          varValue: randomValue,
          varSize:varSize
        })
      }
      return null;
    }
    var reVarName2 = /^\w+/;
    var reVarName3 = /=/;
    //var anme end with ';'
    if(reVarName2.exec(s) && s.endsWith(";") && s.search(reVarName3)===-1 ){
      s = s.slice(0,-1);
      this.setState({varName:s});
      var historyValue = this.state.history.slice();
      historyValue.push({line:this.state.codeInput, varName:s, dataType:this.state.dataType, varValue:this.state.varValue});
      this.setState({
        autoSpace:false,
        history:historyValue,
        codeInput:'',
        varName: null,
        dataType:null,
        varValue:null     
      })
    }
  }

  validateFirst(str){
    const dataTypes = [/^int\s/, /^unsigned\s/, /^signed\s/,  /^float\s/, /^double\s/, /^char\s/, /^boolean\s/, /^string\s/,/^short\s/, /^long\s/];
    var type = null
    for(var i=0; i<dataTypes.length; i++){
      var a = dataTypes[i].exec(str);
      if(a){
        type = String(a); 
      }
    }
      this.setState({dataType:type});
  }

  randomValGen(){
    // set random value and the size of the data
    var type = this.state.dataType;
    var varValue = null;
    var size = null;
    switch(type){
      case 'int ':
        varValue= "123";
        size=4;
        break;
      case "short int ":
        varValue="1";
        size=2;
        break;
      case "long int ":
        varValue="1212";
        size=8;
        break;
      case "unsigned int ":
        varValue="57";
        size=4;
        break;
      case "float ":
        varValue="1.4";
        size=4;
        break;
      case "double ":
        varValue="2342356";
        size=8;
        break;
      case "long double ":
        varValue="121223412353534";
        size=12;
        break;
      case "string ":
        varValue= "yasen";
        break;
      case "char ":
        varValue = "a";
        size=1;
        break;
      case "unsigned char ":
        varValue="i";
        size=1;
        break;
        case "bool ":
        varValue="true"
        size=1;
        break;
      default:
        varValue="null";
        size=0;        
    }
  return {size, varValue};
  }


  render() {
    console.log("state: ", this.state.history)
    // const {dataType, varValue, varName} = this.state;
    // const values = {dataType, varValue, varName}
    return (
      <div className="faceDisplay" >
        <DisplayArea  history={this.state.history}/>
        <InputCodeArea code={this.state.codeInput} handleInput={this.handleInput}/>
      </div>
    )
  }
}

export default FaceA
