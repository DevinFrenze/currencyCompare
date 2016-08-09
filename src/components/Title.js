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
        <div
          className='currency-button m--left'
          onClick={() => changeCurrency(-1)}
        >
          &#9664;
        </div>
        <div>{currency}</div>
        <div
          className='currency-button m--right'
          onClick={() => changeCurrency(1)}
        >
          &#9654;
        </div>
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
