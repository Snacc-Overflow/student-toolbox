"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./style.module.scss";
import EventModal from "./eventModal";
import DeleteModal from "./deleteModal";

export default function Calendar({ username }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(`/api/user/${username}/event`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data); // Set the fetched events in state
      }
    }

    fetchEvents();
  }, [username]);

  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo);
    setModalIsOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setDeleteModalIsOpen(true);
  };

  const handleEventDrop = async (eventInfo) => {
    const updatedEvent = {
      id: eventInfo.event.id,
      title: eventInfo.event.title,
      start: eventInfo.event.start.toISOString(),
      end: eventInfo.event.end.toISOString(),
      allDay: eventInfo.event.allDay,
      backgroundColor: eventInfo.event.backgroundColor,
      borderColor: eventInfo.event.borderColor,
    };

    try {
      const response = await fetch(`/api/user/${username}/event`, {
        method: "PATCH",
        body: JSON.stringify({
          eventId: eventInfo.event.id,
          updatedEvent,
        }),
      });

      if (response.ok) {
        console.log("Event updated successfully");
      } else {
        const error = await response.json();
        console.error(`Failed to update event: ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.calendar_main}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
        }}
        allDaySlot={false}
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
          selectedEvent={selectedEvent}
          setEvents={setEvents}
        />
      )}
    </div>
  );
}
