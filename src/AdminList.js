// src/Home.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { Row, Col, NavDropdown, Container, NavbarBrand, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import AdminLanding from './AdminLanding';
import UserLanding from './UserLanding';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: null, isAdmin: false };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    const userinfo = await this.props.auth.getUser();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated: authenticated, userinfo: userinfo, isAdmin: userinfo.groups.includes('Admin') });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;

    else if(this.state.authenticated && this.state.isAdmin) {
        return ( <AdminLanding userinfo={this.state.userinfo} /> );
    }
  }
});
