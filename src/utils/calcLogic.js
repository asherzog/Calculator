export const handleArithmetic = (val, state) => {
  switch (true) {
    case state.operation !== null:
      if (state.newLine) {
        return {
          ...state,
          newLine: false,
          previous: state.current,
          current: state.current === '0' && val === '.' ? state.current + val : val
        }
      } else {
        return {
          ...state,
          current: state.current === '0' && val !== '.' ? val : state.current + val
        }
      }
    default:
      return {
        ...state,
        current: state.current === '0' && val !== '.' ? val : state.current + val
      }
  }
}

export const handleOperators = (val, state) => {
  const current = parseFloat(state.current)
  const previous = parseFloat(state.previous)
  switch (val) {
    case 'C':
      return {
        current: '0',
        newLine: false,
        operation: null,
        previous: '0'
      }
    case '+':
      return {
        ...state,
        newLine: true,
        operation: '+'
      }
    case '-':
      return {
        ...state,
        newLine: true,
        operation: '-'
      }
    case 'X':
      return {
        ...state,
        newLine: true,
        operation: '*'
      }
    case '/':
      return {
        ...state,
        newLine: true,
        operation: '/'
      }
    case '%':
      return {
        ...state,
        current: current / 100,
        newLine: true,
        operation: null,
      }
    case 'SQRT':
      return {
        ...state,
        current: Math.sqrt(current),
        newLine: true,
        operation: null,
      }
    case '<=':
      return {
        ...state,
        current: state.current.length > 1 ? state.current.slice(0, -1) : '0',
        newLine: true,
        operation: null,
      }
    case '=':
      switch (state.operation) {
        case '+':
          return {
            ...state,
            newLine: true,
            current: previous + current,
            previous: previous + current
          }
        case '-':
          return {
            ...state,
            newLine: true,
            current: previous - current,
            previous: previous - current
          }
        case '*':
          return {
            ...state,
            newLine: true,
            current: previous * current,
            previous: previous * current
          }
        case '/':
          return {
            ...state,
            newLine: true,
            current: current !== 0 ? previous / current : 'NaN',
            previous: current !== 0 ? previous / current : 'NaN'
          }
        default:
          return state
      }
    default:
      return state
  }
}
