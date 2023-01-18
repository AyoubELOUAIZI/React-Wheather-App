import './App.css';
import { useState } from 'react';


const api = {
  key: '380ac89aac383e334642ff7f05ec0fe0',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [mssg, setMssg] = useState("");

  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
  const searchPressed = () => {
    if (!search){
      alert("please Enter a City or town name and try again");
      // return
    }
    //  fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
    // 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api.key}&units=metric`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setWeather(result);
      });

   if( typeof weather.main === "undefined"){
     setMssg("No City found yet ...")
   }
  };

  return (
    <div className="App">
      <div className="App-header">
        {/* HEADER  */}
        <h1>City Weather</h1>

        {/* Search Box - Input + Button  */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button  onClick={searchPressed}>find</button>
        </div>

        {/* If weather is not undefined display results from API */}
        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location  */}
            <p>City : {weather.name} |<span>| country : {weather.sys.country}</span></p>

            {/* Temperature Celsius  */}
            <p>Temperature : {weather.main.temp}°C</p>

            <p>Humidity : {weather.main.humidity}%</p>


            <p>Wind speed : {weather.wind.speed} meter/sec</p>

            {/* Condition (Sunny ) */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
            <br/>
           
            <p>geo location, latitude : {weather.coord.lat}</p>
            <p>geo location, longitude : {weather.coord.lon}</p>

          </div>
        ) : (
        //  else
            < p > {mssg} </p>
        )}
      </div>
    </div>
  );
}

export default App;
