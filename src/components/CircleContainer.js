import React, { PropTypes } from 'react'
import Circle from './Circle'
import {TweenMax} from 'gsap'

class CircleContainer extends React.Component {
  componentDidMount () {
    let rotation = '-=360'
    if (this.props.flip) rotation = '+=360'
    TweenMax.to(this._container, 100, {
      rotation,
      repeat: -1,
      ease: Power0.easeNone
    })
  }
  render () {
    const { flip, number, totalArea } = this.props
    const circles = []
    const diameter = Math.sqrt(totalArea / number)
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
          index={i}
          group={group}
          flip={flip}
          diameter={diameter}
        />
      )
    }
    return (
      <div className='circle-container-container'>
        <div className='circle-container' ref={(r) => this._container = r}>
          {circles}
        </div>
      </div>
    )
  }
}

CircleContainer.propTypes = {
  number: PropTypes.any,
  flip: PropTypes.bool,
  totalArea: PropTypes.number
}

export default CircleContainer
