import LargeCard from "../large-card";
import MediumCard from "../medium-card";
import SmallCard from "../smalll-card";
import "./main.css";

function Main(props) {
  return (
    <div className="main-container">
      <div className="first-section">
        
          {props.data.CurrentDay.celciusOrfahrenheit === "°C" ? (
            <div className="degree-container">
              <button
                className="ball on"
                onClick={() => props.convertTemp("°C")}
              >
                °C
              </button>
              <button
                className="ball off"
                onClick={() => props.convertTemp("°F")}
              >
                °F
              </button>
            </div>
          ) : (
            <div className="degree-container">
              <button
                className="ball off"
                onClick={() => props.convertTemp("°C")}
              >
                °C
              </button>
              <button
                className="ball on"
                onClick={() => props.convertTemp("°F")}
              >
                °F
              </button>
            </div>
          )}
      
        <SmallCard data={props.data.upcomingDays} />
      </div>

      <div className="second-section">
        <h1 className="title">Today's highlights</h1>
        <LargeCard wind={props.data.CurrentDay.wind} />
        <LargeCard
          title="humidity"
          porcentagem={props.data.CurrentDay.humidity}
        />
        <MediumCard
          title="Visibility"
          value={props.data.CurrentDay.visibility}
          text="miles"
        />
        <MediumCard
          title="Air Pressure"
          value={props.data.CurrentDay.airPressure}
          text="mb"
        />
      </div>

      <footer>
        <p>
          created by &nbsp;
          <a href="https://tiagofrontendeveloper.com">Tiago Rodrigues</a> -
          devChallenges.io
        </p>
      </footer>
    </div>
  );
}

export default Main;
