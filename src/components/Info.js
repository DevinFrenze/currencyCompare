import React, { PropTypes } from 'react'
import 'styles/info'

class Info extends React.Component {
  render () {
    return (
      <div className='info-container'>
        <div className='info'>
          This currency comparer takes the proportion of two currencies and simplifies it to a whole number ratio.
          Check out the source <a href='https://github.com/DevinFrenze/currencyCompare'>here</a>.
        </div>
      </div>
    )
  }
}

export default Info
