"use client";

import PropTypes from "prop-types";
import Blockies from "react-blockies";
import "./styles/avatar.css";
import { useState } from "react";

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  onImageChange: PropTypes.func.isRequired, // New prop for handling image change
};

export default function Avatar({ size, username, imageUrl, onImageChange }) {
  const [previewImage, setPreviewImage] = useState(imageUrl);

  const handleAvatarClick = () => {
    document.getElementById("avatar-upload").click(); // Trigger file input when avatar is clicked
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      onImageChange(file); // Pass the selected image file to parent component
    }
  };

  return (
    <div>
      <input
        type="file"
        id="avatar-upload"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <img
        src={previewImage || imageUrl}
        alt={`${username}'s avatar`}
        className="avatar"
        style={{ width: size, height: size, cursor: "pointer" }}
        onClick={handleAvatarClick}
      />
    </div>
  );
}
