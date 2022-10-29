import axiosApi from "../../axiosApi";

export const GET_PICTURES_REQUEST = 'GET_PICTURES_REQUEST';
export const GET_PICTURES_SUCCESS = 'GET_PICTURES_SUCCESS';
export const GET_PICTURES_FAILURE = 'GET_PICTURES_FAILURE';

export const GET_USER_PICTURES_REQUEST = 'GET_USER_PICTURES_REQUEST';
export const GET_USER_PICTURES_SUCCESS = 'GET_USER_PICTURES_SUCCESS';
export const GET_USER_PICTURES_FAILURE = 'GET_USER_PICTURES_FAILURE';

export const CREATE_PICTURE_REQUEST = 'CREATE_PICTURE_REQUEST';
export const CREATE_PICTURE_SUCCESS = 'CREATE_PICTURE_SUCCESS';
export const CREATE_PICTURE_FAILURE = 'CREATE_PICTURE_FAILURE';

export const DELETE_PICTURE_REQUEST = 'DELETE_PICTURE_REQUEST';
export const DELETE_PICTURE_SUCCESS = 'DELETE_PICTURE_SUCCESS';
export const DELETE_PICTURE_FAILURE = 'DELETE_PICTURE_FAILURE';

const getPicturesRequest = () => ({type: GET_PICTURES_REQUEST});
const getPicturesSuccess = pictures => ({type: GET_PICTURES_SUCCESS, payload: pictures});
const getPicturesFailure = error => ({type: GET_PICTURES_FAILURE, payload: error});

const getUserPicturesRequest = () => ({type: GET_USER_PICTURES_REQUEST});
const getUserPicturesSuccess = pictures => ({type: GET_USER_PICTURES_SUCCESS, payload: pictures});
const getUserPicturesFailure = error => ({type: GET_USER_PICTURES_FAILURE, payload: error});

const createPicturesRequest = () => ({type: CREATE_PICTURE_REQUEST});
const createPicturesSuccess = () => ({type: CREATE_PICTURE_SUCCESS});
const createPicturesFailure = error => ({type: CREATE_PICTURE_FAILURE, payload: error});

const deletePicturesRequest = () => ({type: DELETE_PICTURE_REQUEST});
const deletePicturesSuccess = () => ({type: DELETE_PICTURE_SUCCESS});
const deletePicturesFailure = error => ({type: DELETE_PICTURE_FAILURE, payload: error});

export const getPictures = () => {
  return async dispatch => {
    try {
      dispatch(getPicturesRequest());
      const {data} = await axiosApi('/pictures');

      dispatch(getPicturesSuccess(data));
    } catch (e) {
      dispatch(getPicturesFailure(e));
    }
  };
};

export const getUserPictures = id => {
  return async dispatch => {
    try {
      dispatch(getUserPicturesRequest());
      const {data} = await axiosApi('/pictures/users/' + id);

      dispatch(getUserPicturesSuccess(data));
    } catch (e) {
      dispatch(getUserPicturesFailure(e));
    }
  };
};

export const createPicture = pictureData => {
  return async dispatch => {
    try {
      dispatch(createPicturesRequest());
      await axiosApi.post('/pictures', pictureData);

      dispatch(createPicturesSuccess());
    } catch (e) {
      dispatch(createPicturesFailure(e.response.data));
      throw e;
    }
  };
};

export const deletePicture = id => {
  return async dispatch => {
    try {
      dispatch(deletePicturesRequest());
      await axiosApi.delete('pictures/' + id);

      dispatch(deletePicturesSuccess());
    } catch (e) {
      dispatch(deletePicturesFailure(e));
    }
  };
};