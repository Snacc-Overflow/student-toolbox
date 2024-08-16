import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";

/**
 * Delete confirmation modal component
 *
 * @param {boolean} isOpen - Controls the visibility of the modal
 * @param {function} setIsOpen - Toggles the modal visibility
 * @param {function} handleDelete - Handles the event deletion
 * @param {string} eventTitle - Title of the event to be deleted
 */
export default function DeleteModal({
  isOpen,
  setIsOpen,
  handleDelete,
  eventTitle,
}) {
  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Delete Event</h2>
          <p>Are you sure you want to delete the event '{eventTitle}'?</p>
          <button onClick={handleDelete}>Delete</button>
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
  handleDelete: PropTypes.func.isRequired,
  eventTitle: PropTypes.string,
};

// Define default props if necessary
DeleteModal.defaultProps = {
  eventTitle: "the event",
};
