import { Link } from "react-router-dom"
import Searchh from "../Conponents/search/Searchh"
import CurrentWeather from "../Conponents/current-weather/current-weather"
import { WEATHER_API_URL, WEATHER_API_KEY } from "../Conponents/search/api"
import { useState } from "react"
import Forecast from "../Conponents/current-weather/forcast/forecast"





const Home = () => {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecast, setForecast] = useState(null)

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&cnt=${5}&appid=${WEATHER_API_KEY}&units=metric`)

        Promise.all([CurrentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json()
                const forecastResponse = await response[1].json()
                setCurrentWeather({ city: searchData.label, ...weatherResponse })
                setForecast({ city: searchData.label, ...forecastResponse })
            })
            .catch((err) => console.log(err))
    }
    console.log(currentWeather);
    console.log(forecast);
    return (
        <div>
            <div className="home_container">

                <div className="home_menu">
                    <div className="btn btn_employee">
                        <img className="img img1" src={require('./imgHome/employee.jpg')} alt="employee" />
                        <Link className="link" to={"/employee"}>Employee</Link>
                    </div>

                    <div className="btn btn_kindergarden">
                        <img className="img img2" src={require('./imgHome/kindergarden.jpg')} alt="kindergarden" />
                        <Link className="link" to={"/kindergartens"}><p>Kindergarden</p></Link>
                    </div>

                    <div className="btn btn_map">
                        <img className="img img3" src={require('./imgHome/map.jpg')} alt="map" />
                        <Link className="link" to={"/map"}><p>Map</p></Link>
                    </div>

                    <div className="btn btn_financy">
                        <img className="img img4" src={require('./imgHome/financy.jpg')} alt="financy" />
                        <Link className="link" to={"/financy"}><p>Financy</p></Link>
                    </div>
                </div>

                <div className="home_weather">
                    <Searchh onSearchChange={handleOnSearchChange} />
                    {currentWeather && <CurrentWeather data={currentWeather} />}
                    {forecast && <Forecast data={forecast} />}
                </div>
            </div>
        </div>
    )



}

export default Home


