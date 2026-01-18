import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import openWeather from "./openWeather";

// Fetch 3-hour forecast data for a city
// 도시별 3시간 단위 날씨 예보 데이터를 가져오는 함수
const getWeatherForecast = (city: string) =>
    openWeather.getThreeHourForecastByCityName({
        cityName: city,
    });

// Forecast data grouped by day
// 날짜별로 묶인 예보 데이터 타입
export interface Day {
    date: string;
    forecast: any[];
}

// Custom hook to get weather forecast grouped by day
// 날짜 단위로 정리된 날씨 예보를 제공하는 커스텀 훅
const useWeatherForecast = (city: string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["weather-forecast", city],
        queryFn: () => getWeatherForecast(city),
    });

    // Group forecast list by date
    // 예보 리스트를 날짜 기준으로 그룹화
    const days = useMemo(() => {
        const days: Record<string, Day> = {};

        data?.list?.forEach((forecast: any) => {
            const date = forecast.dt_txt.split(" ")[0];

            let day = days[date];
            if (!day) {
                day = { date, forecast: [] };
                days[date] = day;
            }

            day.forecast.push(forecast);
        });

        return Object.values(days);
    }, [data]);

    return {
        ...rest,
        data,
        days,
    };
};

export default useWeatherForecast;
