import React, { Component } from 'react'
import CalculatorKey from '../components/CalculatorKey'
import btnConfigs from '../constants/configs'
import injectSheet from 'react-jss'
import ValueBox from '../components/ValueBox'

const styles = {
  calculator: {
    background: '#9a9ca0',
    border: '1px solid black',
    minWidth: 200,
    width: '30%',
    minHeight: 400,
    height: '80%'
  },
  calculatorKeys: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    height: '80%'
  },
  container: {
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  }
}

class App extends Component {
  renderKeys() {
    const { classes } = this.props

    return (
      <div className={classes.calculatorKeys}>
        {btnConfigs.map((val, i) => {
          return <CalculatorKey key={i} val={val} handleClick={(e) => console.log(e)}/>
        })}
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <section className={classes.container}>
        <div className={classes.calculator}>
          <ValueBox val={0} />
          { this.renderKeys() }
        </div>
      </section>
    )
  }
}

export default injectSheet(styles)(App)
