import styled from "styled-components";
import { Container } from "../../Container.styles";

// Home page outer wrapper
// Home 페이지 전체를 감싸는 최상위 레이아웃 컨테이너
// 페이지 내부 요소들을 세로 방향으로 정렬하고 중앙 기준으로 배치
export const HomeWrapper = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// This day section layout
// 오늘의 날씨 정보를 표시하는 영역 레이아웃
// 공통 Container 스타일을 확장하여 사용
// 데스크톱에서는 가로 배치, 모바일에서는 세로 배치로 전환
export const ThisDayBlock = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;

    @media (max-width: 980px) {
        flex-direction: column;
        gap: 20px;
    }
`;
