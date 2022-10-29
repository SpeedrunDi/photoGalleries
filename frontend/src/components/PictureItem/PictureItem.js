import React from 'react';
import {Box, Card, CardActions, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const useStyles = makeStyles()(() => ({
  link: {
    color: 'inherit',
    '&:hover': {
      color: 'inherit'
    }
  }
}));

const PictureItem = ({picture, openModal, currentUser, loading, onDelete, onPublish}) => {
  const {classes} = useStyles();

  let publish;
  let cursor = "pointer";
  if (currentUser && currentUser.role === 'admin') {
    publish = () => onPublish(picture._id);
  } else if (currentUser && currentUser.role === 'user') {
    cursor = "stroke";
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{height: '100%', position: "relative"}}>
        {
          picture.isPublished === false &&
          <Box
            position="absolute"
            top="20px"
            right="5px"
          >
            <Typography
              variant="span"
              color="white"
              padding="3px 5px"
              borderRadius="5px"
              sx={{background: "rgba(0, 0, 0, 0.5)", cursor: cursor}}
              onClick={publish}
            >
              unpublished
            </Typography>
          </Box>
        }
        <CardMedia
          title={picture.title}
          image={apiUrl + '/' + picture.image}
          sx={{paddingTop: '56.25%', height: "0", cursor: "pointer"}}
          onClick={() => openModal(picture.image)}
        />
        <CardHeader
          title={picture.title}
          sx={{textAlign: "center", textTransform: "capitalize", cursor: "pointer", padding: "0", margin: "16px"}}
          onClick={() => openModal(picture.image)}
        />
        {!onDelete ? (
          <CardActions sx={{justifyContent: "center"}}>
            <Typography variant="h6">
              <Link to={"/users/" + picture.user._id} className={classes.link}>
                {picture.user.displayName}
              </Link>
            </Typography>
          </CardActions>
        ) : currentUser && currentUser._id === picture.user._id || currentUser.role === 'admin' && (
          <CardActions sx={{justifyContent: "center"}}>
            <ButtonWithProgress loading={loading} disabled={loading} variant="outlined" color="error" onClick={() => onDelete(picture._id)}>
              Delete
            </ButtonWithProgress>
            {
              picture.isPublished === false && (
                <ButtonWithProgress loading={loading} disabled={loading} variant="outlined" >
                  Create Link
                </ButtonWithProgress>
              )
            }
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

PictureItem.propTypes = {
  picture: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  onPublish: PropTypes.func
};

export default PictureItem;