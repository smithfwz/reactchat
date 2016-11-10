import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Chatbox from './Chatbox'
import { auth } from '../config/database'

@observer class Room extends React.Component {
  @observable uid = null

  logout() {
    auth.signOut()
    this.uid = null
    this.context.router.transitionTo('/')
  }

  render() {
    const { userId } = this.props.params
    const logout = <button onClick={() => this.logout()}>Log Out!</button>;

    return (
      <div className="room">
        { logout }
        <Chatbox userId={ userId } />
      </div>
    )
  }
}

Room.contextTypes = {
  router: React.PropTypes.object
}

export default Room