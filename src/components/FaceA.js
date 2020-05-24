import React, { Component } from "react";
import DisplayArea from "./DisplayArea";
import InputCodeArea from "./InputCodeArea";

export class FaceA extends Component {
  state = {
    codeInput: "",
    data: null,
    history: [],
    dataType: null,
    restString: "",
    varValue: null,
    varSize: null,
    varName: null,
    autoSpace: false,
    autoValue: false
  };

  //this function examins input and calls proper function.
  handleInput = async e => {
    var { varName, dataType } = this.state;
    var { name, value } = e.target;
    this.setState({
      [name]: value
    });

    // VALIDATE DATA TYPE
    await this.validateFirst(value);
    await this.validateSecond();

    //VALIDATE VARIABLE NAME
    if (dataType != null) {
      var varNameStart = value.replace(dataType, "");
      await this.varName(varNameStart);

      //SET VAR VALUE AND AUTOSPACE
      if (varName != null && !varName.endsWith(";")) {
        var varValueStart = value.replace(dataType + varName + " = ", "");
        this.varValue(varValueStart);

        //END LINE WITH ';'
        if (value.endsWith(";") && this.state.varName) {
          this.endSentence();
        }
      }
    }
  };

  //Validate second data type for example: long int, short int.
  validateSecond() {
    var { dataType } = this.state;
    if (
      dataType === "long " ||
      dataType === "short " ||
      dataType === "signed " ||
      dataType === "unsigned "
    ) {
      var { codeInput } = this.state;
      var secondTypeStart = codeInput.replace(dataType, "");
      const dataTypes = [
        /^int\s/,
        /^unsigned\s/,
        /^signed\s/,
        /^float\s/,
        /^double\s/,
        /^char\s/,
        /^boolean\s/,
        /^string\s/,
        /^short\s/,
        /^long\s/
      ];
      var type = null;
      //second data type in expected
      for (var i = 0; i < dataTypes.length; i++) {
        var a = dataTypes[i].exec(secondTypeStart);
        if (a) {
          type = String(a);
        }
      }
      this.setState({ dataType: this.state.dataType + type });
    }
  }

  //push inputs to state.history and set other values to null
  endSentence() {
    var { varSize, codeInput, varName, dataType, varValue } = this.state;
    var historyValue = this.state.history.slice();
    historyValue.push({
      line: codeInput,
      varName: varName,
      dataType: dataType,
      varValue: varValue,
      varSize: varSize
    });
    this.setState({
      autoSpace: false,
      history: historyValue,
      codeInput: "",
      varName: null,
      dataType: null,
      varValue: null,
      varSize: null
    });
  }

  //test var value
  varValue(s) {
    // test if the var value matches the correct type
    this.setState({ varValue: s });
  }

  //test var name
  varName(s) {
    var randomValue = this.randomValGen().varValue;
    var varSize = this.randomValGen().size;
    var reVarName = /^\w+\s+$/;
    var a = reVarName.exec(s);
    // var ame end with space
    if (a) {
      this.setState({
        varName: String(a),
        autoSpace: false
      });
      if (!this.state.autoSpace) {
        this.setState({
          codeInput: this.state.codeInput + " = " + randomValue,
          autoSpace: true,
          varValue: randomValue,
          varSize: varSize
        });
      }
      return null;
    }
    var reVarName2 = /^\w+/;
    var reVarName3 = /=/;
    //var anme end with ';'
    if (reVarName2.exec(s) && s.endsWith(";") && s.search(reVarName3) === -1) {
      s = s.slice(0, -1);
      this.setState({ varName: s });
      var historyValue = this.state.history.slice();
      historyValue.push({
        line: this.state.codeInput,
        varName: s,
        dataType: this.state.dataType,
        varValue: this.state.varValue
      });
      this.setState({
        autoSpace: false,
        history: historyValue,
        codeInput: "",
        varName: null,
        dataType: null,
        varValue: null
      });
    }
  }

  validateFirst(str) {
    const dataTypes = [
      /^int\s/,
      /^unsigned\s/,
      /^signed\s/,
      /^float\s/,
      /^double\s/,
      /^char\s/,
      /^bool\s/,
      /^string\s/,
      /^short\s/,
      /^long\s/
    ];
    var type = null;
    //loop through datatypes and find exact match using .exec()
    for (var i = 0; i < dataTypes.length; i++) {
      var a = dataTypes[i].exec(str);
      if (a) {
        //if match is found set the data type.
        type = String(a);
        this.setState({ dataType: type });
      }
    }
  }
  //random number generator from Mozila.
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getRandomChar(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // set random value and the size of the data
  randomValGen() {
    var type = this.state.dataType;
    var varValue = null;
    var size = null;
    switch (type) {
      case "int ": //range: 32767
        varValue = this.getRandomInt(-32767, 32767).toString();
        size = 4;
        break;
      case "short int ": //range: 32767
        varValue = this.getRandomInt(-32767, 32767).toString();
        size = 2;
        break;
      case "long int ":
        varValue = this.getRandomInt(-2147483647, 2147483647).toString();
        size = 32;
        break;
      case "unsigned int ": //range 0,65535
        varValue = this.getRandomInt(0, 65535).toString();
        size = 4;
        break;
      case "float ":
        varValue =
          this.getRandomInt(0, 20).toString() +
          "." +
          this.getRandomInt(0, 200).toString();
        size = 4;
        break;
      case "double ":
        varValue =
          this.getRandomInt(-32767, 32767).toString() +
          "." +
          this.getRandomInt(0, 32767).toString();
        size = 8;
        break;
      case "long double ":
        varValue =
          this.getRandomInt(-2147483647, 2147483647).toString() +
          "." +
          this.getRandomInt(0, 32767).toString();
        size = 12;
        break;
      case "string ":
        varValue = '"' + this.getRandomChar(this.getRandomInt(1, 10)) + '"';
        break;
      case "char ":
        varValue = this.getRandomChar(1);
        size = 1;
        break;
      case "unsigned char ":
        varValue = this.getRandomChar(1);
        size = 1;
        break;
      case "bool ":
        this.getRandomInt(0, 1) === 0
          ? (varValue = "false")
          : (varValue = "true");

        size = 1;
        break;
      default:
        varValue = "null";
        size = 0;
    }
    return { size, varValue };
  }

  //this helper function uses React SyntheticEvent helps handleInput() to recognize keyboard "Backspace"
  handleDelete = event => {
    if (event.key === "Backspace") {
      if (this.state.codeInput.slice(-1) === "=") {
        let str = this.state.codeInput.slice(0, -2);
        this.setState({ codeInput: str });
      }
    }
  };

  render() {
    // const {dataType, varValue, varName} = this.state;
    // const values = {dataType, varValue, varName}
    return (
      <div className="faceDisplay">
        <DisplayArea history={this.state.history} />
        <InputCodeArea
          code={this.state.codeInput}
          handleInput={this.handleInput}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default FaceA;
