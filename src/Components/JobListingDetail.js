import React from 'react';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: "center",
//       color: theme.palette.text.secondary,
//     },
//   }));

const JobListingDetail = (props) => {
    // const classes = useStyles();
    console.log(props.application.job_listing)
    return (
        <div>
            <h3>Job Listing Detail</h3>
            <p>{props.application.job_listing && props.application.job_listing.company}</p>
        </div>
    )
}


export default JobListingDetail;