import React from "react";
import { Container } from "../../Container.styles";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import CitySelect from "./CitySelect/CitySelect";

// Header component
// 페이지 상단에서 로고와 네비게이션 역할을 담당하는 Header 컴포넌트
const Header = () => {
    return (
        // Header wrapper rendered as semantic header tag
        // 시맨틱 header 태그로 렌더링되는 헤더 레이아웃 컨테이너
        <HeaderWrapper as="header">
            {/* Logo section(로고 영역) */}
            <Logo>
                {/* Home link logo(홈으로 이동하는 로고 링크) */}
                <Link to="/">
                    <img src="./images/logo.svg" alt="logo" />
                </Link>

                {/* Application title(애플리케이션 제목) */}
                <h2>Weather</h2>
            </Logo>
            <CitySelect />
        </HeaderWrapper>
    );
};

export default Header;

// Header layout wrapper
// Header 전체 영역을 감싸는 레이아웃 컨테이너
// Container 공통 레이아웃을 확장하여 사용
export const HeaderWrapper = styled(Container)`
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 980px) {
        flex-direction: column;
        gap: 20px;
    }
`;

// Logo container
// 로고 이미지와 타이틀 텍스트를 묶는 영역
// 왼쪽 정렬된 flex 레이아웃으로 구성
export const Logo = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    h2 {
        font-weight: 700;
        font-size: 25px;
        line-height: 30px;
        text-transform: uppercase;
        color: #4793ff;
    }
`;
