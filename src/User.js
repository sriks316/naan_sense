import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import UserList from './UserList';
import AddUser from './AddUser';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddUser: false,
      error: null,
      response: {},
      user: {},
      isEditUser: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddUser: true });
  }

  onFormSubmit(data) {
    let apiUrl;
    let requestMethod;

    if(this.state.isEditUser){
      debugger;
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
          debugger;
          this.setState({ error });
        }
      )
  }

  render() {

    let userForm;
    if(this.state.isAddUser || this.state.isEditUser) {
      userForm = <AddUser onFormSubmit={this.onFormSubmit} user={this.state.user} />
    }

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
  }
}

export default User;