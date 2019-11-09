import React from 'react';
import { Redirect} from 'react-router-dom';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default withAuth(class RegisterPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      sessionToken: null,
      registered: false,
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    };
    this.oktaAuth = new OktaAuth({ url: "https://dev-254942.okta.com" });
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  async checkAuthentication() {
    const sessionToken = await this.props.auth.getIdToken();
    if (sessionToken) {
      this.setState({ sessionToken });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  handleFirstNameChange(e){
    this.setState({firstName:e.target.value});
  }
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  async handleSubmit(e){
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/api/v1/users?activated=true", {
        method: 'POST',
        headers: new Headers({
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        }),
        body: JSON.stringify({        
          "firstName": this.state.firstName,
          "lastName": this.state.lastName,
          "email": this.state.email,
          "login": this.state.email,
          "password": this.state.password

          })      
      })
      if (!response.ok) {
        console.log(response);
      } else {
          const response_json = await response.json();
          console.log(response_json);
          this.setState({registered: true});
      }
    } catch (error) {
      console.log(error);
    }
  }


  render(){
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    if(this.state.registered === true){
      return <Redirect to="/login"/>
    }

    return(
      <div align='center'>
        <div className='section-grey'>
          <form className="sense col-md-4" onSubmit={this.handleSubmit}>
            <h6>Naan sense</h6>
            <img src="logo192.png" width="100" height="50" /><br/><br/>
            <h6> Sign up </h6>
            <div className='form-group row'> 
              <label htmlFor="firstname"><strong>First Name</strong></label>
              <input className="form-control" type="text" id="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange} />
            </div>
            <div className='form-group row'> 
              <label htmlFor="lastname"><strong>Last Name </strong></label>
              <input className="form-control" type="text" id="lastName" value={this.state.lastName} onChange={this.handleLastNameChange} />
            </div>
            <div className='form-group row'> 
              <label htmlFor="email"><strong> Email </strong></label>
              <input className="form-control" type="text" id="email" value={this.state.email} onChange={this.handleEmailChange} />
            </div>
             <div className='form-group row'> 
              <label htmlFor="password"><strong>Password </strong></label>
              <input className="form-control" type="password" id="passsword" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>
              <input className="btn btn-primary btn-lg btn-block" id="submit" type="submit" value="Sign Up" />
            </form>
        </div>
      </div>
    );
  }

});

        