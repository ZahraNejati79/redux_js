const redux = require("redux");
const createStore = redux.createStore;

//action
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

//create action

function fetchUserRequest() {
  return {
    type: FETCH_USER_REQUEST,
  };
}

function fetchUserFailure(error) {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
}

function fetchUserSuccess(users) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
}

// reducer

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        loading: true,
        error: "",
        data: [],
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        error: action.payload,
        data: [],
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        error: "",
        data: action.payload,
      };
  }
};

//store
const store = createStore(reducer);
console.log(store);
