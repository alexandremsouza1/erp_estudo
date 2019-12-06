
import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Row } from "react-bootstrap";

export class FormInput extends React.Component {
  render() {
    return (
      <Row>
        <div className={this.props.ncols}>
          <FormGroup>
            <ControlLabel>{this.props.label} </ControlLabel>
            <FormControl
              type={this.props.type}
              bsClass={this.props.bsClass}
              placeholder={this.props.placeholder}
              defaultValue={this.props.value} 
              style={this.props.style}/>
          </FormGroup>
        </div>
      </Row>
    )
  }
}

export default FormInput;
