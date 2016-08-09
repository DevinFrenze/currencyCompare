import React, { PropTypes } from 'react'
import {currencyNames} from 'lib/constants'
import 'styles/title'

class Title extends React.Component {
  render () {
    const { currency, number } = this.props
    return (
      <div className='title'>
        {this.renderAbbreviation()}
        <div className='currency-name'>{currencyNames[currency]}</div>
      </div>
    )
  }

  renderAbbreviation () {
    const { changeCurrency, currency, number } = this.props

    if (!changeCurrency) {
      return (
        <div className='currency-abbreviation'>
          {currency}
        </div>
      )
    }
    return (
      <div className='currency-abbreviation'>
        <span
          className='currency-button m--left'
          onClick={() => changeCurrency(-1)}
        >
          {'<'}
        </span>
        {currency}
        <span
          className='currency-button m--right'
          onClick={() => changeCurrency(1)}
        >
          {'>'}
        </span>
      </div>
    )
  }
}

Title.propTypes = {
  currency: PropTypes.string,
  changeCurrency: PropTypes.func,
  number: PropTypes.any
}

export default Title
