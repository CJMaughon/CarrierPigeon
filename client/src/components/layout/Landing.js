/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import logo from '../../img/carrier_pigeon_landing.png';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, setError, login, switchForm } from '../../actions/auth';
import Error from './Alert';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
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

  const useStyles = makeStyles(theme => ({

    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalPaper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    switchForm(!isLoginFormVisible);
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
      handleOpen();
      setRegisterFormData({
        name: '',
        email: '',
        mobile: '',
        location: '',
        password: '',
        password2: ''
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
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.modalPaper}>
                  <p className='lead'>
                    <i className='fas fa-check'></i> Thanks for signing up. An admin will review and approve your registration shortly.
                                </p>
                </div>
              </Fade>
            </Modal>
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
