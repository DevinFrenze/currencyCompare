import React, { PropTypes } from 'react'
import 'styles/circle'
import ReactDom from 'react-dom'
import {TimelineLite} from 'gsap'
import _ from 'lodash'

class Circle extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.getState(props)
  }

  componentWillReceiveProps (nextProps) {
    const state = this.getState(nextProps)
    if (!_.isEqual(state, this.state) || nextProps.diameter !== this.props.diameter)
      this.animate(state, nextProps)
  }

  componentDidMount () {
    this.animate()
  }

  getState (props) {
    const { flip, groupIndex, group, diameter, index } = props
    let gI = group !== 0 && groupIndex === 1 ? 0 : group !== 0 && groupIndex === 0 ? 1 : groupIndex

    const original = group === 0 ? 0 : Math.floor(gI / group)
    const translateAmount = group === 0 ? 0 : gI % group

    const originalAngle = original * Math.PI / 3
    const translateAngle = (original * Math.PI / 3) + (2 * Math.PI / 3)
    const offset = diameter * group

    let top  = (diameter / -2) + offset * Math.sin(originalAngle) + diameter * translateAmount * Math.sin(translateAngle)
    let left = (diameter / -2) + offset * Math.cos(originalAngle) + diameter * translateAmount * Math.cos(translateAngle)

    return { top, left }
  }

  animate (state = this.state, props = this.props) {
    const {top, left} = state
    const {diameter} = props
    let timeline = new TimelineLite({})
    timeline.to(this._circle, 0.5 + Math.random(), {
      ease: Power2.easeOut,
      x: left,
      y: top,
      height: diameter * 0.85,
      width: diameter * 0.85,
      opacity: 1
    })
  }

  render () {
    let className = 'circle'
    if (this.props.flip) className += ' m--flip'
    return <div className={className} ref={(r) => this._circle = r}/>
  }
}

Circle.propTypes = {
  groupIndex: PropTypes.number,
  group: PropTypes.number,
  diameter: PropTypes.number,
  flip: PropTypes.bool,
  index: PropTypes.number
}

export default Circle
