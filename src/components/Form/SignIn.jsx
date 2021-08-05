import React, { Component } from 'react';
import './Form.scss';
import Main from '../Main/Main';

class SignIn extends Component {
  state = {
    isLogin: false,
    isPasswordHidden: true,
    passwordVisibility: 'password',
    email: '',
    password: '',
    isValid: true,
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      isPasswordHidden: !prevState.isPasswordHidden,
      passwordVisibility: prevState.passwordVisibility === 'password'
        ? 'text'
        : 'password',
    }))
  }

  handleChange = (event) => {
    this.setState({ 
      [event.target.name]: event.target.value,
      isValid: true
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.email === this.state.email && user.password === this.state.password) {
      this.setState({isLogin: true});
    } else {
      this.setState({
        isValid: false,
        email: '',
        password: '',
      });
    }
  }

  closeError = () => this.setState({isValid: true});

  render() {
    return (
      <>
        { !this.state.isLogin &&
          <div className="form-wrapper">
            <div className="title">Sign In</div>
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  className={`${!this.state.isValid ? 'error-input' : ''}`}
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="email@example.com"
                />
              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  type={this.state.passwordVisibility}
                  className={`${!this.state.isValid ? 'error-input' : ''}`}
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
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
              <button
                type="submit"
                className="submit-btn"
                disabled={!this.state.email || !this.state.password}
              >
                Sign In
              </button>
            </form>
            <div className="text-after-form">
              Don’t have an account yet?<br />
              <button className="link-btn" onClick={this.props.signUp}>
                <span className="link">Sign Up</span>
              </button>
            </div>
            {!this.state.isValid && 
              <div className="error-box" onClick={this.closeError}>
                <span>Wrong email or password</span>
                <button type="button">X</button>
              </div>
            }
          </div>
        }
        {this.state.isLogin && <Main />}
     </>
    );
  }
}

export default SignIn;
