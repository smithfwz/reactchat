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
}

const userStore = new UserStore()
export default userStore