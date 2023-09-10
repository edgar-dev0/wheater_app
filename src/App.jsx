import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import WheaterCard from './components/WheaterCard'
import Loading from './components/Loading'
import Error from './components/Error'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  //Usamos use efect para obtener la respuesta de la API y almacenarla en un estado, en este caso coords
  useEffect(() => {
    const success = position => {
      const obj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      setCoords(obj)
    }

    const error = err => {
      console.log(err)
      setHasError(true)
    }
    navigator.geolocation.getCurrentPosition(success, error)
  }, [hasError])


  useEffect(() => {
    if(coords !== undefined) {
      const ApiKey = '6b7df892643b3e5813b1c41e3f9574ed'
      const url = `https://api.openweathermap.org/data/2.5/weather?&lat=${coords.lat}&lon=${coords.lon}&appid=${ApiKey}`
      setIsLoading(true)
      axios.get(url)
      .then(response => {
        setWeather(response.data)
        const obj = {
          celsius: (response.data.main.temp - 273.15).toFixed(1),
          farenheit: ((response.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
        }
        setTemp (obj)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
      .finally(() => setIsLoading(false))
    }
  }, [coords])
  
  //console.log(coords)
  console.log(weather)

  return (
    <div>
      {
        isLoading
        ? <Loading />
        : (
          hasError
          ? <Error />
          : (
            <WheaterCard 
              weather = {weather}
              temp = {temp}
            />
          )
        )
      }
    </div>
  )
}

export default App