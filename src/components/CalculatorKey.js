import React, { Component } from 'react'
import injectSheet from 'react-jss'

const styles = {
  container: {
    alignItems: 'center',
    background: 'orange',
    border: '1px solid black',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '1.25em',
    justifyContent: 'center',
    width: '24%'
  },
  num: {
    background: '#d3d9e2'
  }
}

class CalculatorKey extends Component {

  styleCheck(val) {
    const { classes } = this.props
    if (typeof(val) === 'number' || val === '.' || val === '=') {
      return classes.num
    } else {
      return null
    }
  }

  render() {
    const { classes, handleClick, val } = this.props

    return (
      <div
        className={`${classes.container} ${this.styleCheck(val)}`}
        onClick={(e) => handleClick(e.target.id)}
        id={val}>
          {val}
      </div>
    )
  }
}

export default injectSheet(styles)(CalculatorKey)
