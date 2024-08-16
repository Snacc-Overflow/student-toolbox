import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { createEventId } from "./event-utils";

export default function EventModal({ setIsOpen, selectedInfo, setEvents }) {
  // State to manage the event title and color
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3788d8");

  /**
   * Handles the creation of a new event
   */
  const handleEventCreation = async () => {
    if (title && selectedInfo) {
      const newEvent = {
        id: createEventId(),
        title,
        start: selectedInfo.startStr,
        end: selectedInfo.endStr,
        allDay: selectedInfo.allDay,
        backgroundColor: color,
        borderColor: color,
      };

      const response = await fetch("/api/user/${username}/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: newEvent }),
      });

      if (response.ok) {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setIsOpen(false);
        setTitle("");
        setColor("#3788d8");
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create New Event</h2>
        <input
          type="text"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>Pick a colour</h2>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={handleEventCreation}>Create Event</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </div>
  );
}

// Define PropTypes for EventModal to enforce the types of props passed
EventModal.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  selectedInfo: PropTypes.object,
  setEvents: PropTypes.func.isRequired,
};

// Define default props if necessary
EventModal.defaultProps = {
  selectedInfo: null,
};
