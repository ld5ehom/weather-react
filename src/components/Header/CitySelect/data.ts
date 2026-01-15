// City option type definition
// react-select에서 사용하는 도시 선택 옵션 타입 정의
export interface CityOption {
    readonly value: string;
    readonly label: string;
}

// City select options
// 도시 선택을 위한 select 옵션 목록
// value는 URL 경로로 사용되고 label은 화면에 표시되는 텍스트
export const cityOptions: readonly CityOption[] = [
    { value: "Seoul", label: "Seoul" },
    { value: "Busan", label: "Busan" },
    { value: "London", label: "London" },
    { value: "Los Angeles", label: "Los Angeles" },
];
