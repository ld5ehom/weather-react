import { useQuery } from "@tanstack/react-query";
import openWeather from "./openWeather";

// Fetch current weather by city
// 도시 이름을 기준으로 현재 날씨 데이터를 조회하는 함수
const getWeather = (city: string) =>
    openWeather.getCurrentWeatherByCityName({
        cityName: city,
    });

// Weather query hook
// 도시별 현재 날씨 데이터를 조회하는 React Query 커스텀 훅
const useWeather = (city: string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["weather", city],
        queryFn: () => getWeather(city),
        enabled: !!city,
    });

    return {
        ...rest,
        data,
    };
};

export default useWeather;
