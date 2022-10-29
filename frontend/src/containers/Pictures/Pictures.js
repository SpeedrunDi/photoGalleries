import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import {getPictures, publishPicture} from "../../store/actions/picturesActions";
import PictureItem from "../../components/PictureItem/PictureItem";
import PicModal from "../../components/PicModal/PicModal";

const Pictures = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const pictures = useSelector(state => state.pictures.pictures);
  const loading = useSelector(state => state.pictures.loading);

  const [pic, setPic] = useState(null);

  useEffect(() => {
    dispatch(getPictures());
  }, [dispatch]);

  const openModal = image => {
    setPic(image);
  };

  const closeModal = () => {
    setPic(null);
  };
  
  const onPublish = async id => {
    await dispatch(publishPicture(id));
    dispatch(getPictures());
  };

  return loading ? <Box width="max-content" marginX="auto"><CircularProgress color="primary"/></Box> : (
    <>
      <Grid container direction="column" spacing={2}>
        {
          pictures.length !== 0 ? (
            <Grid item container spacing={3}>
              {pictures.map(picture => (
                <PictureItem
                  key={picture._id}
                  picture={picture}
                  openModal={openModal}
                  onPublish={onPublish}
                  currentUser={user}
                />
              ))}
            </Grid>
          ) : <Typography variant="h2" textAlign="center">No pictures!</Typography>
        }
      </Grid>
      <PicModal pic={pic} closeModal={closeModal}/>
    </>
  );
};

export default Pictures;