import React, { useState } from 'react';
import axios from 'axios';
import SplitPane from 'react-split-pane';
import logo from '../../img/carrier_pigeon_landing.png';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
const Landing = ({ setAlert }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
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
  const onSwitchFormButtonClick = e => setIsLoginVisible(!isLoginVisible);
  const onSignUpFormChange = e =>
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value
    });
  const onLogInFormChange = e =>
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    });
  const type = 'Instructor';
  const onSubmitRegister = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('submit registration');
      setAlert('Passwords do not match', 'danger');
    } else {
      console.log(registerFormData);
      const newUser = {
        name,
        email,
        password,
        mobile,
        location,
        type
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);
        console.log(res);
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };
  let form = (
    <div className='login-form-container'>
      <div>
        <form className='form' action='dashboard.html'>
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
              minLength='6'
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
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert }
)(Landing);
