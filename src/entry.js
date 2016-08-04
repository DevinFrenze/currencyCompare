import React from 'react'
import {render} from 'react-dom'
import 'styles/main'
import 'whatwg-fetch'

class App extends React.Component {
  componentWillMount() {
    this.state = { base: 'USD' }
    this.fetchRates()
  }

  async fetchRates() {
    const { base } = this.state
    const response = await fetch(`http://api.fixer.io/latest?base=${base}`)

    if (response.status < 400) {
      const rates = await response.json()
      this.setState(Object.assign( this.state, rates ))
    }
  }

  render () {

    const { base, rates } = this.state
    return (
      <div>
        <div>REACT IS THERE</div>
        <div>{base} = 1</div>
        <div>{rates ?
          rates.EUR && ('EUR = ' + rates.EUR) :
          'Loading'
        }</div>
      </div>
    )
  }
}

render( <App />, document.getElementById('app'))
