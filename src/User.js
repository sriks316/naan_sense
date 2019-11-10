import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import { withAuth } from '@okta/okta-react';
import UserList from './UserList';
import AddUser from './AddUser';

export default withAuth(class User extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      authenticated: null, 
      userinfo: null,
      isAddUser: false,
      error: null,
      response: {},
      user: {},
      isEditUser: false 
    };
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


  onCreate() {
    this.setState({ isAddUser: true });
  }

  onFormSubmit(data) {
    let apiUrl;
    let requestMethod;

    if(this.state.isEditUser){
      apiUrl = 'http://localhost:3002/api/v1/users/' + '123';
      requestMethod = 'PUT'
    } else {
      apiUrl = 'http://localhost:3002/api/v1/users?activated=true';
      requestMethod = 'POST'
    }

    const myHeaders = new Headers({
            'Accept': 'application/json',
           'Content-Type': 'application/json'
         })

    const options = {
      method: requestMethod,
      body: JSON.stringify(data),
      headers: new Headers({
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        }),
    };
    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddUser: false,
          isEditUser: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  }

  editUser = userId => {

    const apiUrl = 'http://localhost:3002/api/v1/users/' + userId;

    const options = {
      method: 'GET'
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            user: result,
            isEditUser: true,
            isAddUser: true
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let userForm;
    if(this.state.isAddUser || this.state.isEditUser) {
      userForm = <AddUser onFormSubmit={this.onFormSubmit} user={this.state.user} />
    } else if (this.state.userinfo && this.state.userinfo.groups.includes("Admin")) {

      return (
        <div className="User">
          <Container>
            <h1 style={{textAlign:'center'}}>User Management</h1>
            {!this.state.isAddUser && <Button variant="primary" onClick={() => this.onCreate()}>Add User</Button>}
            {this.state.response.status === 'ok' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
            {!this.state.isAddUser && <UserList editUser={this.editUser}/>}
            { userForm }
            {this.state.error && <div>Error: {this.state.error.message}</div>}
          </Container>
        </div>
      );
      } else {
        return (
          <div class="alert alert-danger" role="alert">
            Access Denied to this page!
          </div>
        );
      }
  }
});