// src/Pricing.js
import React, { Component } from 'react';
import ReactPlayer from 'react-player';


export default (class AdminLanding extends Component {
  constructor(props) {
    super(props);
    this.state = { userinfo: this.props.userinfo };
  }
  render() {
    return (
      <React.Fragment>
        <section className="section-grey">
          <h4 align='center'>Naan Sense - My List</h4>
          <h3 align='center'> Welcome Admin: {this.state.userinfo.name}</h3>
        </section>
        <section className="section-beige">
            <div class="container">
              <div class="card-deck mb-3 text-center">
                <div class="card mb-4 shadow-sm">
                  <div class="card-header">
                    <h4 class="my-0">Free</h4>
                  </div>
                  <div align='center' class="card-body">
                    <ul class="list-unstyled mt-3 mb-4">
                      <li><ReactPlayer url='https://soundcloud.com/food-heaven-podcast/how-to-separate-working-out' width= '80%' height = '80%' /></li>
                      <li><ReactPlayer url='https://soundcloud.com/food-heaven-podcast/how-to-separate-working-out' width= '80%' height = '80%' /></li>                        
                    </ul>
                  </div>
                </div>
                <div class="card mb-4 shadow-sm">
                  <div class="card-header">
                    <h4 class="my-0 font-weight-normal">Pro</h4>
                  </div>
                  <div align='center'class="card-body">
                    <ul class="list-unstyled mt-3 mb-4">
                      <li><ReactPlayer url='https://soundcloud.com/food-heaven-podcast/how-to-separate-working-out' width= '80%' height = '80%' /></li>
                      <li><ReactPlayer url='https://soundcloud.com/food-heaven-podcast/how-to-separate-working-out' width= '80%' height = '80%' /></li>
                    </ul>
                  </div>
                </div>
                <div class="card mb-4 shadow-sm">
                  <div class="card-header">
                    <h4 class="my-0 font-weight-normal">Enterprise</h4>
                  </div>
                  <div align='center' class="card-body">
                    <ul class="list-unstyled mt-3 mb-4">
                      <li>TEST</li>
                      <li><ReactPlayer url='https://soundcloud.com/food-heaven-podcast/how-to-separate-working-out' width= '80%' height = '80%' /></li>
                      <li><ReactPlayer url='https://soundcloud.com/food-heaven-podcast/how-to-separate-working-out' width= '80%' height = '80%' /></li>  
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </React.Fragment>

    )

  }
});
