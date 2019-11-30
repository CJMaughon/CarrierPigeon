/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import logo from '../../img/carrier_pigeon_landing.png';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, setError, login, switchForm } from '../../actions/auth';
import Error from './Alert';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
const Landing = ({
  switchForm,
  isLoginFormVisible,
  setError,
  register,
  login,
  isAuthenticated,
  isInstructor,
  isUserApproved
}) => {
  if (isAuthenticated) {
    if (isUserApproved === false) {
      return <Redirect to='/unapproved_page' />;
    }
    if (isInstructor === true) {
      return <Redirect to='/instructor_dashboard' />;

    }
    if (isInstructor === false) {
      return <Redirect to='/admin_dashboard' />;
    }

  }

  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: '',
    password: '',
    password2: ''
  });

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
  const onSwitchFormButtonClick = e => switchForm(!isLoginFormVisible);
  const onSignUpFormChange = e =>
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value
    });

  const onSubmitRegister = async e => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
    } else {
      await register(name, email, password, mobile, location);
      setRegisterFormData({
        name: '',
        email: '',
        mobile: '',
        location: '',
        password: '',
        password2: ''
      });
      swal.fire({
        icon: 'info',
        title: 'Thanks for signing up. An admin will review and approve your registration shortly.',
      }).then((result) => {
        switchForm(!isLoginFormVisible);
      });
    }
  };

  const onLogInFormChange = e =>
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  const onSubmitLogin = async e => {
    e.preventDefault();
    login(loginEmail, loginPassword);
  };

  let form = (
    <div className='login-form-container'>
      <div>
        <form className='form-a' onSubmit={e => onSubmitLogin(e)}>
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
            minLength='6'
          />
          <button>Login</button>
          <Error></Error>
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
  if (!isLoginFormVisible) {
    form = (
      <div className='login-form-container'>
        <div>
          <form className='form-a' onSubmit={e => onSubmitRegister(e)}>
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
              minLength='6'
            />
            <input
              type='password'
              placeholder='Confirm Password'
              value={password2}
              onChange={e => onSignUpFormChange(e)}
              name='password2'
              minLength='6'
            />
            <button>Submit</button>

            <Error></Error>
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
  setError: PropTypes.func.isRequired,
  switchForm: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isInstructor: PropTypes.bool,
  isUserApproved: PropTypes.bool,
  isLoginFormVisible: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isInstructor: state.auth.isInstructor,
  isUserApproved: state.auth.isUserApproved,
  isLoginFormVisible: state.auth.isLoginFormVisible
});

export default connect(
  mapStateToProps,
  { setError, register, login, switchForm }
)(Landing);
