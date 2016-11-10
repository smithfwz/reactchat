import React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import userStore from './UserStore'
import { auth } from '../config/database'

@observer class Message extends React.Component {
  @observable uid = {}

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user){
        this.uid = user.uid
      }
    })
  }

  render() {
    const { details, userId } = this.props
    const sender = userStore.getUser(userId) || {}
    let position = ''

    if (this.uid === userId) {
      position = 'right'
    } else {
      position = 'left'
    }

    return (
      <div className="menu-message">
        {position === 'right' &&
          <li className="right">
            <div className="avatar">
              <img src={ sender.photoURL } alt={ sender.name } />
            </div>
            
            <div className="content">{ details.content }</div>
          </li>
        }

        {position === 'left' &&
          <li className="left">
            <div className="avatar">
              <img src={ sender.photoURL } alt={ sender.name } />
            </div>
            
            <div className="content">{ details.content }</div>
          </li>
        }
      </div>
    )
  }
}

Message.propTypes = {
  details: React.PropTypes.shape({
    content: React.PropTypes.string.isRequired
  })
}

export default Message