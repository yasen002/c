// import React, { Component } from 'react'
// import DisplayArea from './DisplayArea';
// import InputCodeArea from './InputCodeArea';

export class FaceA extends Component {
  state={
    codeInput:"",
    data:null,
    history:[],
    dataType:null,
    restString:"",
    varValue:null,
    varName:null,
    autoSpace:false,
    autoValue:false,
    typeModifire:false
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
//END LINE 
    if(value.endsWith(";") && this.state.varName){
      console.log("ending sentence");
      this.endSentence();
    }


    
  }

//Validate second
  validateSecond(){
    var {dataType}= this.state
    if(dataType==="long " || dataType==="short " ||dataType==="signed "||dataType==="unsigned "){
      console.log("second var type expected");
     }
  }

//end sentence wit ';'
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
    varValue:null     
  })
}

//test var value
varValue(s){
  this.setState({varValue: s});
  //check data type
}

//test var name
  varName(s){
    var randomValue = this.randomValGen()
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
          varValue: randomValue
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
//manage how the second word of the var type works.
// [/^short\s/, /^char\s/, /^int\s/, /^long\s/,/^unsigned\s/,/^double\s/,]
  validateFirst(str){
    const dataTypes = [/^int\s/, /^unsigned\s/, /^signed\s/,  /^float\s/, /^double\s/, /^char\s/, /^boolean\s/, /^string\s/,/^short\s/, /^long\s/];
    // const seCondType = [/^short\s/, /^unsigned\s/, /^signed\s/, /^long\s/]
    var type = null
    for(var i=0; i<dataTypes.length; i++){
      var a = dataTypes[i].exec(str);
      if(a){
        type = String(a); 
      }
    }
      this.setState({dataType:type, typeModifire: true});
  }

  randomValGen(){
    var type = this.state.dataType;
    switch(type){
      case 'int ':
      return "123";
      case "string ":
      return "yasen";
      default:
      return null;
    }
  }


  render() {
    console.log("state: ", this.state)
    const {dataType, varValue, varName} = this.state;
    const values = {dataType, varValue, varName}
    return (
      <div className="faceDisplay" >
        <DisplayArea  values={values} code={this.state.codeInput} />
        <InputCodeArea code={this.state.codeInput} handleInput={this.handleInput}/>
      </div>
    )
  }
}

export default FaceA
