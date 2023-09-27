import { useEffect, useState } from 'react'
import './App.css'
import './StarWarsIntro.css'
import Spinner from './components/Spinner'

function App() {
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [weatherData, setWeatherData] = useState([])


  useEffect(() => {


    async function fetchWeather() {

      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      console.log('before fetch: ' + lat, long)
      if (lat === 0 || long === 0) {
        return
      }
      const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
      await fetch(`${baseUrl}lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          console.log(result)
          setWeatherData(result)
        }).catch(err => {
          console.log(err)
        })
    }
    fetchWeather()
  }, [lat, long])



  return (
    <>
      <div className='star-wars-intro'>
        <p className='intro-text'>Today's weather...</p>
        <h2 className='main-logo'>
          WEATHER FORECAST
        </h2>
        <div className='main-content'>
          <div className='title-content'>
            <p className='content-header'>IN A GALAXY NOT THAT FAR AWAY</p>
            <p className='content-body'>DARTH VÄDER</p>
            {weatherData.main ? (
              <>
                <p className='content-body'>City: {weatherData.name}</p>
                <p className='content-body'>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}</p>
                <a href="#weather" className="space-button">See the weather</a>
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>

      <section>
        <div className='container'>
          {weatherData.main ? (
            <>
              <div >
                <h2 id='weather'>City: {weatherData.name}</h2>
                <h2>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}</h2>
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </section>
    </>
  )
}

export default App
