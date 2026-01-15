import React from "react";
import { useNavigate } from "react-router-dom";
import { SelectWrapper } from "../styles";

import CreatableSelect from "react-select/creatable";
import { CityOption, cityOptions } from "./data";
import { ActionMeta, OnChangeValue } from "react-select";

// City select component
// 도시 선택을 통해 경로 이동을 담당하는 select 컴포넌트
const CitySelect: React.FC = () => {
    const navigate = useNavigate();

    // Handle select change event
    // select 옵션 변경 시 선택된 도시 value를 기반으로 경로 이동 처리
    const handleChange = (
        newValue: OnChangeValue<CityOption, false>,
        actionMeta: ActionMeta<CityOption>
    ) => {
        navigate(`/${newValue?.value}`);
    };

    return (
        // Select wrapper for layout control
        // Header 내부에서 select UI 레이아웃을 담당하는 래퍼
        <SelectWrapper>
            {/* Creatable select component(react-select 기반 셀렉트 컴포넌트) */}
            <CreatableSelect
                onChange={handleChange}
                options={cityOptions}
                defaultValue={null}
                className="react-select-container"
                classNamePrefix="react-select"
            />
        </SelectWrapper>
    );
};

export default CitySelect;
