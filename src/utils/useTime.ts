import { useEffect, useState } from "react";

// Get current time
export const getTime = () => {
    return new Date();
};

// Time hook with interval refresh
// 일정 주기로 현재 시간을 갱신하는 커스텀 훅
export const useTime = (refreshCycle = 100) => {
    const [now, setNow] = useState(getTime());

    // Update time on interval
    useEffect(() => {
        const intervalId = setInterval(() => setNow(getTime()), refreshCycle);

        return () => clearInterval(intervalId);
    }, [refreshCycle]);

    return now;
};
