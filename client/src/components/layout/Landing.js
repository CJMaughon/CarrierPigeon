import React from 'react';
import SplitPane from 'react-split-pane';
import logo from '../../img/carrier_pigeon_landing.png';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoginVisible: true };
  }

  render() {
    const { isLoginVisible } = this.state;
    return (
      <SplitPane split='vertical' defaultSize='50vw'>
        <div className='logo-container'>
          <div>
            <div className='landing-inner'>
              <img src={logo} className='' alt='Logo' />
              <p className='lead'>App for The Growing Leaders</p>
            </div>
          </div>
        </div>
        <div className='login-form-container'>
          <div>
            <div className='alert alert-danger'>Invalid credentials</div>
            <form className='form' action='dashboard.html'>
              <p className='lead'>
                <i className='fas fa-user'></i> Sign into Your Account
              </p>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                required
              />
              <input type='password' placeholder='Password' name='password' />
              <button>Login</button>
            </form>
            <div className='sign-up-text'>
              {isLoginVisible ? (
                <p>Don't have an account?</p>
              ) : (
                <p>Already have an account?</p>
              )}
              <button
                id='link'
                onClick={() =>
                  this.setState({ isLoginVisible: !isLoginVisible })
                }
              >
                {isLoginVisible ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </SplitPane>
    );
  }
}

export default Landing;
