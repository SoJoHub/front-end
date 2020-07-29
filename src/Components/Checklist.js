import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function CheckboxList(props) {
    const checklist = ["send follow up", "send cover letter", "email recruiter"]
    let user = window.localStorage.getItem("sojohub");
    const token = JSON.parse(user).userToken;

    console.log(props.todos)


    // const fetchTodos = () => {
    //     fetch('http://localhost:3000/todos', {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": token,
    //             Accept: "application/json",
    //         }
    //     })
    //         .then(r => r.json)
    //         .then(console.log)
    // }  
    // {props.application && fetchTodos()}

    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
            value.complete = !value.complete
        } else {
            newChecked.splice(currentIndex, 1);
            value.complete = !value.complete
        }

        setChecked(newChecked);
        props.handleUpdate(newChecked)
    };

    return (
        <List className={classes.root}>
            <h3>To Do List</h3>
            {props.todos && props.todos.map((value) => {
                const labelId = `checkbox-list-label-${value.task}`;

                return (
                    <ListItem key={value.task} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={value.checked}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${value.task}`} />
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                            <CommentIcon />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
    }
