import React from 'react'
import {render} from 'react-dom'
import {findRatio} from 'lib/index'
import {Equals, Info, Section} from 'components'
import 'styles/main'
import {currencyNames} from 'lib/constants'
import 'whatwg-fetch'

function getTotalArea() {
  return Math.min(window.innerWidth * 100, window.innerHeight * 200)
}

class App extends React.Component {
  componentWillMount () {
    const currentBase = 'USD'
    const currentCompare = 'EUR'
    this.state = {
      currentBase,
      currentCompare,
      ratios: { [currentBase]: {} },
      rates: { [currentBase]: {} },
      totalArea: getTotalArea(),
    }
    this.fetchRates()
  }

  componentDidMount () {
    this.interval = setInterval(() => this.setState({ totalArea: getTotalArea() }), 1000)
  }

  componentDidUpdate () {
    const { currentBase, currentCompare, ratios, rates } = this.state
    if (!ratios[currentBase][currentCompare] && rates[currentBase][currentCompare]) {
      setTimeout( () => {
        const ratio = findRatio(1, rates[currentBase][currentCompare])
        this.setState({
          ratios: Object.assign( {}, this.state.ratios, {
            [currentBase]: Object.assign( {}, this.state.ratios[currentBase], { [currentCompare]: ratio })
          })
        })
      }, 0)
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  async fetchRates() {
    const { currentBase, currentCompare } = this.state
    const response = await fetch(`https://api.fixer.io/latest?base=${currentBase}`)

    if (response.status < 400) {
      const results = await response.json()
      this.setState({
        options: Object.keys(currencyNames).sort(),
        rates: Object.assign({}, this.state.rates, {
          [currentBase]: Object.assign({}, results.rates, { [currentBase]: 1 })
        })
      })
    }
  }

  newValue(current, indexShift) {
    const { options } = this.state
    let newIndex = options.indexOf(current) + indexShift
    if (newIndex >= options.length) newIndex -= options.length
    else if (newIndex < 0) newIndex += options.length
    return options[newIndex]
  }

  changeBaseCurrency (indexShift) {
    // the results for this function is bad for currencies that are really weak
    // because the runtime of the algorithm that finds the simplest ratio is big
    const { currentBase, ratios, rates } = this.state
    const newBase = this.newValue(currentBase, indexShift)
    this.setState({
      currentBase: newBase,
      ratios: Object.assign({ [newBase]: {} }, ratios),
      rates: Object.assign({ [newBase]: {} }, rates)
    }, this.fetchRates.bind(this))
  }

  changeCompareCurrency (indexShift) {
    const { currentCompare } = this.state
    const newCompare = this.newValue(currentCompare, indexShift) 
    this.setState({ currentCompare: newCompare })
  }

  render () {
    const { currentBase, currentCompare, ratios, totalArea, options } = this.state
    const ratio = ratios[currentBase][currentCompare]
    return (
      <div className='sections-container'>
        <Info />
        <Equals />
        <Section
          currency={currentBase}
          totalArea={totalArea}
          number={ratio ? ratio[0] : '?'}
          options={options}
          changeCurrency={this.changeBaseCurrency.bind(this)}
        />
        <Section
          currency={currentCompare}
          totalArea={totalArea}
          number={ratio ? ratio[1] : '?'}
          options={options}
          changeCurrency={this.changeCompareCurrency.bind(this)}
          flip
        />
      </div>
    )
  }
}

render( <App />, document.getElementById('app'))
