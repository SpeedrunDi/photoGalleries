import {
  CREATE_LINK_PICTURE_FAILURE,
  CREATE_LINK_PICTURE_REQUEST, CREATE_LINK_PICTURE_SUCCESS,
  CREATE_PICTURE_FAILURE,
  CREATE_PICTURE_REQUEST,
  CREATE_PICTURE_SUCCESS,
  DELETE_PICTURE_FAILURE,
  DELETE_PICTURE_REQUEST,
  DELETE_PICTURE_SUCCESS,
  GET_PICTURES_FAILURE,
  GET_PICTURES_REQUEST,
  GET_PICTURES_SUCCESS,
  GET_USER_PICTURES_FAILURE,
  GET_USER_PICTURES_REQUEST,
  GET_USER_PICTURES_SUCCESS, PUBLISH_PICTURE_FAILURE, PUBLISH_PICTURE_REQUEST, PUBLISH_PICTURE_SUCCESS
} from "../actions/picturesActions";

const initialState = {
  pictures: [],
  loading: false,
  error: null,
  deleteLoading: false,
  deleteError: null
};

const picturesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PICTURES_REQUEST:
      return {...state, error: null, loading: true};
    case GET_PICTURES_SUCCESS:
      return {...state, loading: false, pictures: action.payload};
    case GET_PICTURES_FAILURE:
      return {...state, loading: false, error: action.payload};

    case GET_USER_PICTURES_REQUEST:
      return {...state, loading: true, error: null};
    case GET_USER_PICTURES_SUCCESS:
      return {...state, loading: false, pictures: action.payload};
    case GET_USER_PICTURES_FAILURE:
      return {...state, loading: false, error: action.payload};

    case CREATE_PICTURE_REQUEST:
      return {...state, loading: true, error: null};
    case CREATE_PICTURE_SUCCESS:
      return {...state, loading: false};
    case CREATE_PICTURE_FAILURE:
      return {...state, loading: false, error: action.payload};

    case PUBLISH_PICTURE_REQUEST:
      return {...state, loading: true, error: null};
    case PUBLISH_PICTURE_SUCCESS:
      return {...state, loading: false};
    case PUBLISH_PICTURE_FAILURE:
      return {...state, loading: false, error: action.payload};

    case CREATE_LINK_PICTURE_REQUEST:
      return {...state, deleteLoading: true, deleteError: null};
    case CREATE_LINK_PICTURE_SUCCESS:
      return {...state, deleteLoading: false};
    case CREATE_LINK_PICTURE_FAILURE:
      return {...state, deleteLoading: false, deleteError: action.payload};

    case DELETE_PICTURE_REQUEST:
      return {...state, deleteLoading: true, deleteError: null};
    case DELETE_PICTURE_SUCCESS:
      return {...state, deleteLoading: false};
    case DELETE_PICTURE_FAILURE:
      return {...state, deleteLoading: false, deleteError: action.payload};

    default:
      return state;
  }
};

export default picturesReducer;