import React, { Component } from 'react';
import './App.scss';
import SignIn from './components/Form/SignIn';
import SignUp from './components/Form/SignUp';

class App extends Component {
  state = {
    isEnterScreen: true,
    isSignUp: false,
    isSignIn: false,
  }

  signUp = () => {
    this.setState({
      isEnterScreen: false,
      isSignUp: true,
      isSignIn: false,
    })
  }

  signIn = () => {
    this.setState({
      isEnterScreen: false,
      isSignUp: false,
      isSignIn: true,
    })
  }
  
  render() {
    return (
      <div className="App">
        {this.state.isEnterScreen
          ? <div className="home">
              <h1 className="title">Ready for a great User experience?</h1>
              <p className="home__text">Bring your media to the next level!</p>
              <div className="home__buttons">
                <button
                  type="button"
                  className="home__register"
                  onClick={this.signUp}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="home__login"
                  onClick={this.signIn}
                >
                  →
                </button>
              </div>
            </div>
          : null
        }
        {this.state.isSignIn ? <SignIn signUp={this.signUp} /> : null}
        {this.state.isSignUp ? <SignUp signIn={this.signIn} /> : null}
      </div>
    );
  }

}

export default App;
