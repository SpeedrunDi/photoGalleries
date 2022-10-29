import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const CLEAR_REGISTER_ERRORS = 'CLEAR_REGISTER_ERRORS';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';

const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, payload: user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, payload: error});
export const clearRegisterErrors = () => ({type: CLEAR_REGISTER_ERRORS});

const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});
export const clearLoginErrors = () => ({type: CLEAR_LOGIN_ERRORS});

const logoutUserRequest = () => ({type: LOGOUT_USER_REQUEST});
const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
const logoutUserFailure = error => ({type: LOGOUT_USER_FAILURE, payload: error});

export const registerUser = userData => {
  return async dispatch => {
    try {
      dispatch(registerUserRequest());

      const response = await axiosApi.post('/users', userData);

      dispatch(registerUserSuccess(response.data));
      toast.success('You have successfully registered!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(registerUserFailure(e.response.data));
      } else {
        dispatch(registerUserFailure({global: 'No internet'}));
      }
      throw e;
    }
  };
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());

      const response = await axiosApi.post('/users/sessions', userData);

      dispatch(loginUserSuccess(response.data.user));
      toast.success('You have successfully logged in!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(loginUserFailure(e.response.data));
      } else {
        dispatch(loginUserFailure({global: 'No internet'}));
      }
      throw e;
    }
  };
};

export const facebookLogin = data => {
  return async dispatch => {
    try {
      const response = await axiosApi.post('users/facebookLogin', data);
      dispatch(loginUserSuccess(response.data.user));
    } catch (e) {
      dispatch(loginUserFailure(e.response.data));
      throw e;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutUserRequest());

      await axiosApi.delete('/users/sessions');

      dispatch(logoutUserSuccess());
      toast.warn('You logout!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      dispatch(logoutUserFailure(e));
    }
  };
};