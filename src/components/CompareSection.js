import React, { PropTypes } from 'react'
import {currencyNames} from 'lib'

class CompareSection extends React.Component {
  render () {
    const { currency, number, changeOption } = this.props
    return (
      <div className='section'>
        <div className='currency-abbreviation'>
          <span onClick={() => changeOption(-1)}>{'<'}</span>
          {currency}
          <span onClick={() => changeOption(1)}>{'>'}</span>
        </div>
        <div className='currency-name'>{currencyNames[currency]}</div>
        <div className='currency-number'>{number}</div>
      </div>
    )
  }
}

CompareSection.propTypes = {
  currenct: PropTypes.string,
  options: PropTypes.array,
  changeOption: PropTypes.func,
  number: PropTypes.any
}

export default CompareSection
