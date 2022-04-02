import React from "react";
import Search from "../search";
import cloud from "../../assets/Cloud-background.png";
import "./side.css";

class Side extends Search {
  // This function will receive the lat, long and query from the user
  handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        let lattlong =
          location.coords.latitude + "," + location.coords.longitude;

        this.props.submitRequest({ params: { lattlong: lattlong } });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  render() {
    return (
      <div className="side-container">
        <div className="first-side-container">
          {/* This button open the search menu */}
          <button className="search-btn" onClick={this.handleMenu}>
            Search for places
          </button>

          <i
            className="fa-solid fa-location-crosshairs"
            onClick={this.handleLocation}
          ></i>
        </div>

        <div className="image-side-container">
          <img src={cloud} alt="weather" />

          {typeof this.props.data.icon !== "undefined" ? (
            <img
              src={require(`../../assets/${this.props.data.icon}.png`)}
              alt="weather"
            />
          ) : (
            <></>
          )}
        </div>

        <div className="second-side-container">
          <h1>
            {Math.round(this.props.data.temperature)} <span>{this.props.data.celciusOrfahrenheit}</span>
          </h1>

          <h2>{this.props.data.stateName}</h2>

          <p>Today - {this.props.data.todayDate}</p>

          <div className="location">
            
            <p><i className="fa-solid fa-location-dot"></i>{this.props.data.city}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Side;
