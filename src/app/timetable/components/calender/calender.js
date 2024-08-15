"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils"; // Utility function to create unique event IDs
import styles from "./style.module.scss"; // Importing custom styles

export default function Calendar() {
  // State to manage the visibility of the modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // State to store the selected date/time information when creating a new event
  const [selectedInfo, setSelectedInfo] = useState(null);

  // State to store the event title input by the user
  const [title, setTitle] = useState("");

  // State to store the color selected by the user, with a default value
  const [color, setColor] = useState("#3788d8");

  // This function is triggered when a date/time range is selected in the calendar
  function handleDateSelect(selectInfo) {
    setSelectedInfo(selectInfo); // Save the selected date/time info
    setModalIsOpen(true); // Open the modal for the user to enter event details
  }

  // This function is called when the user confirms the creation of a new event
  function handleEventCreation() {
    if (title && selectedInfo) {
      // Ensure that the title and date info are provided
      let calendarApi = selectedInfo.view.calendar; // Access the calendar API

      // Add the new event to the calendar with the provided title and color
      calendarApi.addEvent({
        id: createEventId(), // Generate a unique ID for the event
        title,
        start: selectedInfo.startStr, // Start time of the event
        end: selectedInfo.endStr, // End time of the event
        allDay: selectedInfo.allDay, // Whether the event is an all-day event
        backgroundColor: color, // Background color for the event
        borderColor: color, // Border color for the event
      });

      setModalIsOpen(false); // Close the modal
      setTitle(""); // Reset the title input
      setColor("#3788d8"); // Reset the color to the default value
    }
  }

  // This function is called when an event is clicked in the calendar
  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove(); // Remove the event if the user confirms
    }
  }

  // This function defines how the event content is rendered on the calendar
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b> {/* Display the event time */}
        <i>{eventInfo.event.title}</i> {/* Display the event title */}
      </>
    );
  }

  return (
    <div className={styles.calendar_main}>
      {/* FullCalendar component with various props */}
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]} // Plugins for time grid view and interaction
        initialView="timeGridWeek" // Default view is weekly time grid
        editable={true} // Events can be edited (dragged, resized, etc.)
        selectable={true} // Dates can be selected to create new events
        height={650} // Height of the calendar
        select={handleDateSelect} // Handle date selection
        eventContent={renderEventContent} // Custom rendering of event content
        eventClick={handleEventClick} // Handle event click
      />

      {/* Modal for creating a new event, displayed only when modalIsOpen is true */}
      {modalIsOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Create New Event</h2>
            {/* Input for event title */}
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* Input for event color */}
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            {/* Button to create the event */}
            <button onClick={handleEventCreation}>Create Event</button>
            {/* Button to cancel and close the modal */}
            <button onClick={() => setModalIsOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
