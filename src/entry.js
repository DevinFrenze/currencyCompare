import React from 'react'
import {render} from 'react-dom'
import {findRatio} from 'lib/index'
import {BaseSection, CompareSection} from 'components'
import 'styles/main'
import {currencyNames} from 'lib/constants'
import 'whatwg-fetch'

/*
 * TODO
 *
 * position render sections better
 * animate circles entering and leaving
 * add slight gradients to edges of circles
 * format the font of the headers
 * animate buttons
 * add link to github
 *
 */

class App extends React.Component {
  componentWillMount() {
    const currentBase = 'USD'
    const currentCompare = 'EUR'
    this.state = {
      currentBase,
      currentCompare,
      ratios: { [currentBase]: {} },
      rates: { [currentBase]: {} }
    }
    this.fetchRates()
  }

  componentDidUpdate() {
    const { currentBase, currentCompare, ratios, rates } = this.state
    if (!ratios[currentBase][currentCompare] && rates[currentBase][currentCompare]) {
      setTimeout( () => {
        const ratio = findRatio(1, rates[currentBase][currentCompare])
        console.log('ratio ' + ratio)
        this.setState({
          ratios: Object.assign( {}, this.state.ratios, {
            [currentBase]: Object.assign( {}, this.state.ratios[currentBase], { [currentCompare]: ratio })
          })
        })
      }, 0)
    }
  }

  async fetchRates() {
    const { currentBase, currentCompare } = this.state
    const response = await fetch(`http://api.fixer.io/latest?base=${currentBase}`)

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
    const { currentBase, currentCompare, ratios, options } = this.state
    const ratio = ratios[currentBase][currentCompare]
    return (
      <div className='sections-container'>
        <BaseSection currency={currentBase} number={ratio ? ratio[0] : '?'}/>
        <CompareSection
          currency={currentCompare}
          number={ratio ? ratio[1] : '?'}
          options={options}
          changeOption={this.changeCompareCurrency.bind(this)}
        />
      </div>
    )
  }
}

render( <App />, document.getElementById('app'))
