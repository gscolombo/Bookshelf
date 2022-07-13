import React from "react";
import "../styles/LoadingModal.css";
import loadingIcon from "../img/loadingIcon.svg";

export default function LoadingModal({
  customStyle,
  customIcon,
  customParagraphStyle,
  message,
}) {
  return (
    <div className="loading-container" style={customStyle}>
      <img src={customIcon ? customIcon : loadingIcon} alt="loading icon" />
      <p style={customParagraphStyle}>{message}</p>
    </div>
  );
}
