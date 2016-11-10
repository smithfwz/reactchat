import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Chatbox from './Chatbox'
import { auth } from '../config/database'
import userStore from './UserStore'
import User from './User'

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
    const friends = userStore.loadFriends(userId) || {}

    return (
      <div className="room">
        <div className="actions">
          { logout }
        </div>

        <ul className="users">
          { Object
              .keys(friends)
              .reverse()
              .map( key => <User 
                              key={ key } 
                              index={ key }
                              details={ friends[key] }
                            />
                  )
          }
        </ul>

        <Chatbox userId={ userId } />
      </div>
    )
  }
}

Room.contextTypes = {
  router: React.PropTypes.object
}

export default Room