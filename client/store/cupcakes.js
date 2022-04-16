import axios from 'axios'

// ACTION TYPES
const LOAD_CUPCAKES = 'LOAD_CUPCAKES'

// THUNK CREATORS
export const loadCupcakes = () => {
  return async (dispatch) => {
    const cupcakes = (await axios.get('/api/cupcakes')).data
    dispatch({
      type: LOAD_CUPCAKES,
      cupcakes
    })
  }
}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_CUPCAKES:
      return action.cupcakes
    default:
      return state
  }
}