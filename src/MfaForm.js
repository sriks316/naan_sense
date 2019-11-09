// src/LoginForm.js
//import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import LoginForm from './LoginForm';

export default withAuth(class MfaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      userid: this.props.userid,
      factorid: this.props.factorid,
      stateToken: this.props.stateToken,
      mfaRequired: false,
      mfaValidated: false,
      mfa: '',
      authenticated: null
    }

    this.oktaAuth = new OktaAuth({ url: "https://dev-254942.okta.com" });

    this.handleMfaSubmit = this.handleMfaSubmit.bind(this);
    this.handleMfaChange = this.handleMfaChange.bind(this);
  }


  handleMfaChange(e) {
    this.setState({mfa: e.target.value});
  }

  async handleMfaSubmit() {
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
        console.log (response.statusText);
      } else {
          const response_json = await response.json();
          console.log(response_json);
          debugger;
          this.setState({ sessionToken: response_json.sessionToken });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // // handleMfaSubmit(e) {
  // //   e.preventDefault();
  //   fetch("http://localhost:3002/api/v1/authn/factors/" + this.state.factorid + "/verify", {
  //     method: 'POST',
  //     headers: new Headers({
  //        'Accept': 'application/json',
  //        'Content-Type': 'application/json'
  //       }),
  //      body: JSON.stringify({
  //       "passCode": this.state.mfa,
  //       "stateToken": this.state.stateToken
  //     })
  //   })
  //   .then(res => {
  //     if (res.status == 200) {
  //       console.log(res.status); 
  //       console.log(res.json());
  //       debugger;

  //       // this.setState({
  //       //   sessionToken: res.sessionToken
  //       // })
  //     } else {
  //         this.setState({
  //           sessionToken: res.sessionToken
  //         })
  //         console.log(res);
  //     }
  //   })
  // }
        render() {
          if (!this.state.sessionToken) {
            return (
              <form className="col-md-8 col-md-offset-8" onSubmit={this.handleMfaSubmit}>
                <div className='form-group w-25'> 
                  <label>MFA CODE </label>
                      <input className="form-control"
                        id="mfa" type="text" 
                        onChange={this.handleMfaChange}/>
                </div>
                <input id="submit" type="submit" value="Submit" />

              </form>
            );
          } 
            else if (this.state.sessionToken) {
              debugger;
              this.props.auth.redirect({sessionToken: this.state.sessionToken});
              return null;
          } 

        }
      z
});
