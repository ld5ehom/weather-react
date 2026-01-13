import styled from "styled-components";

// Common layout container
// 페이지 전반에서 공통으로 사용하는 레이아웃 컨테이너
// 콘텐츠 최대 너비를 제한하고 화면 중앙에 정렬하는 역할
export const Container = styled.div`
    max-width: 1200px;
    height: fit-content;
    width: 90%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    font-family: "Montserrat", sans-serif;

    @media (max-width: 980px) {
        max-width: 800px;
        width: 90%;
    }
`;
