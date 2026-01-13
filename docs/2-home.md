# Home 페이지 styled-components UI 구현

## 1. 설치한 패키지

-   styled-components

    -   Home 페이지 UI를 styled-components로 구성하기 위해 설치

```
npm install styled-components
```

-   @types/styled-components
    -   TypeScript 환경에서 styled-components 타입 지원을 위해 설치

```
npm install -D @types/styled-components
```

---

## 2. 구현 내용

-   Home 페이지 레이아웃을 styled-components로 구현
-   페이지 전체 래퍼(HomeWrapper) 스타일 정의
-   오늘 날씨 영역(ThisDayBlock) 레이아웃 구현
-   공통 레이아웃 컨테이너(Container) 스타일 구현
-   Home 페이지에서 Header, ThisDay, ThisDayInfo, AllDays 컴포넌트 조합

---

## 3. 구현 파일

-   src/pages/Home/Home.tsx
-   src/pages/Home/styles.ts
-   src/Container.styles.ts

---

## 4. styled-components 구성 요소

-   HomeWrapper

    -   Home 페이지 전체를 감싸는 최상위 레이아웃

-   ThisDayBlock

    -   오늘 날씨 정보를 표시하는 영역 레이아웃
    -   화면 크기에 따라 배치 방식 변경

-   Container
    -   페이지 전반에서 재사용하는 공통 레이아웃 컨테이너
    -   최대 너비 제한 및 중앙 정렬
