import styled from "styled-components";
import { Container } from "../../Container.styles";

// Header layout wrapper
// Header 전체를 감싸는 레이아웃 컨테이너
// 공통 Container 스타일을 확장하여 사용
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
// 로고 이미지와 애플리케이션 타이틀을 묶는 영역
// Header 좌측에 배치되는 flex 컨테이너
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

// Select wrapper
// react-select 컴포넌트를 감싸는 래퍼 영역
// Header 우측 정렬 및 select 스타일 커스터마이징 담당
export const SelectWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;

    .react-select-container {
        width: 200px;
    }

    .react-select__control {
        border-radius: 20px;
    }

    .react-select__placeholder {
        color: #939cb0;
        font-weight: 300;
        font-size: 18px;
    }

    .react-select__value-container {
        padding: 4px 12px;
    }

    @media (max-width: 980px) {
        .react-select-container {
            width: 350px;
        }
    }
`;
