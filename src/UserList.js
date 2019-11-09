import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { Table, Button, Alert } from 'react-bootstrap';
import UserGroups from './UserGroups';

export default withAuth(class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      authenticated: null, 
      userinfo: null,
      users: [],
      groups: "",
      response: {},
      admin_group_id: ""
    }
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
  async componentDidMount() {
    try {
      this.checkAuthentication();
      const response = await fetch("http://localhost:3002/api/v1/users", {
        method: 'GET',
        headers: new Headers({
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          })
      })
      if (!response.ok) {

      } else {
          const response_json = await response.json();
          console.log(response_json);
          this.setState({ users: response_json.message });

      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserGroups(userId) {
    const { users } = this.state;
    try {
      const response = await fetch("http://localhost:3002/api/v1/users/" + userId + "/groups", {
        method: 'GET',
        headers: new Headers({
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          })
      })
      if (!response.ok) {

      } else {
          const response_json = await response.json();
          const groups = response_json.message.map(m => ( m.profile.name )).join();
          this.setState({groups: groups});
          console.log(this.state.groups);
          return this.state.groups;
      }
    } catch (error) {
      console.log(error);
    }

  }
  async deleteUser(userId) {
    const { users } = this.state;

    try {
      const response = await fetch("http://localhost:3002/api/v1/users/" + userId + "/lifecycle/deactivate", {
        method: 'POST',
        headers: new Headers({
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          })
      })
      if (!response.ok) {
        //const response_json = await response.json();
        //console.log(response_json);
      } else {
          const response_json = await response.json();
          console.log(response_json);
          this.setState({
            response: response_json.message,
            users: users.filter(user => user.id !== userId)
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAdminGroup() {
    const { users } = this.state;
    try {
      const response = await fetch("http://localhost:3002/api/v1/groups/admin_group", {
        method: 'GET',
        headers: new Headers({
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          })
      })
      if (!response.ok) {

      } else {
          const response_json = await response.json();
          this.setState({admin_group_id: response_json.message[0].id})
      }
    } catch (error) {
      console.log(error);
    }

  }
  render() {
    const { error, users} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
        this.getAdminGroup();
      return(
        <div>
          <h2>User List</h2>
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th> Groups </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.profile.firstName}</td>
                  <td>{user.profile.lastName}</td>
                  <td>{user.profile.email}</td>
                  <td><UserGroups userId = {user.id} admin_group_id = {this.state.admin_group_id} /></td>
                  <td>
                    <Button variant="info" onClick={() => this.props.editUser(user.id)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={ e => window.confirm("Are you sure you wish to delet this user?") 
                      && this.deleteUser(user.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
});