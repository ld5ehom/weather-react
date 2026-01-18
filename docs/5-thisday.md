# [ThisDay 컴포넌트 구현 (날씨 데이터 + 현재 시간 표시)](https://github.com/ld5ehom/weather-react/commit/a62965d9aba17e6f95d1c7f776f451b539748a22)

## 1. 오늘 설치한 것

- OpenWeatherMap SDK 설치(openweathermap-ts)
    - 날씨 API를 직접 fetch로 구성하지 않고 SDK 메서드로 호출하기 위해 설치
    ```
    npm install openweathermap-ts
    ```

## 2. 구현 목적

오늘 작업의 목적은 **현재 선택된 도시의 날씨 정보와 현재 시간을 함께 표시하는 ThisDay 컴포넌트를 완성**하는 것이다.  
데이터 요청/시간 갱신/화면 표시 로직을 각각 분리해서, 이후 확장(도시 추가, UI 확장, API 변경)에 쉽게 대응할 수 있게 구성했다.

## 3. 날씨 데이터 처리 구조(주석 단 코드 기준)

### 3-1. OpenWeatherMap 클라이언트 설정(openWeather)

- OpenWeatherMap SDK 인스턴스를 별도의 유틸 파일로 분리했다.
- API Key와 단위(metric)를 한 번만 설정해두고 재사용한다.
- 이 파일은 “날씨 요청의 기준값”만 담당한다.

의도:

- 컴포넌트마다 API 설정을 반복하지 않게 만들기
- 날씨 API 관련 설정 변경이 생겨도 한 곳만 수정하도록 만들기

### 3-2. useWeather 훅(도시 → 현재 날씨 조회)

- 도시 이름(city)을 입력으로 받아 현재 날씨 데이터를 조회한다.
- React Query(useQuery)를 사용해서 요청/캐시/로딩 상태를 관리한다.
- queryKey를 ["weather", city]로 구성해서 도시별 캐시가 분리되도록 했다.
- city가 비어 있으면 요청이 나가지 않도록 방어 로직(enabled)을 둔다.

의도:

- UI 컴포넌트에서 API 호출 코드를 직접 쓰지 않도록 분리
- 도시가 바뀌면 자동으로 다시 조회되는 구조 만들기
- ThisDay에서는 data/isLoading 같은 결과만 받아서 화면에 집중하기

## 4. 현재 시간 처리 구조(주석 단 코드 기준)

### 4-1. useTime 훅(시간 갱신)

- getTime()으로 Date를 생성한다.
- useTime(refreshCycle)은 내부에서 setInterval로 주기마다 now를 갱신한다.
- cleanup에서 clearInterval을 호출해 메모리 누수를 방지한다.
- 결과로 “주기적으로 갱신되는 Date(now)”를 반환한다.

의도:

- 시간 갱신 로직을 컴포넌트 바깥으로 분리해서 재사용 가능하게 만들기
- CurrentTime 컴포넌트는 표시 역할만 하도록 만들기

### 4-2. CurrentTime 컴포넌트(Intl.DateTimeFormat)

- useTime(1000)을 사용해 1초마다 갱신되는 시간을 받는다.
- Intl.DateTimeFormat으로 시간 문자열을 만든다.
- 시간 기준은 미국 LA로 고정한다(timeZone: America/Los_Angeles).
- locale은 en-US로 두어 미국 기준 표기 형태로 맞춘다.
- 최종적으로 포맷된 문자열(time)만 화면에 출력한다.

의도:

- ThisDay 내부에 시간 포맷 로직을 섞지 않기 위해 CurrentTime으로 분리
- 시간은 훅이 만들고, CurrentTime은 포맷/표시만 담당

## 5. ThisDay 컴포넌트 핵심 로직(주석 단 코드 기준)

### 5-1. 도시 결정 방식(useParams)

- URL 파라미터에서 id를 가져온다.
- id가 있으면 그 값을 도시로 사용한다.
- id가 없으면 기본 도시를 사용한다(초기 테스트를 위한 fallback).

### 5-2. 날씨 데이터 사용(useWeather)

- useWeather(도시)를 호출해서 data/isLoading을 받는다.
- 로딩 중이면 Loading...을 표시한다.
- data가 준비되면:
    - 온도(data.main.temp)를 반올림해 표시
    - 도시 이름(data.name) 표시
    - 국가 코드(data.sys.country) 표시

### 5-3. 날씨 아이콘 선택 로직

- data.weather[0].main / data.weather[0].id 값을 이용해 아이콘 경로(imageSrc)를 결정한다.
- Clear / Clouds(803 기준 분기) / Atmosphere / Rain / Snow / Thunderstorm 등으로 분기했다.
- 조건에 해당하지 않는 경우를 대비해 기본 아이콘을 둔다.

### 5-4. 시간 표시(CurrentTime 사용)

- ThisDay가 시간을 직접 계산하지 않는다.
- CurrentTime 컴포넌트를 포함해 “현재 시간 표시”를 맡긴다.
- ThisDay는 “날씨 화면 구성”에 집중하도록 역할을 분리했다.

## 6. 오늘 구현의 핵심 포인트 정리

- openweathermap-ts로 API 호출 기반을 만들고(openWeather)
- 도시 입력값을 받아 날씨를 조회하는 훅(useWeather)으로 로직을 분리
- 현재 시간은 훅(useTime)으로 갱신하고, 컴포넌트(CurrentTime)에서 포맷/표시
- ThisDay는 도시 파라미터를 기반으로 날씨를 조회해 온도/아이콘/도시/국가/시간을 한 화면에 구성
