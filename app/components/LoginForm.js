import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import firebase from 'firebase/app'
import { auth } from '../config/database'

@observer class LoginForm extends React.Component {
  @observable uid = null
  @observable owner = null

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user){
        this.authHandler({ user })
      }
    })
  }
  
  logout() {
    auth.signOut()
    this.uid = null
  }

  authenticate(provider) {
    auth.signInWithPopup(provider).then((authData) => this.authHandler(authData))
  }

  authHandler(authData) {
    this.uid = authData.uid || authData.user.uid
    this.owner = authData.uid || authData.user.uid
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Login</h2>
        <button className="github" onClick={ () => this.authenticate(new firebase.auth.GithubAuthProvider()) }>Log In with Github</button>
      </nav>
    )
  }

  render() {
    if (this.uid !== this.owner) {
      this.context.router.transitionTo(`/rooms/${ this.uid }`)
    }
    
    return <div>{this.renderLogin()}</div>
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.object
}

export default LoginForm