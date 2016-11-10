import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match, Miss } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './assets/css/style.css'
import Main from './pages/Main'
import Room from './components/Room'
import NotFound from './pages/NotFound'

injectTapEventPlugin();

const Root = () => {
  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={ Main } />
          <Match pattern="/rooms/:userId" component={ Room } />
          <Miss component={ NotFound } />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

render(<Root/>, document.querySelector("#root"))