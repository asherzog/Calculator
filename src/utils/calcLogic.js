export const handleArithmetic = (val, state) => {
  console.log(val);
  console.log(state);
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
    case '=':
      if (state.operation === null) {
        return state
      }
      return {
        ...state,
        newLine: true,
        operation: null,
        current: String(eval(`${state.previous}${state.operation}${state.current}`)),
        previous: String(eval(`${state.previous}${state.operation}${state.current}`))
      }
    default:
      return state
  }
}
