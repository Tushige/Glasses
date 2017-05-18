/*******************************************************************************
 *  @file InputField.js
 *  A form field used by user registration Forms
 *  Forms : Signup, Signin, Verification
 ******************************************************************************/
import React from 'react';
import {
    FormControl,
    FormGroup,
    HelpBlock,
    strong,
} from 'react-bootstrap';
import './InputField.css';

export default function InputField(props) {
    let err = null;
    if (props.showError) {
        err = <HelpBlock className="error-msg">{props.errorMsg}</HelpBlock>;
    }
    return (
        <div className="inputField-container">
            <FormGroup
                validationState={props.validationState()}>
                <div className="input-group margin-bottom-sm">
                    <span className="input-group-addon">
                        {props.icon}
                    </span>
                    <FormControl className="input-field"
                        type={props.type}
                        value={props.value}
                        placeholder={props.placeholder}
                        onChange={props.onChange}>
                    </FormControl>
                </div>
                {err}
                <FormControl.Feedback />
            </FormGroup>
        </div>
    )
}
