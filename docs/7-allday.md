# AllDays / Day 컴포넌트 구현 (날씨 예보 UI)

## 1. 작업 목적

이번 작업의 목표는 오늘 날씨(ThisDay) 화면을 확장해서, 여러 날짜의 예보를 카드 형태로 보여주는 UI를 구현하는 것이었다.
OpenWeather의 3시간 단위 예보 데이터는 그대로 쓰기 어렵기 때문에, 날짜 기준으로 묶고 요약 정보(대표 날씨, 최고/최저 기온)를 계산해서 화면에서 바로 렌더링 가능한 구조로 만들었다.

추가로, 프로젝트 진행 중 tsconfig.json이 삭제되거나 경로 해석이 꼬이면서 import 에러가 반복 발생해서, baseUrl/include 설정을 다시 추가해 TypeScript가 src 기준으로 파일을 인식하도록 정리했다.

## 2. 설치 및 사용 라이브러리

- 예보 데이터 요청 라이브러리

```
npm install openweathermap-ts
```

## 3. 구현 범위

- useWeatherForecast 훅 생성
    - 3시간 예보 데이터를 날짜 단위로 그룹화해서 days 배열로 반환

- AllDays 컴포넌트 생성
    - days 배열을 순회하면서 Day 컴포넌트를 렌더링

- Day 컴포넌트 생성
    - 하루 예보를 요약해서 카드로 표시
    - 최고/최저 기온 계산
    - 대표 날씨 상태(dominant condition) 계산 후 아이콘 표시

- WeatherIcon 컴포넌트 생성
    - 날씨 상태 코드를 svg 파일명으로 변환해 아이콘 렌더링

- getWeatherIcon 유틸 수정
    - 아이콘 코드 또는 상태 문자열을 프로젝트 아이콘 파일명으로 매핑

- tsconfig.json 추가/정리
    - src 기준 import 해석 및 파일 include 범위 복구

## 4. 핵심 설계

### 4-1. useWeatherForecast 훅에서 날짜 단위로 데이터 재구성

OpenWeather의 3시간 단위 예보(list)는 하루에 여러 개 항목으로 내려온다.
UI에서는 날짜별 카드가 필요해서, dt_txt에서 날짜 문자열만 분리해 동일 날짜끼리 묶고 days 배열을 만든다.
이렇게 하면 AllDays/Day 쪽에서는 복잡한 가공 로직 없이 날짜 단위 데이터만 받으면 된다.

- 입력: city (도시명)
- 출력: data (원본 응답), days (날짜 단위로 묶인 배열)

### 4-2. AllDays는 데이터 계산 없이 렌더링만 담당

AllDays는 URL 파라미터(id)를 기준으로 도시를 결정하고, useWeatherForecast를 호출해서 days를 받은 뒤 Day 컴포넌트를 반복 렌더링한다.
데이터 가공 책임은 훅에 위임하고 AllDays는 화면 배치만 담당한다.

### 4-3. Day는 하루 예보를 요약해서 카드로 표시

Day는 하루치 forecast 배열을 받아서 다음을 계산한다.

- 최고 기온: 하루 forecast의 main.temp 중 최댓값
- 최저 기온: 하루 forecast의 main.temp 중 최솟값
- 날짜 표시용 포맷: yyyy-mm-dd를 요일/월일 형태로 변환
- 대표 날씨(dominant condition): 하루 동안 가장 많이 등장한 weather icon을 선택

대표 날씨 상태는 WeatherIcon에 전달해 아이콘을 표시한다. 즉, Day는 하루 카드 UI만 책임지고, 아이콘 매핑 규칙은 별도 유틸로 분리한다.

### 4-4. WeatherIcon + getWeatherIcon으로 아이콘 규칙 분리

아이콘 매핑 로직이 UI 안에 들어가면 조건 분기가 계속 늘어나 유지보수가 어렵다.
그래서 WeatherIcon 컴포넌트는 icon 값을 받아 getWeatherIcon으로 파일명을 얻고, 정해진 assets 경로에서 svg를 렌더링만 한다.
아이콘 규칙 변경은 getWeatherIcon만 수정하면 되게 분리했다.

## 5. tsconfig.json 추가/정리 (중요)

프로젝트에서 tsconfig.json이 누락되거나 설정이 꼬이면 TypeScript가 src 폴더를 정상적으로 포함(include)하지 못하고, import 해석이 불안정해진다.
특히 src 기준 절대경로 import(예: src/utils/...)를 사용할 때 baseUrl이 없으면 계속 모듈을 못 찾는 문제가 발생한다.

그래서 tsconfig.json을 다시 추가했고, 핵심은 아래 두 가지다.

- include: ["src"]
    - TypeScript가 src 내부 파일들을 프로젝트 대상으로 확실히 포함

- baseUrl: "."
    - 절대경로 import를 쓰는 경우 기준 경로를 설정
    - (src/... 형태를 쓰려면 추가로 paths 설정이 필요할 수 있음)

현재는 src 폴더를 기준으로 파일들이 정상 포함되고, 경로 해석이 흔들리지 않게 만드는 목적이다.

## 6. 오늘 작업 결과

- 3시간 단위 예보 데이터를 날짜 기준으로 묶어 days 배열을 만들었다
- AllDays에서 날짜별 Day 카드 리스트를 렌더링했다
- Day에서 최고/최저 기온과 대표 날씨 상태를 계산해 표시했다
- 대표 날씨 상태를 WeatherIcon으로 전달해 아이콘을 렌더링했다
- 아이콘 매핑 규칙을 getWeatherIcon 유틸로 분리해 유지보수 가능하게 만들었다
- tsconfig.json을 다시 추가해서 src 포함 및 경로 해석 문제를 정리했다
