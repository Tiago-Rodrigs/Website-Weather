import React from "react";
import "./style.css";

export default function MediumCard(props) {
  return (
    <div className="mediumcard-container">
      <p>{props.title}</p>

      <h1>
        {props.value} <span>{props.text}</span>
      </h1>
    </div>
  );
}
