import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: '',
      userName: '',
      firstName: '',
      lastName: '',
      email: ''
    }

    if(props.user){
      this.state = props.user
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {

    let pageTitle;
    if(this.state.id) {
      pageTitle = <h2>Edit User</h2>
    } else {
      pageTitle = <h2>Add User</h2>
    }

    return(
      <div>
        {pageTitle}
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  placeholder="First Name"/>
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  placeholder="Last Name" />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email" />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="password" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state.id} />
                <Button variant="success" type="submit">Save</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddUser;
