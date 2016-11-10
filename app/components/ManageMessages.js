import { observable } from 'mobx'
import { database } from '../config/database'

class ManageMessages {
  @observable messages = {}

  addMessage(message) {
    const messages = { ...this.messages }
    const timestamp = Date.now()
    const messageId = `message-${ timestamp }`

    messages[messageId] = message
    this.messages = messages

    database.ref(`/messages/${ messageId }`).set( message )
  }

  loadMessageDefault() {
    database.ref('messages').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.messages = snapshot.val()
      }
    })
  }
}

const manageMessages = new ManageMessages()
export default manageMessages