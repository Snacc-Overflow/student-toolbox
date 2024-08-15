"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./style.module.scss";
import EventModal from "./eventModal";
import DeleteModal from "./deleteModal"; // New component for delete confirmation

export default function calendar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // For delete confirmation

  // Fetch events from API
  useEffect(() => {
    // Replace with your API call to fetch events
    // setEvents();
  }, []);

  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo);
    setModalIsOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setDeleteModalIsOpen(true);
  };

  const handleEventDeletion = () => {
    if (selectedEvent) {
      // Remove event from local state
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selectedEvent.id)
      );
      // Close delete modal
      setDeleteModalIsOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div className={styles.calendar_main}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        height={650}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
      />

      {modalIsOpen && (
        <EventModal
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          selectedInfo={selectedInfo}
          setEvents={setEvents}
        />
      )}

      {deleteModalIsOpen && (
        <DeleteModal
          isOpen={deleteModalIsOpen}
          setIsOpen={setDeleteModalIsOpen}
          handleDelete={handleEventDeletion}
          eventTitle={selectedEvent?.title}
        />
      )}
    </div>
  );
}
