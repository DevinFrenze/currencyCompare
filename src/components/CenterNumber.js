import React, { PropTypes } from 'react'
import {TweenMax} from 'gsap'
import 'styles/number'

class CenterNumber extends React.Component {
  componentDidMount() {
    let rotation = '+=360'
    if (this.props.flip) rotation = '-=360'
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.number !== this.props.number) {
      if (nextProps.number === '?') {
        TweenMax.to(this._number, 0.2, {
          scale: 0,
          ease: Power0.easeNone
        })
      } else if (this.props.number === '?') {
        TweenMax.to(this._number, 0.5, {
          scale: 1,
          ease: Power0.easeNone
        })
      } else {
        TweenMax.from(this._number, 0.5, {
          scale: 0,
          ease: Power0.easeNone
        })
      }
    }
  }

  render () {
    const { number, flip} = this.props
    let className = 'currency-number'
    if (flip) className += ' m--flip';
    return (
      <div
        className={className}
        ref={(r) => this._number = r}
      >
        {number !== '?' && number}
      </div>
    )
  }
}

CenterNumber.propTypes = {
  number: PropTypes.any,
  flip: PropTypes.bool
}

export default CenterNumber
