import React from 'react'
import { observer } from 'mobx-react'

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

@observer class User extends React.Component {
  render() {
    const { details } = this.props

    return (
      <List>
        <Subheader></Subheader>

        <ListItem
          primaryText={ details.name || details.email }
          leftAvatar={<Avatar src={ details.photoURL } alt={ details.name } />}
        />
      </List>
    )
  }
}

export default User