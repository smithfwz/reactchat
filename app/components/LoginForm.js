import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import firebase from 'firebase/app'
import { auth, database } from '../config/database'

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
  
  authenticate(provider) {
    auth.signInWithPopup(provider).then((authData) => this.authHandler(authData))
  }

  authHandler(authData) {
    const userId = authData.uid || authData.user.uid
    const userRef = database.ref(`users/user-${ userId }`)

    userRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}

      if (!data.owner) {
        userRef.set({
          owner: authData.user.uid,
          email: authData.user.email,
          name: authData.user.displayName,
          photoURL: authData.user.photoURL
        })
      }

      this.uid = authData.user.uid
      this.owner = data.owner || authData.user.uid
    })
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