import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
import "./style.css";

export default function SmallCard(props) {
  const [data, setData] = useState(null);

  const isEmptyObject = (obj) => {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        return false;
      }
    }

    return true;
  };

  return isEmptyObject(props.data) === false ? (
    <>
      {props.data.map((item) => {
        return (
          <div className="smallcard-container" key={item.dayName}>
            <p>{item.dayName}</p>

            <img src={require(`../../assets/${item.icon}.png`)} alt="weather" />

            <p>
              {Math.round(item.minTemp)}
              {item.celciusOrfahrenheit} {Math.round(item.maxTemp)}
              {item.celciusOrfahrenheit}
            </p>
          </div>
        );
      })}
    </>
  ) : (
    <></>
  );
}
