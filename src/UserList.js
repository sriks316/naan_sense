import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      users: [],
      response: {}
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3002/api/v1/users", {
        method: 'GET',
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
          this.setState({ users: response_json.message });
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

  render() {
    const { error, users} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.profile.firstName}</td>
                  <td>{user.profile.lastName}</td>
                  <td>{user.profile.email}</td>
                  <td>
                    <Button variant="info" onClick={() => this.props.editUser(user.id)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteUser(user.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default UserList;