import { useState } from "react"

const WheaterCard = ( { weather, temp } ) => {
  
  const [isCelsius, setIsCelsius] = useState(true)
  const handleChangeTemp = () => {
    setIsCelsius(!isCelsius)
  }

  return (
      <article className="wheater__card">
        <h1 className="wheater__title">Weather App</h1>
        <h2 className="wheater__country">{weather?.name}, {weather?.sys.country}</h2>
        <div className="wheater__content__image">
          <img className="wheater__icon" src={ weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
        </div>
        <h3 className="wheater__desc">{weather.weather[0].description}</h3>
        <h2 className="wheater__temp">{isCelsius ? `${temp?.celsius} °C` : `${temp?.farenheit} °F` }</h2>
        <section className="wheater__specs">
          <ul className="wheater__list">
            <li className="wheater__item">Wind: <span className="wheater__item__value">{weather.wind?.speed} m/s</span></li>
            <li className="wheater__item">Clouds: <span className="wheater__item__value">{weather.clouds?.all} %</span></li>
            <li className="wheater__item">Preassure: <span className="wheater__item__value">{weather.main?.pressure} hPa</span></li>
          </ul>
        </section>
        <button className="wheater__button" onClick={handleChangeTemp}>{isCelsius ? 'Change to °F' : 'Change to Celsius'}</button>
      </article>      
  )
}

export default WheaterCard