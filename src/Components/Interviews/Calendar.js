import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import SimpleModal from './SimpleModal.js'

export default class Calendar extends React.Component {
    state = {
        modal: false,
        weekendsVisible: true,
        selectedInterview: ""
    }

    toggle = () => {
        this.setState({ 
            modal: !this.state.modal 
        });
    };

    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    }

    renderEventContent = (eventInfo) => {
        console.log(eventInfo)
        return (
            <>
                <b>{eventInfo.event.title}</b>
                <i>{eventInfo.event.timeText}</i>
            </>
        )
    }

    handleEventClick = (event) => {
        this.toggle()
        console.log(event)
    }

    // handleEvents = (event) => {
    //     this.setState({
    //       currentInterview: event
    //     })
    // }

    renderEvents = () => {
        return this.props.interviews.map(interview => {
            // console.log(interview.application_company)
            return { title: `${interview.application_company}`, timeText: `${interview.date}`.split("T")[1], date: `${interview.date}`.split("T")[0] }

        })
    }

    render() {
        console.log(this.props.interviews)
        return (
            <div id="calendar">
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    displayEventTime={true}
                    events={this.renderEvents()}
                    dateClick={this.handleDateClick}
                    select={this.handleDateSelect}
                    eventClick={this.handleEventClick}
                    eventContent={this.renderEventContent}
                    // eventsSet={this.handleEvents}
                    //   header={this.state.event.title}
                />
                {this.state.modal && <SimpleModal
                    isOpen={this.state.modal}
                    selectedInterview={this.state.selectedInterview}
                    // toggle={this.toggle}
                    // className={this.props.className}
                />}
            </div>
        )
    }
  }