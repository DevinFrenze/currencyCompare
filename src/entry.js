import React from 'react'
import {render} from 'react-dom'
import 'styles/main'
import 'whatwg-fetch'

class App extends React.Component {
  componentWillMount() {
    this.state = { base: 'EUR' }
    this.fetchRates()
  }

  async fetchRates() {
    const response = await fetch('http://api.fixer.io/latest')

    if (response.status < 400) {
      const rates = await response.json()
      this.setState({ rates })
    }
  }

  render () {
    const { rates } = this.state
    return (
      <div>
        <div>REACT IS HERE</div>
        {rates && rates.base}
      </div>
    )
  }
}

render( <App />, document.getElementById('app'))
