import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import './Form.scss';
import Main from '../Main/Main';

class SignUp extends Component {
  state = {
    isPasswordHidden: true,
    isConfirmPasswordHidden: true,
    passwordVisibility: 'password',
    confirmPasswordVisibility: 'password',
    isRegistered: false,
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      isPasswordHidden: !prevState.isPasswordHidden,
      passwordVisibility: prevState.passwordVisibility === 'password'
        ? 'text'
        : 'password',
    }))
  }

  toggleConfirmPasswordVisibility = () => {
    this.setState((prevState) => ({
      isConfirmPasswordHidden: !prevState.isConfirmPasswordHidden,
      confirmPasswordVisibility: prevState.confirmPasswordVisibility === 'password'
        ? 'text'
        : 'password',
    }))
  }

  validationsShema = yup.object().shape({
    name: yup.string().required('This field is required.'),
    email: yup.string().email('Enter valid email.').required('This field is required.'),
    password: yup.string().required('This field is required.')
      .min(8, 'Password should be 8 chars minimum.')
      .matches(
        /^(?=(?:.*?[A-Z]){2})(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Must be 2 uppercase and 1 special char.'
      ),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Password do not match')
      .required('This field is required.'),
  });

  render() {
  
    return (
      <>
        {
          !this.state.isRegistered &&
          <div className="form-wrapper">
            <div className="title">Sign Up</div>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validateOnBlur
              onSubmit={values => {
                  localStorage.setItem('user', JSON.stringify(values));
                  this.setState({isRegistered: true});
                }
              }
              validationSchema={this.validationsShema}
            >
              {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                <div className="form">
                  <div className="form-field">
                    <label htmlFor="name">Full name</label>
                    <input
                      type="text"
                      className={`${touched.name && errors.name ? 'error-input' : ''}`}
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Full name"
                    />
                    {touched.name && errors.name && <span className="error">{errors.name}</span>}
                  </div> 
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className={`${touched.email && errors.email ? 'error-input' : ''}`}
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="email@example.com"
                    />
                    {touched.email && errors.email && <span className="error">{errors.email}</span>}
                  </div>
                  <div className="form-field">
                    <div className="password">
                      <label htmlFor="password">Password</label>
                      <img
                          className="tooltip"
                          src="./img/Vector.svg"
                          alt="Tooltip icon"
                          tooltip="простая подсказка"
                        />
                    </div>
                    <input
                      type={this.state.passwordVisibility}
                      id="password"
                      className={`${touched.password && errors.password ? 'error-input' : ''}`}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Password"
                    />
                    {
                      touched.password
                      && errors.password
                      && <span className="error">{errors.password}</span>
                    }
                    {
                      this.state.isPasswordHidden
                        ? <button
                            type="button"
                            className="togglePass"
                            onClick={this.togglePasswordVisibility}
                          >
                            <img src="./img/show.svg" alt="Show password" />
                          </button>
                        : <button
                            type="button"
                            className="togglePass togglePass-position"
                            onClick={this.togglePasswordVisibility}
                          >
                            <img src="./img/hidden.svg" alt="Hidden password" />
                          </button>
                    }
                  </div>
                  <div className="form-field">
                    <label htmlFor="confirmPassword">Repeat password</label>
                    <input
                      type={this.state.confirmPasswordVisibility}
                      id="confirmPassword"
                      className={`${touched.confirmPassword && errors.confirmPassword ? 'error-input' : ''}`}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Confirm password"
                    />
                    {
                      touched.confirmPassword
                      && errors.confirmPassword
                      && <span className="error">{errors.confirmPassword}</span>
                    }
                    {
                      this.state.isConfirmPasswordHidden
                        ? <button
                            type="button"
                            className="togglePass"
                            onClick={this.toggleConfirmPasswordVisibility}
                          >
                            <img src="./img/show.svg" alt="Show password" />
                          </button>
                        : <button
                            type="button"
                            className="togglePass togglePass-position"
                            onClick={this.toggleConfirmPasswordVisibility}
                          >
                            <img src="./img/hidden.svg" alt="Hidden password" />
                          </button>
                    }
                    
                  </div>
                  <button
                    disabled={!isValid && !dirty}
                    type="submit"
                    onClick={handleSubmit}
                    className="submit-btn"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </Formik>
            <div className="text-after-form">
              Already have an account?<br />
              <button className="link-btn" onClick={this.props.signIn}>
                <span className="link">Sign In</span>
              </button>
            </div> 
          </div>
        }
        {
          this.state.isRegistered &&
          <Main />
        }
      </>
    );
  }
}

export default SignUp;
