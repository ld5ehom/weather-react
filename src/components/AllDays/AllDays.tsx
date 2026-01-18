import React from "react";
import { useParams } from "react-router-dom";
import useWeatherForecast from "../../utils/useWeatherForecast";
import Day from "./Day";
import { AllDaysWrapper } from "./styles";

// AllDays component to render multi-day weather forecast
// 여러 날짜의 날씨 예보를 렌더링하는 AllDays 컴포넌트
const AllDays: React.FC = () => {
    // Get city parameter from URL
    const { id } = useParams();

    // Fetch weather forecast data grouped by day
    const { days, isLoading } = useWeatherForecast(
        id ? `${id}` : "Los Angeles",
    );

    return (
        // Wrapper for all day forecast cards
        <AllDaysWrapper>
            {days.map((day) => (
                // Render a single day forecast
                <Day day={day} key={day.date} />
            ))}
        </AllDaysWrapper>
    );
};

export default AllDays;
