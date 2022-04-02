import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const LargeCard = (props) => {
 

  return (props.porcentagem !== undefined) | null ? (
    <div className="largecard-container">
      <p>Humidity</p>

      <h1>
        {props.porcentagem} <span>%</span>
      </h1>

      <div className="porcentagem-container">
        <div className="porcentagem-numbers">
          <p>0</p>
          <p>50</p>
          <p>100</p>
        </div>

        <div className="porcentagem-line">
          <div
            className="porcentagem"
            style={{ width: `${props.porcentagem}%` }}
          ></div>
        </div>
        <p>%</p>
      </div>
    </div>
  ) : (
    <div className="largecard-container">
      <p>Wind status</p>

      <h1>
        {props.wind} <span>mph</span>
      </h1>

      <p>wsw</p>
    </div>
  );
};

export default LargeCard;
