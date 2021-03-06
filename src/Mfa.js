// src/Login.js

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
//import MfaForm from './MfaForm';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Mfa extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;
    return this.state.authenticated ?
      <Redirect to={{ pathname: '/' }}/> :
      <LoginForm baseUrl={"http://localhost:3000"l} />;
  }
});
