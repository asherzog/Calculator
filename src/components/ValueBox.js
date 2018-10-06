import React, { Component } from 'react'
import injectSheet from 'react-jss'

const styles = {
  digits: {
    marginRight: 10,
    overflow: 'scroll'
  },
  value: {
    alignItems: 'flex-end',
    display: 'flex',
    fontSize: '2.5vw',
    height: '20%',
    justifyContent: 'flex-end',
    width: '100%'
  }
}

class ValueBox extends Component {
  render() {
    const { classes, val } = this.props

    return (
      <div className={classes.value}>
        <h2 className={classes.digits}>
          {val}
        </h2>
      </div>
    )
  }
}

export default injectSheet(styles)(ValueBox)
