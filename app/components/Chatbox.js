import React from 'react'
import { observer } from 'mobx-react'
import AddMessageForm from './AddMessageForm'
import manageMessages from './ManageMessages'
import Message from './Message'

@observer class Chatbox extends React.Component {
  componentWillMount() {
    manageMessages.loadMessageDefault()
  }

  render() {
    return (
      <div className="chatbox">
        <ul className="list-of-messages">
          { 
            manageMessages.messages &&
            Object
              .keys(manageMessages.messages)
              .reverse()
              .map( key => <Message 
                            key={ key } 
                            index={ key }
                            details={ manageMessages.messages[key] }
                            userId={ manageMessages.messages[key].sender }
                            />
                  )
          }
        </ul>

        <AddMessageForm userId={ this.props.userId } />
      </div>
    )
  }
}

export default Chatbox