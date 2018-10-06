import React from 'react';
import ReactDOM from 'react-dom';
import App from '../pages/App';
import * as CalcLogic from '../utils/calcLogic'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
})

function setScene(previous, current, operation, newLine) {
  return {
    current,
    newLine,
    operation,
    previous
  }
}

describe('calculator logic', () => {

  const tests = [
    {initial: setScene(1, 1, '+', false), end: setScene(2, 2, '+', true)},
    {initial: setScene('100', '150', '+', false), end: setScene(250, 250, '+', true)},
    {initial: setScene(0.1, 0.4, '+', false), end: setScene(0.5, 0.5, '+', true)},
    {initial: setScene(1, 1, '-', false), end: setScene(0, 0, '-', true)},
    {initial: setScene(0, 1, '-', false), end: setScene(-1, -1, '-', true)},
    {initial: setScene(10, 0.1, '-', false), end: setScene(9.9, 9.9, '-', true)},
    {initial: setScene(2, 2, '*', false), end: setScene(4, 4, '*', true)},
    {initial: setScene(2, -2, '*', false), end: setScene(-4, -4, '*', true)},
    {initial: setScene(0.2, 0.3, '*', false), end: setScene(0.06, 0.06, '*', true)},
    {initial: setScene(10, 2, '/', false), end: setScene(5, 5, '/', true)},
    {initial: setScene(10, 0, '/', false), end: setScene('NaN', 'NaN', '/', true)},
    {initial: setScene(10, 0, null, false), end: setScene(10, 0, null, false)},
  ]

  it('should handle base operations', () => {
    tests.forEach(test => {
      expect(CalcLogic.handleOperators('=', test.initial))
      .toEqual(test.end)
    })
  })

  it('should handle clear', () => {
    tests.forEach(test => {
      expect(CalcLogic.handleOperators('C', test.initial))
      .toEqual(setScene('0', '0', null, false))
    })
  })

  it('should handle delete', () => {
    expect(CalcLogic.handleOperators('<=', tests[1].initial))
    .toEqual(setScene('100', '15', null, true))

    expect(CalcLogic.handleOperators('<=', setScene('1', '9', null, false)))
    .toEqual(setScene('1', '0', null, true))
  })

  it('should handle percentage', () => {
    expect(CalcLogic.handleOperators('%', tests[1].initial))
    .toEqual(setScene('100', 1.5, null, true))

    expect(CalcLogic.handleOperators('%', setScene('1', '9', null, false)))
    .toEqual(setScene('1', 0.09, null, true))
  })

  it('should handle SQRT', () => {
    expect(CalcLogic.handleOperators('SQRT', setScene('1', '100', null, false)))
    .toEqual(setScene('1', 10, null, true))
  })
})
