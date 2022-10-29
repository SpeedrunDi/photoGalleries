import React, {useEffect} from 'react';
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import PictureForm from "../../components/PictureForm/PictureForm";
import {createPicture} from "../../store/actions/picturesActions";

const AddPicture = ({history}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const loading = useSelector(state => state.pictures.loading);
  const error = useSelector(state => state.pictures.error);

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [history, user]);

  const onProductFormSubmit = async pictureData => {
    await dispatch(createPicture(pictureData));
    history.push('/');
  };

  return (
    <>
      <Typography
        textAlign="center"
        marginBottom="20px"
        variant="h4"
      >
        New product
      </Typography>
      <PictureForm
        error={error}
        loading={loading}
        onSubmit={onProductFormSubmit}
      />
    </>
  );
};

export default AddPicture;