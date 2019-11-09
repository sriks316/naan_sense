import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { Navbar, NavItem, NavDropdown, Container, NavbarBrand, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';

export default withAuth(class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null, userinfo: {} };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    const userinfo = await this.props.auth.getUser();
    //this.setState({ groups: userinfo.groups });
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated: authenticated, userinfo: userinfo });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    // let NavList;
    // if(this.state.authenticated && this.state.userinfo.groups.includes("Admin") {
    //   NavList =
    //     <nav class="nav-color my-2 my-md-0 mr-md-3">
    //       <a class="p-2" href="/adminlist">Admin List</a>
    //       <a class="p-2" href="#">User Manangement</a>
    //       <a class="p-2" href="/mylist">Newsletter</a>
    //       <a class="p-2" href="#">Support</a>
    //       <a class="p-2" href="/pricing">Pricing</a>
    //     </nav>
    // } else if (this.state.authenticated && this.state.userinfo.groups.includes("Everyone") {
    //     NavList = 
    //       <nav class="nav-color my-2 my-md-0 mr-md-3">
    //         <a class="p-2" href="/mylist">My List</a>
    //         <a class="p-2" href="/mylist">Newsletter</a>
    //         <a class="p-2" href="#">Support</a>
    //         <a class="p-2" href="/pricing">Pricing</a>
    //       </nav>
    // } else {

    //     NavList =
    //       <nav class="nav-color my-2 my-md-0 mr-md-3">
    //         <a class="p-2" href="/pricing">Pricing</a>
    //       </nav>
    // }
    if (this.state.authenticated === null) return null;
    if (this.state.authenticated) {
      return (
        <React.Fragment>
          <div className="nav-color d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3  border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal"><a href="/">Naan Sense</a></h5>
              <nav className="nav-color my-2 my-md-0 mr-md-3">
                <a className="p-2" href="/mylist">My List</a>
                <a className="p-2" href="/mylist">Newsletter</a>
                <a className="p-2" href="#">Support</a>
              </nav>
            <a className="btn btn-primary" href="#" onClick={() => {this.props.auth.logout()}}>Logout</a>
          </div>
          <div className="fixed-bottom">  
            <section className='section-main'>
              <div className='no-margin'>Copyright @Naan Sense</div>
            </section>
          </div>

        </React.Fragment>
      )
    } else {
        return (
          <React.Fragment>
             <div className="nav-color d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3  border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal"><a href="/">Naan Sense</a></h5>
                <nav className="nav-color my-2 my-md-0 mr-md-3">
                  <a className="p-2" href="/pricing">Pricing</a>
                </nav>
                <a className="btn btn-primary" href="#" onClick={() => {this.props.auth.login()}}>Sign In</a>
              </div>
          </React.Fragment>
        )     
      }
    

  }
});