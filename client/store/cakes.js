import axios from 'axios'

// ACTION TYPES
const LOAD_CAKES = 'LOAD_CAKES'

// THUNK CREATORS
export const loadCakes = () => {
  return async (dispatch) => {
    const cakes = (await axios.get('/api/cakes')).data
    dispatch({
      type: LOAD_CAKES,
      cakes
    })
  }
}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_CAKES:
      return action.cakes
    default:
      return state
  }
}