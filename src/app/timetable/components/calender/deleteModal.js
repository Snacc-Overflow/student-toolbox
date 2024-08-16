import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { useSession } from "next-auth/react";

export default function DeleteModal({
  isOpen,
  setIsOpen,
  selectedEvent,
  setEvents,
}) {
  const session = useSession();
  const username = session?.data?.user?.name;
  /**
   * Handles event deletion
   */
  const handleEventDeletion = async () => {
    if (selectedEvent) {
      const response = await fetch(`/api/user/${username}/event`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: selectedEvent.id }),
      });

      if (response.ok) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== selectedEvent.id)
        );
        setIsOpen(false);
      } else {
        const error = await response.json();
        alert(`Failed to delete event: ${error.message}`);
      }
    }
  };

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Delete Event</h2>
          <p>
            Are you sure you want to delete the event '{selectedEvent?.title}'?
          </p>
          <button onClick={handleEventDeletion}>Delete</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    )
  );
}

// Define PropTypes for DeleteModal to enforce the types of props passed
DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  selectedEvent: PropTypes.object,
  setEvents: PropTypes.func.isRequired,
};

// Define default props if necessary
DeleteModal.defaultProps = {
  selectedEvent: null,
};
