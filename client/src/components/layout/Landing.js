import React from 'react'
import SplitPane from 'react-split-pane'
import logo from '../../img/carrier_pigeon_landing.png';

const Landing = () => {
  return (
  <SplitPane split="vertical" defaultSize="50vw">
    <div className="logo-container">
      <div>
        <div className="landing-inner">
          <img src={logo} className="" alt="Logo" />
          <p className="lead">
            App for The Growing Leaders
          </p>
        </div>
      </div>
    </div>  
    <div className="login-form-container">
      <div>
        <div className="alert alert-danger">
          Invalid credentials
        </div>
        <form className="form" action="dashboard.html">
          <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
          <input
          type="email"
          placeholder="Email Address"
          name="email"
          required
          />
          <input
          type="password"
          placeholder="Password"
          name="password"
          />
          <button>Login</button>
          <p className="my-1">
            Don't have an account? <a href="register.html">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  </SplitPane>
    )
}


export default Landing;