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
    this.state = { authenticated: null, userinfo: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    const userinfo = await this.props.auth.getUser();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated: authenticated, userinfo: userinfo });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;
    if(this.state.authenticated && this.state.userinfo.groups.includes("Everyone")) {
        return ( <UserLanding userinfo={this.state.userinfo} /> );
    } else {
      return ( <div> Not allowed </div> );
    }
  }
});
