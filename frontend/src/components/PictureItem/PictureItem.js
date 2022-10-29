import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {apiUrl} from "../../config";

const PictureItem = ({id, title, image, user, openModal}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={3}>
      <Card sx={{height: '100%'}}>
        <CardMedia
          title={title}
          image={apiUrl + '/' + image}
          sx={{paddingTop: '56.25%', height: "0", cursor: "pointer"}}
          onClick={() => openModal(image)}
        />
        <CardHeader
          title={title}
          sx={{textAlign: "center", textTransform: "capitalize", cursor: "pointer"}}
          onClick={() => openModal(image)}
        />
        <CardActions sx={{justifyContent: "center"}}>
          <Typography>
            {user.displayName}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
};

PictureItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired
};

export default PictureItem;