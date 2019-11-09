import React, { Component } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

export default (class UserGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: "",
      admin_group_id: this.props.admin_group_id,
      userId: this.props.userId,
      userIsAdmin: false,
      group_array: []
    }
  }
  async componentDidMount(userId) {
    const { users } = this.state;
    try {
      const response = await fetch("http://localhost:3002/api/v1/users/" + this.state.userId + "/groups", {
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
          const group_ids = response_json.message.map(m => ( m.id ))
          const userIsAdmin = response_json.message.map(m => ( m.profile.name )).includes('Admin')
          this.setState({groups: groups, userIsAdmin: userIsAdmin});
          console.log(this.state.groups);
          return this.state.groups;
      }
    } catch (error) {
      console.log(error);
    }

  }

  async addUserToGroup(userId, groupId) {
    const { users } = this.state;

    try {
      const response = await fetch("http://localhost:3002/api/v1/groups/" + groupId + "/users/" + userId, {
        method: 'PUT',
        headers: new Headers({
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          })
      })
      if (!response.ok) {
      } else {
          const response_json = await response.json();
          console.log(response_json);
          const groups = response_json.message.map(m => ( m.profile.name )).join();
          this.setState({
            groups: groups,
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.userIsAdmin) {
      return (
        <div>
          <div> { this.state.groups } </div>
        </div>
      )
    } else {
      return (
        <div>
          <div> { this.state.groups } </div>
          <Button variant="danger" 
            onClick={ e => window.confirm("Are you sure you wish to promote this user to an Admin group?") 
            && this.addUserToGroup(this.state.userId, this.state.admin_group_id) } >
            Promote to Admin
          </Button>

        </div>
      )     
    }
  }
});