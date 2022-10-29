import React, {useEffect, useState} from 'react';
import {Alert, Box, Card, CardActions, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
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

const PictureItem = ({picture, openModal, currentUser, loading, onDelete, onPublish, onCreateLink}) => {
  const {classes} = useStyles();
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  }, [copy]);

  let publish;
  let cursor = "pointer";
  if (currentUser && currentUser.role === 'admin') {
    publish = () => onPublish(picture._id);
  } else if (currentUser && currentUser.role === 'user') {
    cursor = "stroke";
  }

  let link;
  if (picture.token) {
    link = apiUrl + '/' + picture.image;
  }

  let buttons;
  if (currentUser && currentUser._id === picture.user._id) {
    buttons = (
      <>
        <ButtonWithProgress
          loading={loading}
          disabled={loading}
          variant="outlined"
          color="error"
          onClick={() => onDelete(picture._id)}
        >
          Delete
        </ButtonWithProgress>
        {copy && (
          <Alert severity="success">
            Copied!
          </Alert>
        )}
        {
          picture.isPublished === false && (
            link ? <Typography
              onClick={() => [navigator.clipboard.writeText(link), setCopy(true)]}
            >
              {link}
            </Typography> : (
              <ButtonWithProgress
                loading={loading}
                disabled={loading}
                variant="outlined"
                onClick={() => onCreateLink(picture._id)}
              >
                Create Link
              </ButtonWithProgress>
            )
          )
        }
      </>
    );
  } else if (currentUser && currentUser.role === 'admin') {
    buttons = (
      <ButtonWithProgress
        loading={loading}
        disabled={loading}
        variant="outlined"
        color="error"
        onClick={() => onDelete(picture._id)}
      >
        Delete
      </ButtonWithProgress>
    );
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
        ) : (
          <CardActions sx={{justifyContent: "center", flexDirection: "column"}}>
            {buttons}
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
  onPublish: PropTypes.func,
  onCreateLink: PropTypes.func
};

export default PictureItem;