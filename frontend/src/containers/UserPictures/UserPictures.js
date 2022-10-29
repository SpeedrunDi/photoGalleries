import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import {createLinkPicture, deletePicture, getUserPictures, publishPicture} from "../../store/actions/picturesActions";
import PictureItem from "../../components/PictureItem/PictureItem";
import PicModal from "../../components/PicModal/PicModal";

const UserPictures = ({match}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const pictures = useSelector(state => state.pictures.pictures);
  const loading = useSelector(state => state.pictures.loading);
  const deleteLoading = useSelector(state => state.pictures.deleteLoading);

  const [pic, setPic] = useState(null);

  useEffect(() => {
    dispatch(getUserPictures(match.params.id));
  }, [dispatch, match.params.id]);

  const openModal = image => {
    setPic(image);
  };

  const closeModal = () => {
    setPic(null);
  };

  const onPublish = async id => {
    await dispatch(publishPicture(id));
    dispatch(getUserPictures(match.params.id));
  };

  const onDeletePicture = async id => {
    await dispatch(deletePicture(id));
    dispatch(getUserPictures(match.params.id));
  };

  const onCreateLinkOnPicture = id => {
    dispatch(createLinkPicture(id));
  };

  return loading ? <Box width="max-content" marginX="auto"><CircularProgress color="primary"/></Box> : (
    <>
      <Grid container direction="column" spacing={2}>
        {
          pictures.length !== 0 ? (
              <>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {pictures[0].user.displayName}'s gallery
                  </Typography>
                </Grid>
                <Grid item container spacing={3}>
                  {pictures.map(picture => (
                    <PictureItem
                      key={picture._id}
                      picture={picture}
                      openModal={openModal}
                      currentUser={user}
                      onDelete={onDeletePicture}
                      loading={deleteLoading}
                      onPublish={onPublish}
                      onCreateLink={onCreateLinkOnPicture}
                    />
                  ))}
                </Grid>
              </>
          ) : <Typography variant="h2" textAlign="center">No pictures!</Typography>
        }
      </Grid>
      <PicModal pic={pic} closeModal={closeModal}/>
    </>
  );
};

export default UserPictures;