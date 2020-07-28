// Stats page
//# of jobs applied to
//#interviews
//#offers
//#rejections
//#no response

import React from "react";
import { Chart } from "react-google-charts";
//{interviews: interviews, jobsApplied: jobsApplied, offers: offers, rejections: rejections, noResponse: noResponse}

export default function Stats(props) {
  return (
    <div>
      <h4>Jobs Applied: {props.stat.jobsApplied}</h4>
      <h4>Interviews: {props.stat.interviews}</h4>
      <h4>Offers: {props.stat.offers}</h4>
      <h4>Rejections: {props.stat.rejections}</h4>
      <h4>No Response: {props.stat.noResponse}</h4>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Task', 'Hours per Day'],
          ['Interviews', props.stat.interviews],
          ['Offers', props.stat.offers],
          ['Rejections', props.stat.rejections],
          ['Response', props.stat.noResponse]
        ]}
        options={{
          title: 'Your Numbers',
        }}
        rootProps={{ 'data-testid': '1' }}
    />
    </div>
  );
}
