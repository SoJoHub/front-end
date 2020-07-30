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
    // console.log(props.application.job_listing)
    return (
        <div>
            <h3>Job Listing Detail</h3>
            <p>Company: {props.application.job_listing && props.application.job_listing.company}</p>
            <p>Job Title: {props.application.job_listing && props.application.job_listing.title}</p>
            <p>Location: {props.application.job_listing && props.application.job_listing.location}</p>
            <p>Description: {props.application.job_listing && props.application.job_listing.description}</p>
            <p>Job Listing URL: {props.application.job_listing && props.application.job_listing.listing_url}</p>
        </div>
    )
}


export default JobListingDetail;