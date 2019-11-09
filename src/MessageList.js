import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';

async function checkAuthentication() {
  const authenticated = await this.props.auth.isAuthenticated();

  if (authenticated && !this.state.userinfo) {
    const userinfo = await this.props.auth.getUser();
    //const accessToken = await this.props.auth.getAccessToken();
    //console.log(userinfo);
    this.setState({ userinfo });

  }
}

export default withAuth(class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = { userinfo: {} };
    this.checkAuthentication = checkAuthentication.bind(this);
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    return (
      <div>
        {this.state.userinfo !== null &&
          <div>
            <p>Welcome back, {this.state.userinfo}!</p>

          </div>
        }
      </div>
    );
  }
});