import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ClearIcon from '@material-ui/icons/Clear';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "#778da9",
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "30px",
    zIndex: 100,
    alignSelf: "center",
    justifySelf: "center",
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    position: "absolute",
    zIndex: -1,
    width: 400,
    backgroundColor: "#778da9",
    border: "2px solid #000",
  },
  modalButtons: {
    textDecoration: "none",
    '&:hover': {
      color: 'white'
    }
    
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("closed")
  };

  // const handleDelete = () => {
  //   console.log(props.selectedInterview);
  // };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ClearIcon onClick={() => props.toggle()}/>
      <h2 id="simple-modal-title">
        Interview Details for {props.selectedInterview.application_company}
      </h2>
      <p id="simple-modal-description">
        {props.selectedInterview.date}
        <br></br>
        <b>Interviewer: </b>
        {props.selectedInterview.interviewer}
        <br></br>
        {/* {props.selectedInterview.complete.toString()} */}
        <br></br>
        Location: {props.selectedInterview.location}
        <br></br>
        Notes: {props.selectedInterview.notes}
      </p>
      <br></br>
      <Button
      onClick={() => {
          props.handleEdit(props.selectedInterview);
          props.toggle();
        }}
      >Edit Interview</Button>
      <Button
        onClick={() => {
          props.handleDelete(props.selectedInterview);
          props.toggle();
        }}
      >
        Delete Interview
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        onOpen={handleOpen}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        hideBackdrop={true}
      />
      {body}
    </div>
  );
}
