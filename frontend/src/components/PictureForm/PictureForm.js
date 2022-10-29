import React, {useState} from 'react';
import {Grid} from "@mui/material";
import FormElement from "../UI/Form/FormElement/FormElement";
import FileInput from "../UI/Form/FileInput/FileInput";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";

const PictureForm = ({error, loading, onSubmit}) => {
  const [state, setState] = useState({
    title: "",
    image: ""
  });

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(state).forEach(key => {
      formData.append(key, state[key]);
    });

    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setState(prevState => ({...prevState, [name]: file}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid
        container
        maxWidth="md"
        textAlign="center"
        marginX="auto"
        direction="column"
        rowSpacing={2}
      >

        <FormElement
          required={true}
          label="Title"
          onChange={inputChangeHandler}
          value={state.title}
          name="title"
          error={getFieldError('title')}
        />

        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileChangeHandler}
            error={getFieldError('image')}
          />
        </Grid>

        <Grid item>
          <ButtonWithProgress
            type="submit"
            color="primary"
            variant="contained"
            loading={loading}
            disabled={loading}
          >
            Create
          </ButtonWithProgress>
        </Grid>
      </Grid>
    </form>
  );
};

export default PictureForm;