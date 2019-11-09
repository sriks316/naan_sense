// src/Login.js

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: {} };
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

    if (this.state.authenticated) {
       return ( <Redirect to={ { pathname: '/' }, { userinfo: this.state.userinfo } }/>);
    } else {
      return (<LoginForm baseUrl={this.props.baseUrl} />);
    }
  }
});
