import axios from "axios";
import { useState, useEffect } from "react";

const BASE_URL = "https://www.metaweather.com/api/location";
const CROSS_DOMAIN = "https://nonecors.herokuapp.com";

//https://young-earth-27685.herokuapp.com
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

const useForecast = () => {
  const [forecast, setForecast] = useState({
    upcomingDays: {},
    CurrentDay: {},
  });

  const [isLoading, setLoading] = useState({
    loading: true,
    message: "Loading...",
    icon: "fa fa-spinner icon",
  });

  const [suggestion, setSuggestion] = useState({ suggestion: {} });

  useEffect(() => {
    // declare the data fetching function

    const fetchData = async () => {
      await submitRequest({ params: { query: "frankfurt" } });
    };

    // call the function
    fetchData()
      .then(() => setLoading({ loading: false }))

      // make sure to catch any error
      .catch(console.error);
  }, []);

  const getWoeid = async (location) => {
    let { params } = location;
    const { data } = await axios(`${REQUEST_URL}/search`, {
      params,
    });

    if (!data || data.length === 0) {
      setLoading({
        loading: true,
        message: "There is no such location",
        icon: "fa-solid fa-circle-exclamation icon",
      });

      setTimeout(() => {
        setLoading({ loading: false });
      }, 3000);

      return;
    }
    let { woeid } = data[0];

    return woeid;
  };

  const getForcastData = async (woeid) => {
    const { data } = await axios(`${REQUEST_URL}/${woeid}`);

    return data;
  };

  const getDayInfo = (date, format) => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // it will return the date in this format ex: Friday
    if (format === "dayName") {
      const d = new Date(date);

      let day = weekday[d.getDay()];

      return day;
    }

    // it will return the date in this format ex: Fri 01 Apr
    if (format === "todayDate") {
      const d = new Date();

      let date = d.toString().split(" ");

      let todayDate = `${date[0]} ${parseInt(date[2])} ${date[1]}`;

      return todayDate;
    }
  };

  const gatherForecastData = (data) => {
    let weather = data.consolidated_weather;
    let upcomingDays = [];

    let todayDate = getDayInfo(weather[0].applicable_date, "todayDate");

    for (let i = 1; i < 6; i++) {
      upcomingDays = [
        ...upcomingDays,
        {
          icon: weather[i].weather_state_abbr,
          minTemp: weather[i].min_temp,
          maxTemp: weather[i].max_temp,
          dayName: getDayInfo(weather[i].applicable_date, "dayName"),
          celciusOrfahrenheit: "°C",
        },
      ];
    }

    let CurrentDay = {
      todayDate,
      city: data.title,
      stateName: weather[0].weather_state_name,
      temperature: weather[0].the_temp,
      icon: weather[0].weather_state_abbr,
      wind: Math.round(weather[0].wind_speed),
      celciusOrfahrenheit: "°C",
      humidity: Math.round(weather[0].humidity),
      airPressure: Math.round(weather[0].air_pressure),
      visibility: parseFloat(weather[0].visibility)
        .toFixed(2)
        .replace(".", ","),
    };

    setForecast({ CurrentDay, upcomingDays });

    setLoading({ loading: false });
  };

  const submitRequest = async (location) => {
    setLoading({
      loading: true,
      message: "Loading...",
      icon: "fa fa-spinner icon",
    });
    let woeid = await getWoeid(location);
    let data = await getForcastData(woeid);
    let forecast = await gatherForecastData(data);

    return forecast;
  };

  const handleSearchSuggestion = async (location) => {
    let { params } = location;

    let { data } = await axios(`${REQUEST_URL}/search`, {
      params,
    });

    let suggestion = [];

    for (let i = 0; i < 8; i++) {
      suggestion = [
        ...suggestion,
        {
          city: data[i].title,
        },
      ];
    }

    setSuggestion(suggestion);
  };

  const convertTemp = async (temp) => {
    let CurrentDay = forecast.CurrentDay;
    let upcomingDays = forecast.upcomingDays;

    // Convert fahrenheit to celcius
    if (forecast.CurrentDay.celciusOrfahrenheit === "°F" && temp !== "°F") {
      let celcius = ((CurrentDay.temperature - 32) * 5) / 9;

      // Updated currentday object
      CurrentDay = {
        ...CurrentDay,
        ...{ celciusOrfahrenheit: "°C", temperature: celcius },
      };

      // Updated upcomingDays object

      upcomingDays.forEach((element) => {
        // here it will return min and max fahrenheit temperature for the upcomingdays
        let minTemp = ((element.minTemp - 32) * 5) / 9;
        let maxTemp = ((element.maxTemp - 32) * 5) / 9;

        for (let i = 0; i < upcomingDays.length; i++) {
          element.minTemp = minTemp;
          element.celciusOrfahrenheit = "°C";
          element.maxTemp = maxTemp;
        }
      });

      setForecast({ CurrentDay, upcomingDays });
    }
    // Convert celcius to fahrenheit
    if (forecast.CurrentDay.celciusOrfahrenheit === "°C" && temp !== "°C") {
      let fahrenheit = (CurrentDay.temperature * 9) / 5 + 32;

      // Updated upcomingDays object
      CurrentDay = {
        ...CurrentDay,
        ...{ celciusOrfahrenheit: "°F", temperature: fahrenheit },
      };

      // Updated upcomingDays object

      upcomingDays.forEach((element) => {
        // here it will return min and max fahrenheit temperature for the upcomingdays
        let minTemp = (element.minTemp * 9) / 5 + 32;
        let maxTemp = (element.maxTemp * 9) / 5 + 32;

        for (let i = 0; i < upcomingDays.length; i++) {
          element.minTemp = minTemp;
          element.celciusOrfahrenheit = "°F";
          element.maxTemp = maxTemp;
        }
      });

      setForecast({ CurrentDay, upcomingDays });
    }
  };
  return {
    submitRequest,
    gatherForecastData,
    handleSearchSuggestion,
    forecast,
    isLoading,
    suggestion,
    convertTemp,
  };
};

export default useForecast;
