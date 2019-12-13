
import React from "react";
import { FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import { Form, Radio, Input } from 'semantic-ui-react'

export class FormInput extends React.Component {
  render() {
    return (
          <FormGroup>
            <ControlLabel>{this.props.label} </ControlLabel>
            <FormControl
              type={this.props.type}
              bsClass={this.props.bsClass}
              placeholder={this.props.placeholder}
              defaultValue={this.props.value} 
              style={this.props.style}
              disabled={this.props.disabled}
              componentClass={this.props.componentClass}
              rows={this.props.rows}/>
          </FormGroup>
    )
  }
}

export default FormInput;
