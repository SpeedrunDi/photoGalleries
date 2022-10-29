import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import {getPictures} from "../../store/actions/picturesActions";
import PictureItem from "../../components/PictureItem/PictureItem";

const Pictures = () => {
  const dispatch = useDispatch();
  const pictures = useSelector(state => state.pictures.pictures);
  const loading = useSelector(state => state.pictures.loading);

  useEffect(() => {
    dispatch(getPictures());
  }, [dispatch]);

  return loading ? <Box width="max-content" marginX="auto"><CircularProgress color="primary"/></Box> : (
    <Grid container direction="column" spacing={2}>
      {
        pictures.length !== 0 ? (
          <Grid item container spacing={3}>
            {pictures.map(picture => (
              <PictureItem
                key={picture._id}
                id={picture._id}
                title={picture.title}
                image={picture.image}
                user={picture.user}
              />
            ))}
          </Grid>
        ) : <Typography variant="h2" textAlign="center">No pictures!</Typography>
      }
    </Grid>
  );
};

export default Pictures;