import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import styles from "./style.module.scss";
import { createEventId } from "./event-utils";

export default function EventModal({ setIsOpen, selectedInfo, setEvents }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3788d8");

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

      // Add to local state
      setEvents((prevEvents) => {
        if (Array.isArray(prevEvents)) {
          return [...prevEvents, newEvent];
        } else {
          console.error("prevEvents is not an array", prevEvents);
          return [newEvent]; // Fallback to just the new event
        }
      });

      // Close modal
      setIsOpen(false);
      setTitle("");
      setColor("#3788d8");
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
        <h2>Pick a color</h2>
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

// Define PropTypes for EventModal
EventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  selectedInfo: PropTypes.object,
  setEvents: PropTypes.func.isRequired,
};

// Define default props if necessary
EventModal.defaultProps = {
  selectedInfo: null,
};
