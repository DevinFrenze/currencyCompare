import React from 'react'
import {render} from 'react-dom'
import {findRatio} from 'lib/index'
import 'styles/main'
import 'whatwg-fetch'

class App extends React.Component {
  componentWillMount() {
    this.state = {
      currentBase: 'USD',
      currentCompare: 'HUF',
      ratios: {},
      rates: {}
    }
    this.fetchRates()
  }

  componentDidUpdate() {
    const { currentCompare, ratios, rates } = this.state
    if (!ratios[currentCompare] && rates) {
      setTimeout( () => {
        const ratio = findRatio(1, rates[currentCompare])
        this.setState({ ratios: Object.assign( {}, this.state.ratios, { [currentCompare]: ratio }) })
      }, 0)
    }
  }

  async fetchRates() {
    const { currentBase, currentCompare } = this.state
    const response = await fetch(`http://api.fixer.io/latest?base=${currentBase}`)

    if (response.status < 400) {
      const results = await response.json()
      this.setState({
        options: Object.keys(results.rates).sort(),
        rates: results.rates
      })
    }
  }

  changeCompareCurrency (indexShift) {
    const { options, currentCompare, rates } = this.state
    let newIndex = options.indexOf(currentCompare) + indexShift
    if (newIndex >= options.length) newIndex -= options.length
    else if (newIndex < 0) newIndex += options.length

    const newCompare = options[newIndex]
    this.setState({ currentCompare: newCompare })
  }

  render () {
    const { currentBase, currentCompare, ratios, options } = this.state
    const ratio = ratios[currentCompare]
    console.log('render ' + currentCompare)
    return (
      <div>
        <div>REACT IS THERE</div>
        <div>{currentBase} = {ratio ? ratio[0] : '?'}</div>
        <div>{currentCompare} = {ratio ? ratio[1] : '?'}</div>
        <div onClick={() => this.changeCompareCurrency(-1)}>back</div>
        <div onClick={() => this.changeCompareCurrency(1)}>forward</div>
      </div>
    )
  }
}

render( <App />, document.getElementById('app'))
