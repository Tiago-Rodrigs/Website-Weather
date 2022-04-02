import "./App.css";
import Loader from "./components/loader";
import Main from "./components/main-section";
import Search from "./components/search";
import Side from "./components/side-section";
import useForecast from "./hooks/useForecaste";

function App() {
  const { submitRequest, forecast, isLoading, handleSearchSuggestion, suggestion, convertTemp } = useForecast();

  return (
    <div className="App">
      <Loader loader={isLoading} />
      <Search submitRequest={submitRequest} handleSearchSuggestion={handleSearchSuggestion} suggestion={suggestion} />
      <Side submitRequest={submitRequest} data={forecast.CurrentDay} />
      <Main data={forecast} convertTemp={convertTemp} />
    </div>
  );
}

export default App;
