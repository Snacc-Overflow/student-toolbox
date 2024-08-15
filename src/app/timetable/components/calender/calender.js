"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils";
import styles from "./style.module.scss";

export default function Calendar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3788d8"); // Default color

  function handleDateSelect(selectInfo) {
    setSelectedInfo(selectInfo);
    setModalIsOpen(true);
  }

  function handleEventCreation() {
    if (title && selectedInfo) {
      let calendarApi = selectedInfo.view.calendar;

      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectedInfo.startStr,
        end: selectedInfo.endStr,
        allDay: selectedInfo.allDay,
        backgroundColor: color,
        borderColor: color,
      });

      setModalIsOpen(false);
      setTitle("");
      setColor("#3788d8"); // Reset to default
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

  return (
    <div className={styles.calendar_main}>
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

      {modalIsOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Create New Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <button onClick={handleEventCreation}>Create Event</button>
            <button onClick={() => setModalIsOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
