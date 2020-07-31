// import React from "react";

// const AddApplication = () => {
//   return <div>Add an application here</div>;
// };

// export default AddApplication;

import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PostAddIcon from "@material-ui/icons/PostAdd";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),

    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#415a77",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function AddApplication(props) {
  const classes = useStyles();

  const [applicationForm, setApplicationForm] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false)
  const [state, setState] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    listing_url: "",
    status: "",
    date_applied: "",
  });


  useEffect(() => {
    console.log(props.application.job_listing)
    if(props.application.job_listing){
        setIsEditForm(true)
        setState({
          title: props.application.job_listing.title,
          company: props.application.job_listing.company,
          location: props.application.job_listing.location,
          description: props.application.job_listing.description,
          listingUrl: props.application.job_listing.listing_url,
          status: props.application.status,
          dateApplied: props.application.date_applied
        })
    }
  },[])

  const displayFormHandler = () => {
    setApplicationForm((prevState) => {
      return !prevState;
    });
  };

  const changeHandler = (e) => {
    e.persist();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApplicationUpdate = (e) => {
    e.preventDefault()
    props.handleApplicationUpdate(state)
  }

  const handleApplicationCreation = (e) => {
    e.preventDefault();
    let user = window.localStorage.getItem("sojohub");
    const token = JSON.parse(user).userToken;
    const payLoad = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      body: JSON.stringify(state),
    };
    fetch("http://localhost:3000/applications", payLoad)
      .then((r) => r.json())
      .then((newApplication) => {
        props.addApplication(newApplication);
      });
      displayFormHandler()
  };

  return (
    <>
      {applicationForm ? (
        <Container component="main" maxWidth="lg">
          <Button
            onClick={displayFormHandler}
            variant="contained"
            color="primary"
            className="add-app-button"
          >
            Hide Application Form
          </Button>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
              <PostAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            {isEditForm ? "Edit Application" : "Create A New Application"}
            </Typography>
            <form
              onSubmit={isEditForm ? handleApplicationUpdate : handleApplicationCreation}
              className={classes.form}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="title"
                name="title"
                autoComplete="title"
                autoFocus
                onChange={changeHandler}
                value={state.title}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="company"
                label="company"
                name="company"
                autoComplete="company"
                autoFocus
                onChange={changeHandler}
                value={state.company}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="location"
                label="location"
                name="location"
                autoComplete="location"
                autoFocus
                onChange={changeHandler}
                value={state.location}
              />
              <TextField
                variant="outlined"
                margin="normal"
                // required
                fullWidth
                multiline
                id="description"
                label="description"
                name="description"
                autoComplete="description"
                autoFocus
                onChange={changeHandler}
                value={state.description}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="listing_url"
                label="Listing URL"
                name="listing_url"
                autoComplete="listing_url"
                autoFocus
                onChange={changeHandler}
                value={state.listing_url}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  id="status"
                  labelId="Status"
                  name="status"
                  value={state.status}
                  onChange={changeHandler}
                >
                  <MenuItem value="applied">Applied</MenuItem>
                  <MenuItem value="selected for Interview">
                    Selected for Interview
                  </MenuItem>
                  <MenuItem value="interviewed">Interviewed</MenuItem>
                  <MenuItem value="accepted">Received Offer</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              <br></br>
              <TextField
                id="date_applied"
                label="date applied"
                name="date_applied"
                type="date"
                onChange={changeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
                value= {state.date_applied ? state.date_applied.split("T")[0] : null}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                // className={classes.submit}
                className="add-app-button"
                // onClick={displayFormHandler}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
      ) : (
        <Button
          onClick={displayFormHandler}
          variant="contained"
          className="add-app-button"
        >
          {isEditForm ? "Edit Application" : "Add New Application"}
        </Button>
      )}
    </>
  );
}
