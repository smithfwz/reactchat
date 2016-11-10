import { observable } from 'mobx'
import { database } from '../config/database'

class UserStore {
  @observable users = {}

  constructor() {
    database.ref('users').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.users = snapshot.val()
      }
    })
  }

  getUser(userId) {
    const users = { ...this.users }
    
    return users[`user-${ userId }`]
  }

  loadFriends(userId) {
    const users = { ...this.users }

    delete users[`user-${ userId }`]

    return users
  }
}

const userStore = new UserStore()
export default userStore