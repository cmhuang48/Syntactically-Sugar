import axios from "axios";

// ACTION TYPES
const LOAD_USERS = "LOAD_USERS";
const DELETE_USER = "DELETE_USER";

// THUNK CREATORS
export const loadUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get("/api/users")).data;
    dispatch({
      type: LOAD_USERS,
      users,
    });
  };
};
export const deleteUser = (user, history) => {
  return async (dispatch) => {
    await axios.delete(`/api/users/${user.id}`);
    dispatch({
      type: DELETE_USER,
      user,
    });
    history.push("/users");
  };
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
}
