import axios from 'axios'

// ACTION TYPES
const LOAD_CUPCAKES = 'LOAD_CUPCAKES'
const CREATE_CUPCAKE = 'CREATE_CUPCAKE'

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

export const createCupcake = (flavor, frosting, message) => {
  return async (dispatch) => {
    const cupcake = (await axios.post('/api/cupcakes', { flavor, frosting,  message })).data
    dispatch({
      type: CREATE_CUPCAKE,
      cupcake
    })
  }
}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_CUPCAKES:
      return action.cupcakes
    case CREATE_CUPCAKE:
      return [...state, action.cupcake]
    default:
      return state
  }
}