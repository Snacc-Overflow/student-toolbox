"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./style.module.scss";
import EventModal from "./eventModal";
import DeleteModal from "./deleteModal";
import { useSession } from "next-auth/react";

export default function Calendar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const session = useSession();
  const username = session?.data?.user?.name;

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(`/api/user/${username}/event`);
      const data = await response.json();
      setEvents(data);
    }

    fetchEvents();
  }, []);

  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo);
    setModalIsOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setDeleteModalIsOpen(true);
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
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
        }}
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
