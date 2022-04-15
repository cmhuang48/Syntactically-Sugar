import axios from 'axios'

const LOAD_CAKES = 'LOAD_CAKES'

export default function(state = [], action) {
  if(action.type === LOAD_CAKES){
    state = action.cakes
  }
  return state
}

export const loadCakes = () => {
  return async (dispatch) => {
    const cakes = (await axios.get('/api/cakes')).data
    dispatch({
      type: LOAD_CAKES,
      cakes
    })
  }
}

