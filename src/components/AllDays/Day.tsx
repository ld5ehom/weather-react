import React, { useMemo } from "react";
import { Day as IDay } from "../../utils/useWeatherForecast";
import WeatherIcon from "../WeatherIcon";
import { BottomPart, DayWrapper, TopPart } from "./styles";

interface DayProps {
    day: IDay;
}

// Day component to display a single day's weather summary
// 하루 단위 날씨 요약 정보를 표시하는 Day 컴포넌트
const Day: React.FC<DayProps> = ({ day }) => {
    // Destructure date and forecast list from day data
    // 날짜와 해당 날짜의 예보 리스트 분해
    const { date, forecast } = day;

    // Calculate highest temperature of the day
    const temp = Math.max(...forecast.map((x) => Math.round(x.main.temp)));

    // Calculate lowest temperature of the day
    const lowestTemp = Math.min(
        ...forecast.map((x) => Math.round(x.main.temp)),
    );

    // Create weekday label from date
    const weekDays = new Date(date);
    const dayOfWeek = weekDays.toDateString().substring(0, 3);

    // Format date string for UI display
    const dates = date.split("-").join(".").substring(5);

    // Group forecasts by weather condition icon
    const dayConditions = useMemo(() => {
        const conditions: Record<
            string,
            {
                [x: string]: any;
            }
        > = {};

        forecast?.forEach?.((f) => {
            const forecastCondition = f.weather[0].icon;
            let condition = conditions[forecastCondition];

            if (!condition) {
                condition = { condition: forecastCondition, forecast: [] };
                conditions[forecastCondition] = condition;
            }

            condition.forecast.push(f);
        });

        return Object.values(conditions);
    }, [forecast]);

    // Select the most frequent weather condition of the day
    // 하루 동안 가장 많이 등장한 날씨 상태 선택
    const dominantCondition = useMemo(
        () =>
            Object.values(dayConditions).sort(
                (cond1, cond2) => cond2.forecast.length - cond1.forecast.length,
            )?.[0]?.condition,
        [dayConditions],
    );

    return (
        // Wrapper for a single day forecast card
        // 하루 날씨 정보를 감싸는 카드 레이아웃
        <DayWrapper>
            <TopPart>
                <div>
                    <h2>{dayOfWeek}</h2>
                    <h3>{dates}</h3>
                </div>
                <WeatherIcon icon={dominantCondition} />
            </TopPart>
            <BottomPart>
                <h2>{temp}°</h2>
                <h3>{lowestTemp}°</h3>
            </BottomPart>
        </DayWrapper>
    );
};

export default Day;
