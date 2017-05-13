/*
 * This file contains a component that describes how a single Form field looks like
 * Used By Forms
 * expects the following in its props.childProps
 *  1. textLabel
 *  2. inputType
 *  3. inputValue
 *  4. placeholder
 *  5. inputHandler
 */
import React, {Component} from 'react';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Col,
} from 'react-bootstrap';

class FormField extends Component {
    render() {
        return (
            <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                    {this.props.childProps.textLabel}
                </Col>
                <Col sm={10}>
                    <FormControl
                        type={this.props.childProps.inputType}
                        value={this.props.childProps.inputValue}
                        placeholder={this.props.childProps.placeholder}
                        onChange={(event) => this.props.childProps.inputHandler(event)}>
                    </FormControl>
                </Col>
            </FormGroup>
        )
    }
}

export default FormField;
