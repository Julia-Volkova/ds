import React from "react";

import gridStyles from "../../styles/Grid.module.css";
import fieldStyles from "../../styles/Field.module.css";
import arrowIcon from "../../icons/arrow.svg";

interface IFilterLicenseTypeProps {
  licenses: {
    key: string;
    name: string;
  }[];
  selectedLicense: string;
  onChangeLicenseType: (value: string) => void;
}

const FilterLicenseType: React.FC<IFilterLicenseTypeProps> = ({
  licenses,
  selectedLicense,
  onChangeLicenseType,
}) => {
  const { row, col, col6 } = gridStyles;
  const {
    field,
    field__element,
    field__select,
    field__iconRight,
  } = fieldStyles;

  return (
    <div className={row}>
      <div className={`${col} ${col6}`}>
        <div className={field}>
          <div className={field__element}>
            <select
              className={field__select}
              name=""
              id=""
              value={selectedLicense}
              onChange={(e) => onChangeLicenseType(e.target.value)}
            >
              <option value="0">Все виды лицензий</option>
              {licenses.length &&
                licenses.map(({ key, name }) => {
                  return (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  );
                })}
            </select>
            <img src={arrowIcon} alt="иконка" className={field__iconRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterLicenseType;
