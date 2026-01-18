import React from "react";
import getWeatherIcon from "../../utils/getWeatherIcon";
import type { WeatherIcon as IWeatherIcon } from "../../utils/getWeatherIcon";
import { StyledWeatherIcon } from "./styles";

interface WeatherIconProps extends React.HTMLAttributes<HTMLImageElement> {
    icon: IWeatherIcon;
}

// WeatherIcon component
// OpenWeather 아이콘 코드 또는 날씨 상태 값을 받아
// 대응되는 svg 파일명을 계산한 뒤 이미지로 렌더링
const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, ...props }) => {
    const iconSrc = `./images/weatherIcons/${getWeatherIcon(icon)}`;

    return <StyledWeatherIcon src={iconSrc} alt="" {...props} />;
};

export default WeatherIcon;
