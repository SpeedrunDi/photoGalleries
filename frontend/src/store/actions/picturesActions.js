import axiosApi from "../../axiosApi";

export const GET_PICTURES_REQUEST = 'GET_PICTURES_REQUEST';
export const GET_PICTURES_SUCCESS = 'GET_PICTURES_SUCCESS';
export const GET_PICTURES_FAILURE = 'GET_PICTURES_FAILURE';

export const CREATE_PICTURE_REQUEST = 'CREATE_PICTURE_REQUEST';
export const CREATE_PICTURE_SUCCESS = 'CREATE_PICTURE_SUCCESS';
export const CREATE_PICTURE_FAILURE = 'CREATE_PICTURE_FAILURE';

const getPicturesRequest = () => ({type: GET_PICTURES_REQUEST});
const getPicturesSuccess = pictures => ({type: GET_PICTURES_SUCCESS, payload: pictures});
const getPicturesFailure = error => ({type: GET_PICTURES_FAILURE, payload: error});

const createPicturesRequest = () => ({type: CREATE_PICTURE_REQUEST});
const createPicturesSuccess = () => ({type: CREATE_PICTURE_SUCCESS});
const createPicturesFailure = error => ({type: CREATE_PICTURE_FAILURE, payload: error});

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