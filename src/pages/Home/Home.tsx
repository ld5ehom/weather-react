import React from "react";
import AllDays from "../../components/AllDays";
import Header from "../../components/Header";
import ThisDay from "../../components/ThisDay/ThisDay.tsx";
import ThisDayInfo from "../../components/ThisDayInfo";
import { HomeWrapper, ThisDayBlock } from "./styles";

const Home: React.FC = () => {
    return (
        <HomeWrapper>
            <Header />
            <ThisDayBlock>
                <ThisDay />
                <ThisDayInfo />
            </ThisDayBlock>
            <AllDays />
        </HomeWrapper>
    );
};

export default Home;
