import React from 'react';
import {Box, Modal} from "@mui/material";
import {apiUrl} from "../../config";

const PicModal = ({pic, closeModal}) => {
  return (
    <Modal
      open={Boolean(pic)}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{transform: 'translate(-50%, -50%)'}}
        width="600px"
        bgcolor="background.paper"

      >
        <img src={apiUrl + '/' + pic} alt="" style={{width: "600px", height: "auto"}}/>
      </Box>
    </Modal>
  );
};

export default PicModal;