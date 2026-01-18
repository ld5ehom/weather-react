# [React 라우팅 및 초기 프로젝트 세팅 작업 정리](https://github.com/ld5ehom/weather-react/commit/832fff6bc9bba1a6f5df064ff8f9298a810ead87)

## 1. 작업 목표

- React 프로젝트에서 페이지 라우팅을 위한 기본 구조 구성
- react-router-dom을 이용한 URL 기반 라우팅 적용
- @tanstack/react-query를 전역 데이터 패칭 및 캐시 관리 용도로 초기 세팅
- TypeScript 환경에서 발생한 모듈, 타입, 경로 관련 에러 해결
- 프로젝트 초기 구조 안정화

---

## 2. 프로젝트 환경

- Create React App (CRA)
- TypeScript
- React Router v6
- React Query (@tanstack/react-query)
- npm 패키지 매니저

---

## 3. 설치한 패키지 목록

### 3-1. react-router-dom

페이지 라우팅을 위해 설치

```
npm install react-router-dom
```

역할

- URL 기반 페이지 분기
- BrowserRouter, Routes, Route 사용
- 동적 라우트(path parameter) 처리

---

### 3-2. @tanstack/react-query

전역 데이터 패칭 및 캐시 관리를 위해 설치

```
npm install @tanstack/react-query
```

역할

- API 요청 결과 캐싱
- 전역 QueryClient 관리
- 추후 외부 API 연동에 사용 예정

---

## 4. 라우터 기본 구조 설정

### 4-1. index.tsx

- 애플리케이션 최상단에서 BrowserRouter로 App 컴포넌트를 감싸 라우팅 활성화
- BrowserRouter는 한 번만 사용
- App 내부에서는 Routes / Route만 정의

---

### 4-2. App.tsx

- QueryClient 생성 후 QueryClientProvider로 앱 전체를 감쌈
- Routes를 사용해 URL 경로별로 렌더링할 컴포넌트 정의
- 모든 경로(\*)와 동적 경로(/:id)를 Home 페이지로 연결

라우팅 구조

-   - : 모든 경로 처리
- /:id : id 파라미터를 받는 동적 라우트

---

## 5. pages 폴더 구조 정리

### 5-1. Home 페이지 구조

폴더 단위 페이지 구조 적용

구조

- src/pages/Home/Home.tsx
- src/pages/Home/index.ts

index.ts 역할

- Home 폴더의 엔트리 파일
- Home.tsx를 default export
- App.tsx에서 폴더 단위 import 가능

이 구조를 사용하면

- import 경로 단순화
- 페이지 확장 시 구조 유지 용이

---

## 6. TypeScript 관련 이슈 및 해결 과정

### 6-1. react-router-dom 모듈 인식 문제

문제

- react-router-dom 모듈을 찾지 못하는 에러 발생

원인

- 패키지 설치 이전에 import를 먼저 작성함

해결

- react-router-dom 설치
- TypeScript 서버 재시작

---

### 6-2. CSS 파일(index.css) 타입 에러

문제

- CSS side-effect import에 대한 타입 선언 에러 발생

원인

- TypeScript 환경에서 CSS 모듈 타입 선언 누락

해결

- src/custom.d.ts 파일 생성
- CSS 모듈 선언 추가

---

### 6-3. 프로젝트 타입 충돌 문제

문제

- TypeScript가 프로젝트 타입을 잘못 인식하여 모듈 해석 오류 발생

원인

- 불필요한 설정 파일이 남아 있었음

해결

- 사용하지 않는 설정 파일 제거
- CRA 기준으로 타입 시스템 정리

---

### 6-4. Home 컴포넌트 import 경로 문제

문제

- 실제 폴더 구조와 import 경로 불일치

원인

- pages/Home/Home.tsx 구조에서 폴더 엔트리 파일 없이 import 시도

해결

- pages/Home/index.ts 추가
- App.tsx에서 ./pages/Home 형태로 import 변경

---

## 7. 현재 상태 요약

- react-router-dom 정상 동작
- React Query Provider 정상 적용
- Home 페이지 라우팅 정상
- 주요 TypeScript 에러 해결
- 프로젝트 기본 구조 안정화 완료
