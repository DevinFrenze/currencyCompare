import React, { PropTypes } from 'react'
import {currencyNames} from 'lib'

class BaseSection extends React.Component {
  render () {
    const { currency, number } = this.props
    return (
      <div className='section'>
        <div className='currency-abbreviation'>
          {currency}
        </div>
        <div className='currency-name'>{currencyNames[currency]}</div>
        <div className='currency-number'>{number}</div>
      </div>
    )
  }
}

BaseSection.propTypes = {
  currency: PropTypes.string,
  number: PropTypes.any
}

export default BaseSection
