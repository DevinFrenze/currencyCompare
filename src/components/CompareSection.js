import React, { PropTypes } from 'react'
import {currencyNames, totalArea} from 'lib/constants'
import Circle from './Circle'

class CompareSection extends React.Component {
  render () {
    const { currency, number, changeOption } = this.props
    return (
      <div className='section'>
        <div className='header'>
          <div className='currency-abbreviation'>
            <span onClick={() => changeOption(-1)}>{'<'}</span>
            {currency}
            <span onClick={() => changeOption(1)}>{'>'}</span>
          </div>
          <div className='currency-name'>{currencyNames[currency]}</div>
        </div>
        <div className='currency-number'>{number}</div>
        {number !== '?' && this.renderCircles()}
      </div>
    )
  }

  renderCircles () {
    const { number } = this.props
    const circles = []
    let group = 0, lastGroupBoundary = 0, groupBoundary = 1

    for (let i = 0; i < number; i++) {
      if (i >= groupBoundary) {
        group++
        lastGroupBoundary = groupBoundary
        groupBoundary += group * 6
      }
      circles.push(
        <Circle
          key={i} 
          groupIndex={i - lastGroupBoundary}
          group={group}
          diameter={Math.sqrt(totalArea / number)}
        />
      )
    }
    return (
      <div className='circle-container'>
        {circles}
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
