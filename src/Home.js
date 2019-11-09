// src/Home.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { Row, Col, NavDropdown, Container, NavbarBrand, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { Redirect } from 'react-router-dom';
import AdminList from './AdminList';
import UserLanding from './UserLanding';

export default withAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: {} };
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
    if (this.state.authenticated && this.state.userinfo.groups.includes("Admin")) {
      return ( <Redirect to={ { pathname: '/adminlist' } }/>);
    } else if(this.state.authenticated) {
        return ( <Redirect to={ { pathname: '/mylist' } }/>);
    } else {
        return (

        <React.Fragment>
          <section className="section-grey">
            <h4 align='center'>Naan Sense - The Food Podcast</h4>
            <div align='center'><strong>Hear from food writers around the world who have been there, eaten that and know that there is no love more sincere than the love of food</strong></div>
          </section>
          <section className="section-beige">
            <div align ='center'> <Link to='/registerpage'>Sign up for more free audios, newsletters and more</Link><br/></div>
            <div align ='center'> Already have an account? <Link to='/login'>Please click here to Login</Link></div>
              <div className="container">
                <div className="card-deck mb-3 text-center">
                  <div className="card mb-4 shadow-sm">
                    <div className="card-header">
                      <h4 className="my-0">This Week</h4>
                      <h4> </h4>
                    </div>
                    <div align='center' className="card-body">
                      <ul className="list-unstyled mt-3 mb-4">
                        <li><ReactPlayer url='https://soundcloud.com/food-heaven-podcast/how-to-separate-working-out' width= '80%' height = '80%' /></li>
                        <li><ReactPlayer url='https://soundcloud.com/tffpodcast/random16' width= '80%' height = '80%' /></li>                        
                      </ul>
                    </div>
                  </div>
                  <div className="card mb-4 shadow-sm">
                    <div className="card-header">
                      <h5 className="my-0 font-weight-normal">Last Week</h5>
                      <h4 className="my-0 font-weight-normal"><a className='nav-color' href="/registerpage"> Signup for more </a></h4>
                    </div>
                    <div align='center'className="card-body disabled">
                      <ul className="list-unstyled mt-3 mb-4">
                        <li><ReactPlayer url='https://soundcloud.com/halfhourintern/americas-fittest-trucker-with-siphiwe-baleka' width= '80%' height = '80%' /></li>
                        <li><ReactPlayer url='https://soundcloud.com/food-heaven-podcast/how-to-separate-working-out' width= '80%' height = '80%' /></li>
                      </ul>
                    </div>
                  </div>
                  <div className="card mb-4 shadow-sm">
                    <div className="card-header">
                      <h5 className="my-0 font-weight-normal">Special Guest Edition</h5>
                      <h4 className="my-0 font-weight-normal"><a className='nav-color' href="/registerpage"> Signup for more </a></h4>
                    </div>
                    <div align='center' className="card-body disabled">
                      <ul className="list-unstyled mt-3 mb-4">
                        <li><ReactPlayer url='https://soundcloud.com/halfhourintern/americas-fittest-trucker-with-siphiwe-baleka' width= '80%' height = '80%' /></li>
                        <li><ReactPlayer url='https://soundcloud.com/food-heaven-podcast/how-to-separate-working-out' width= '80%' height = '80%' /></li>  
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    </React.Fragment>

      );      
    }
  }
});
