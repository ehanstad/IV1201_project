const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
