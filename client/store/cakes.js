import axios from 'axios'

// ACTION TYPES
const LOAD_CAKES = 'LOAD_CAKES'
const CREATE_CAKE = 'CREATE_CAKE'

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

export const createCake = (tiers, flavor, frosting, message) => {
  return async (dispatch) => {
    const cake = (await axios.post('/api/cakes', { tiers, flavor, frosting, message })).data
    dispatch({
      type: CREATE_CAKE,
      cake
    })
  }
}

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case LOAD_CAKES:
      return action.cakes
    case CREATE_CAKE:
      return [...state, action.cake]
    default:
      return state
  }
}