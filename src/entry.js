import React from 'react'
import {render} from 'react-dom'
import 'styles/main'

class App extends React.Component {
  render () {
    return (
      <div>REACT IS HERE</div>
    )
  }
}

render( <App />, document.getElementById('app'))
