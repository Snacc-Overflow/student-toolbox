"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils";
import styles from "./style.module.scss";

export default function Calendar() {
  return (
    <div className={styles.calender_main}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        height={650}
        select={handleDateSelect}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
    </div>
  );

  function handleDateSelect(selectInfo) {
    let title = prompt("Please enter a new title for your event");
    let color = prompt("Please enter a color for your event (e.g., #ff0000)");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: color || "#3788d8", // Default color if none is provided
        borderColor: color || "#3788d8", // Match border color to the background color
      });
    }
  }

  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
}
