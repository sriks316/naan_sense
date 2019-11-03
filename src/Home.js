// src/Home.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { Row, Col, NavDropdown, Container, NavbarBrand, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';

export default withAuth(class Home extends Component {
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
        <div>
          <h4> Naan Sense - The Food Podcast </h4>
          <Link to='/profile'>Profile</Link><br/>
          <Link to='/messagelist'>Message List</Link><br/>
          <button onClick={() => {this.props.auth.logout()}}>Logout</button>

        </div>
      );
    } else {
      return (
        <React.Fragment>
          <section className="section-grey">
            <h4 align='center'>Naan Sense - The Food Podcast</h4>
            <div align='center'><strong>Hear from food writers around the world who have been there, eaten that and know that there is no love more sincere than the love of food</strong></div>
          </section>
          <section className="section-beige">
            <div align='center'>Free preview</div>
            <div align ='center'> <Link to='/registerpage'>Sign up for more free audios</Link><br/></div>
          <div align ='center'>
            <ReactPlayer url='https://soundcloud.com/internetmoneypodcast/internet-money-somebody-feat-lil-tecca-a-boogie-wit-da-hoodie' />
          </div>
          <div align ='center'> Already have an account? <Link to='/login'>Please click here to Login</Link></div>
          </section>
        </React.Fragment>
      );      
    }
  }
});
