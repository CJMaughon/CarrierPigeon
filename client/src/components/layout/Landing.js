import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import logo from '../../img/carrier_pigeon_landing.png';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
const Landing = ({ setAlert, register, login, isAuthenticated }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: '',
    password: '',
    password2: ''
  });
  const type = 'Instructor';

  const [loginFormData, setLoginFormData] = useState({
    loginEmail: '',
    loginPassword: ''
  });
  const { loginEmail, loginPassword } = loginFormData;
  const {
    name,
    email,
    password,
    mobile,
    location,
    password2
  } = registerFormData;
  const onSwitchFormButtonClick = e => setIsLoginVisible(!isLoginVisible);
  const onSignUpFormChange = e =>
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value
    });

  const onSubmitRegister = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password, mobile, location, type });
    }
  };

  const onLogInFormChange = e =>
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  const onSubmitLogin = async e => {
    e.preventDefault();
    console.log(loginEmail, loginPassword);
    login(loginEmail, loginPassword);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  let form = (
    <div className='login-form-container'>
      <div>
        <form className='form' onSubmit={e => onSubmitLogin(e)}>
          <p className='lead'>
            <i className='fas fa-user'></i> Sign into Your Account
          </p>
          <input
            type='email'
            placeholder='Email Address'
            name='loginEmail'
            value={loginEmail}
            onChange={e => onLogInFormChange(e)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={loginPassword}
            onChange={e => onLogInFormChange(e)}
            name='loginPassword'
          />
          <button>Login</button>
        </form>
        <div className='sign-up-text'>
          <p>Don't have an account?</p>
          <button id='link' onClick={onSwitchFormButtonClick}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
  if (!isLoginVisible) {
    form = (
      <div className='login-form-container'>
        <div>
          <form className='form' onSubmit={e => onSubmitRegister(e)}>
            <p className='lead'>
              <i className='fas fa-user'></i> Register new Account
            </p>
            <input
              type='text'
              placeholder='Full Name'
              name='name'
              value={name}
              onChange={e => onSignUpFormChange(e)}
              required
            />
            <input
              type='text'
              placeholder='Mobile Number'
              name='mobile'
              value={mobile}
              onChange={e => onSignUpFormChange(e)}
              required
            />
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
              onChange={e => onSignUpFormChange(e)}
              required
            />
            <input
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={e => onSignUpFormChange(e)}
              name='email'
              required
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => onSignUpFormChange(e)}
              name='password'
            />
            <input
              type='password'
              placeholder='Confirm Password'
              value={password2}
              onChange={e => onSignUpFormChange(e)}
              name='password2'
            />
            <button>Submit</button>
          </form>
          <div className='sign-up-text'>
            <p>Already have an account?</p>
            <button id='link' onClick={onSwitchFormButtonClick}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }
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
      {form}
    </SplitPane>
  );
};

Landing.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register, login }
)(Landing);
