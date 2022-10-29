import axiosApi from "../../axiosApi";

export const GET_PICTURES_REQUEST = 'GET_PICTURES_REQUEST';
export const GET_PICTURES_SUCCESS = 'GET_PICTURES_SUCCESS';
export const GET_PICTURES_FAILURE = 'GET_PICTURES_FAILURE';

const getPicturesRequest = () => ({type: GET_PICTURES_REQUEST});
const getPicturesSuccess = pictures => ({type: GET_PICTURES_SUCCESS, payload: pictures});
const getPicturesFailure = error => ({type: GET_PICTURES_FAILURE, payload: error});

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