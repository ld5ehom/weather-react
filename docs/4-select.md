# [Header 도시 선택(select) 기능 구현 요약](https://github.com/ld5ehom/weather-react/commit/494276aa9aa68bf725f3cd26e97109ef6ee2db95)

## 핵심 구현 내용

- Header 영역에 **react-select 기반 도시 선택(select) UI** 추가
- 도시 옵션을 선택하면 **선택된 value를 기준으로 URL 경로 이동**
    - 예: `Seoul` 선택 → `/seoul`
- **CitySelect 컴포넌트 분리**로 Header 구조 정리
- select 전용 **SelectWrapper 스타일 컴포넌트** 구현

## 구성 요소

- **CitySelect**
    - react-select(CreatableSelect) 사용
    - onChange 이벤트에서 `useNavigate`로 라우팅 처리
    - 도시 옵션 목록(`cityOptions`)을 별도 데이터로 관리

- **Header**
    - 기존 로고/타이틀 구조 유지
    - CitySelect를 Header 우측에 배치

## 데이터 구조

- **CityOption 타입 정의**
    - `label`: 화면 표시용 텍스트
    - `value`: URL 경로로 사용하는 값
- **cityOptions 배열**
    - 도시 선택 목록 관리

## 스타일

- Header 전용 스타일 파일에서 **SelectWrapper** 추가
- react-select 클래스 프리픽스 기반으로
    - width
    - border-radius
    - placeholder 스타일
    - 반응형 너비 조정

## 결과

- Header에서 도시 선택 가능
- 선택 즉시 해당 도시 경로로 이동
- 이후 도시별 날씨 데이터 연동을 위한 UI/라우팅 준비 완료
