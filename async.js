const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const reduxThunk = require("redux-thunk");
const axios = require("axios");
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

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
const store = createStore(reducer, applyMiddleware(reduxThunk, logger));

//craete function async
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const userId = res.data.map((user) => user.id);
        dispatch(fetchUserSuccess(userId));
      })
      .catch((err) => {
        dispatch(fetchUserFailure(err));
      });
  };
};

store.dispatch(fetchUsers());
