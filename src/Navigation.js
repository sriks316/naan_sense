import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { Navbar, NavItem, NavDropdown, Container, NavbarBrand, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default withAuth(class Navigation extends React.Component {
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
     
    if (this.state.authenticated) {
      return (
        <React.Fragment>
          <Navbar className='nav-color' >
            <Navbar href="#home">NaanSense</Navbar>
            <Nav className="mr-auto">
              <Nav.Link onClick={() => {this.props.auth.login()}}>Login</Nav.Link>
              <Nav.Link href='/profile'>Profile</Nav.Link>
              <Nav.Link href='/messagelist'>My List</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>

          </Navbar>
            <div className="fixed-bottom">  
            <section className='section-main'>
              <h4 align='center'>Naan Sense - The Food Podcast</h4>
              <div className='no-margin'>Hear from food writers around the world who have been there, eaten that and know that there is no love more sincere than the love of food.</div>
            </section>
            </div>

        </React.Fragment>
      )
    } else {
        return (
          <React.Fragment>
            <Navbar className='nav-color' >
              <Navbar href="#home">NaanSense</Navbar>
              <Nav className="mr-auto">
                <Nav.Link onClick={() => {this.props.auth.login()}}>Login</Nav.Link>
                <Nav.Link href='/registerpage'>Register</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>

            </Navbar>

          </React.Fragment>
        )     
      }
    

  }
});