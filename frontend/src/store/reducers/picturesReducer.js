import {GET_PICTURES_FAILURE, GET_PICTURES_REQUEST, GET_PICTURES_SUCCESS} from "../actions/picturesActions";

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

    default:
      return state;
  }
};