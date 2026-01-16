import { useTime } from "../../utils/useTime";

// Time format options
const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Los_Angeles",
};

// CurrentTime component
const CurrentTime = () => {
    const currentTime = useTime(1000);

    const time = new Intl.DateTimeFormat("en-US", options).format(currentTime);

    return <div>{time}</div>;
};

export default CurrentTime;
