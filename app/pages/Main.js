import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { observer } from 'mobx-react'

@observer class Main extends Component {
  render() {
    return (
      <div className="Main">
        <div className="Main-header">
          <h2>Welcome to React</h2>
        </div>
        <LoginForm />
      </div>
    );
  }
}

export default Main;
