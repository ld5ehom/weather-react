import React from "react";
import { useParams } from "react-router-dom";
import useWeather from "../../utils/useWeather";
import CurrentTime from "./CurrentTime";
import { Bottom, ThisDayWrapper, Top } from "./style";

const ThisDay: React.FC = () => {
    const { id } = useParams();

    // Fetch weather data by route param
    const { data, isLoading } = useWeather(id ? `${id}` : "Los Angeles");

    // console.log('data',data);
    // console.log('isLoading', isLoading);

    // Temperature and city name
    const temperature = Math.round(data?.main.temp || 0);
    const cityName = data?.name;

    // Weather icon selection
    const weatherIcon = data?.weather[0].main;
    const weatherId = data?.weather[0].id;
    let imageSrc = "./images/mainly_cloudy.svg";

    if (weatherIcon === "Clear") {
        imageSrc = "./images/weatherIcons/clear-sky.svg";
    } else if (weatherIcon === "Clouds" && (weatherId || 0) >= 803) {
        imageSrc = "./images/weatherIcons/broken-clouds.svg";
    } else if (weatherIcon === "Clouds" && (weatherId || 0) < 803) {
        imageSrc = "./images/weatherIcons/few-clouds.svg";
    } else if (weatherIcon === "Atmosphere") {
        imageSrc = "./images/weatherIcons/mist.svg";
    } else if (weatherIcon === "Rain") {
        imageSrc = "./images/weatherIcons/rain.svg";
    } else if (weatherIcon === "Rain" && (weatherId || 0) > 505) {
        imageSrc = "./images/weatherIcons/shower-rain.svg";
    } else if (weatherIcon === "Snow") {
        imageSrc = "./images/weatherIcons/snow.svg";
    } else if (weatherIcon === "Thunderstorm") {
        imageSrc = "./images/weatherIcons/thunderstorm.svg";
    }

    return (
        <ThisDayWrapper>
            {isLoading ? (
                // Loading state
                // 데이터 로딩 중 상태 표시
                "Loading..."
            ) : (
                <>
                    <Top>
                        <div>
                            <h2>{temperature}°</h2>
                            <h3>Now</h3>
                        </div>
                        <img src={imageSrc} alt="" />
                    </Top>
                    <Bottom>
                        <CurrentTime />
                        <div>
                            {cityName} - {data?.sys.country}
                        </div>
                    </Bottom>
                </>
            )}
        </ThisDayWrapper>
    );
};

export default ThisDay;
