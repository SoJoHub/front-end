import React, { useState, useEffect} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PostAddIcon from '@material-ui/icons/PostAdd'
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  warning: {
    color: "red"
  },
  formControl: {
    width: "100%"
  }
}));

export default function AddInterview(props) {
    const classes = useStyles();

    const [interviewForm, setInterviewForm] = useState(false);
    const [state, setState] = useState({
        date: "",
        interviewer: "",
        location: "",
        notes: "",
        complete: "",
        // applications: 
        application_id: ""
    });

    const [applications, setApplication] = useState([])

    useEffect(() => { 
      let user = window.localStorage.getItem("sojohub");
      if (user) {
        const token = JSON.parse(user).userToken;
        fetch("http://localhost:3000/applications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        })
          .then((resp) => resp.json())
          .then((applications) => {
            setApplication({
              applications: applications,
            });
          });
      }
    }, [])
  


    const displayFormHandler = () => {

      setInterviewForm((prevState) => {
        return !prevState;
      });
    };

    const changeHandler = (e) => {
        e.persist();
        console.log(applications)
        setState((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
    const handleInterviewCreation = (e) => {
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
        fetch("http://localhost:3000/interviews", payLoad)
            .then((r) => r.json())
            .then((newInterview) => {
                props.addInterview(newInterview);
            });
    };

  
  return (
    <> 
    {interviewForm ? (
    <Container component="main" maxWidth="lg">
        <Button onClick={displayFormHandler} variant="contained" className="add-app-button">
            Hide Interview Form
        </Button>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {props.postId ? "Edit Interview" : "Create A New Interview"}
        </Typography>
        {/* <Typography component="h1" className={classes.warning}>
          {!token && "Only logged in users can create interviews!"}
        </Typography> */}
        <form onSubmit={handleInterviewCreation} className={classes.form} noValidate>
            {/* <FormControl className={classes.formControl}>
                <InputLabel id="application-label">Application</InputLabel>
                <Select
                    id="application"
                    labelId="Status"
                    name="application"
                    value={state.application}
                    onChange={changeHandler}
                >
                    <MenuItem value="Applied">Applied</MenuItem>
                    <MenuItem value="Selected for Interview">
                        Selected for Interview
                    </MenuItem>
                    <MenuItem value="Interviewed">Interviewed</MenuItem>
                    <MenuItem value="Accepted">Received Offer</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
            </FormControl> */}
            <TextField
                id="date"
                label="date"
                name="date"
                type="date"
                onChange={changeHandler}
                InputLabelProps={{
                    shrink: true,
                }}
                value={state.date}
            />
                <br/>

            <FormControl className={classes.formControl}>
                <InputLabel id="status-label">Select Job</InputLabel>
                <Select
                  id="application_id"
                  labelId="application_id"
                  name="application_id"
                  value={state.application_id}
                  onChange={changeHandler}
                >
                {applications.applications.map(item => <MenuItem value={item.id}>{item.job_listing.company}</MenuItem>)}

                </Select>
              </FormControl>

                <br/>
                <FormControl className={classes.formControl}>
                <InputLabel id="status-label">Completed</InputLabel>
                <Select
                  id="complete"
                  labelId="complete"
                  name="complete"
                  value={state.complete}
                  onChange={changeHandler}
                >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>

                </Select>
              </FormControl>

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="interviewer"
                label="interviewer"
                name="interviewer"
                autoComplete="interviewer"
                autoFocus
                onChange={changeHandler}
                value={state.interviewer}
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
            <div>
                <TextField
                    className={classes.root}
                    variant="outlined"
                    margin="normal"
                    required
                    rowsMax="10"
                    fullWidth
                    multiline={true}
                    rows="4"
                    id="notes"
                    label="notes"
                    name="notes"
                    autoComplete="notes"
                    autoFocus
                    onChange={changeHandler}
                    value={state.notes}
                />
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                // className={classes.submit}
                className="add-app-button"
                
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
          // color="primary"
          className="add-app-button"
        >
          Add New Interview
        </Button>
    )}
 </>
  );
}
