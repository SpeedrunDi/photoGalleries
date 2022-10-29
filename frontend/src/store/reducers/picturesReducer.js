import {
  CREATE_PICTURE_FAILURE,
  CREATE_PICTURE_REQUEST, CREATE_PICTURE_SUCCESS,
  GET_PICTURES_FAILURE,
  GET_PICTURES_REQUEST,
  GET_PICTURES_SUCCESS
} from "../actions/picturesActions";

const initialState = {
  pictures: [],
  loading: false,
  error: null
};

const picturesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PICTURES_REQUEST:
      return {...state, error: null, loading: true};
    case GET_PICTURES_SUCCESS:
      return {...state, loading: false, pictures: action.payload};
    case GET_PICTURES_FAILURE:
      return {...state, loading: false, error: action.payload};

    case CREATE_PICTURE_REQUEST:
      return {...state, loading: true, error: null};
    case CREATE_PICTURE_SUCCESS:
      return {...state, loading: false};
    case CREATE_PICTURE_FAILURE:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};

export default picturesReducer;