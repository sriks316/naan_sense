// src/LoginForm.js
//import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
//import MfaForm from './MfaForm';

export default withAuth(class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      username: '',
      password: '',
      mfaRequired: false,
      mfaEnroll: false,
      mfa: ''
    }
    const config = {
      url: props.baseUrl
    };
    this.oktaAuth = new OktaAuth(config);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleMfaSubmit = this.handleMfaSubmit.bind(this);
    this.handleMfaChange = this.handleMfaChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth.signIn({
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      if (res.status === "SUCCESS") {
        this.setState({
          sessionToken: res.sessionToken
        }) 
      } else if (res.status === "MFA_REQUIRED")  {
          this.setState({
            mfaRequired: true,
            userid: res.user.id,
            factorid: res.factors[0].id,
            stateToken: res.data.stateToken,
            mfa: ''
        }) 
      }
    })
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleMfaChange(e) {
    this.setState({mfa: e.target.value});
  }

  async handleMfaSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/api/v1/authn/factors/" + this.state.factorid + "/verify", {
        method: 'POST',
        headers: new Headers({
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          }),
         body: JSON.stringify({
          "passCode": this.state.mfa,
          "stateToken": this.state.stateToken
        })
      })
      if (!response.ok) {
      } else {
          const response_json = await response.json();
          console.log(response_json);
          this.setState({ sessionToken: response_json.message.sessionToken });
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({sessionToken: this.state.sessionToken});
      return null;
    } 
    else if(this.state.mfaRequired) {
      return (
        <div align='center'>
          <div className='section-grey'>
            <form className="bordered col-md-4" onSubmit={this.handleMfaSubmit}>
              <h4> Multi Factor Authentication</h4><hr/>
              <div className='form-group required row'> 
                  <div className='form-group required row'> 
                    <label htmlFor="verification Code"><strong>Verification Code</strong></label>
                        <input className="form-control"
                          id="mfa" type="text"
                          onChange={this.handleMfaChange} />
                  </div>
              </div>
              <input id="submit" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      );     
    } 
    else {
      const params = new URLSearchParams(this.props.auth._history.location.search);
      const registration = params.get('registration'); 
      let registrationMessage;
      if (registration=="success") {
        registrationMessage = 
          <div class="alert alert-success">
            <strong>Success!</strong> You were successfully registered. Please Sign in with your new account.
          </div>
      }
      return (
        <div align='center'>
          {registrationMessage}
          <div className='section-grey'>
            <form className="bordered col-md-4" onSubmit={this.handleSubmit}>
              <h6>Naan sense</h6>
              <img src="logo192.png" width="100" height="50" /><br/><br/><hr/>
              <h4> Sign In </h4><hr/>
              <div className='form-group required row'> 
                <label htmlFor="username"><strong>Username</strong></label>
                    <input className="form-control"
                      id="username" type="text"
                      value={this.state.username}
                      onChange={this.handleUsernameChange} />
              </div>
              <div className='form-group row'> 
                <label><strong>Password</strong></label>
                    <input className="form-control"
                      id="password" type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange} />
                </div>
                <input className="btn btn-primary btn-lg btn-block" id="submit" type="submit" value="Sign In" /><hr/>
                <span className="registration-label">Do not have an account? <a href='/registerpage'>Sign Up</a></span> 
              </form>
            </div>
          </div>
      );
    }
  }
});

