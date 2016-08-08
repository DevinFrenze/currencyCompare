import React, { PropTypes } from 'react'

class Circle extends React.Component {
  render () {
    const { flip, groupIndex, group, diameter } = this.props
    // let gI = groupIndex === 1 ? 0 : groupIndex === 0 ? 1 : groupIndex

    const original = group === 0 ? 0 : Math.floor(groupIndex / group)
    const translateAmount = group === 0 ? 0 : groupIndex % group

    const originalAngle = original * Math.PI / 3
    const translateAngle = (original * Math.PI / 3) + (2 * Math.PI / 3)
    const offset = diameter * group

    let top  = (diameter / -2) + offset * Math.sin(originalAngle) + diameter * translateAmount * Math.sin(translateAngle)
    let left = (diameter / -2) + offset * Math.cos(originalAngle) + diameter * translateAmount * Math.cos(translateAngle)

    return (
      <div
        className='circle'
        style={{
          width: diameter + 'px',
          height: diameter + 'px',
          top: top,
          left: left
        }}
      >
        {groupIndex}
      </div>
    )
  }
}

Circle.propTypes = {
  groupIndex: PropTypes.number,
  group: PropTypes.number,
  diameter: PropTypes.number,
  flip: PropTypes.bool
}

export default Circle
