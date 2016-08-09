import React, { PropTypes } from 'react'
import CircleContainer from './CircleContainer'
import Title from './Title'
import CenterNumber from './CenterNumber'

class Section extends React.Component {
  render () {
    return (
      <div className='section'>
        <Title {...this.props} />
        <CenterNumber {...this.props} />
        <CircleContainer {...this.props}/>
      </div>
    )
  }
}

Section.propTypes = {
  currenct: PropTypes.string,
  options: PropTypes.array,
  changeCurrency: PropTypes.func,
  number: PropTypes.any
}

export default Section
