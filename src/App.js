// src/App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Pricing from './Pricing';
import MessageList from './MessageList';
import RegisterPage from './RegisterPage';
import UserList from './UserList';
import User from './User';
import MyList from './MyList';
import AdminList from './AdminList';
import Navigation from './Navigation';

function onAuthRequired({history}) {
  history.push('/login');
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer='https://dev-254942.okta.com/oauth2/default'
                  clientId='0oa1osy1pgK7Oma3F357'
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired}
                  scope={['openid', 'email', 'profile', 'groups']}
                  pkce={true} >

          <Navigation />
          <Route path='/' exact={true} component={Home} />
          <Route path='/userlist' exact={true} component={UserList} />
          <SecureRoute path='/user' exact={true} component={User} />
          <Route path='/pricing' component={Pricing} />
          <Route path='/registerpage' render={() => <RegisterPage baseUrl='https://dev-254942.okta.com' />} />
          <SecureRoute path='/messagelist' component={MessageList} />
          <SecureRoute path='/messagelist' component={UserList} />
          <SecureRoute path='/mylist' component={MyList} />
          <SecureRoute path='/adminlist' component={AdminList} />
          <Route path='/login' render={() => <Login baseUrl='https://dev-254942.okta.com' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

export default App;