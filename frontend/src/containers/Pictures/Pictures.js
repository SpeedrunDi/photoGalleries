import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPictures} from "../../store/actions/picturesActions";
import {Box, CircularProgress} from "@mui/material";

const Pictures = () => {
  const dispatch = useDispatch();
  const pictures = useSelector(state => state.pictures.pictures);
  const loading = useSelector(state => state.pictures.loading);

  useEffect(() => {
    dispatch(getPictures());
  }, [dispatch]);

  return loading ? <Box width="max-content" marginX="auto"><CircularProgress color="primary"/></Box> : (
    <div>

    </div>
  );
};

export default Pictures;