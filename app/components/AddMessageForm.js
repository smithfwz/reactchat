import React from 'react'
import { observer } from 'mobx-react'
import manageMessages from './ManageMessages'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

@observer class AddMessageForm extends React.Component {
  createMessage(e, userId) {
    e.preventDefault()

    const message = {
      sender: userId,
      content: this.content.getValue(),
    }

    manageMessages.addMessage(message)
    this.fishForm.reset()
  }

  render() {
    return (
      <form ref={ (input) => this.fishForm = input } className="message-form" onSubmit={ (e) => this.createMessage(e, this.props.userId) }>
        <TextField
          ref={ (input) => this.content = input }
          floatingLabelText="Enter your message"
          multiLine={true}
          rows={2}
          className="content-field"
        />

        <RaisedButton label="Send" primary={true} type="submit" />
      </form>
    )
  }
}

export default AddMessageForm