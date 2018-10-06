import React, { Component } from 'react'
import CalculatorKey from '../components/CalculatorKey'
import { btnConfigs } from '../constants/configs'
import { handleArithmetic, handleOperators } from '../utils/calcLogic'
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
    background: '#eff1f4',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      current: '0',
      newLine: false,
      operation: null,
      previous: '0'
    }
  }

  handleClick(val) {
    let { current } = this.state
    switch (true) {
      case !isNaN(parseInt(val)):
      case val === '.' && current.indexOf('.') === -1:
        this.setState(handleArithmetic(val, this.state))
        break
      default:
        this.setState(handleOperators(val, this.state))
        break
    }
  }

  renderKeys() {
    const { classes } = this.props

    return (
      <div className={classes.calculatorKeys}>
        {btnConfigs.map((val, i) => {
          return <CalculatorKey key={i} val={val} handleClick={(val) => this.handleClick(val)}/>
        })}
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <section className={classes.container}>
        <div className={classes.calculator}>
          <ValueBox val={this.state.current} />
          { this.renderKeys() }
        </div>
      </section>
    )
  }
}

export default injectSheet(styles)(App)
