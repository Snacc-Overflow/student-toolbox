import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";

export default function deleteModal({
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

// Define PropTypes for DeleteModal
deleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  eventTitle: PropTypes.string,
};

// Define default props if necessary
deleteModal.defaultProps = {
  eventTitle: "the event",
};
