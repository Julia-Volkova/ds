import React from "react";

import gridStyles from "../../styles/Grid.module.css";
import fieldStyles from "../../styles/Field.module.css";
import searchIcon from "../../icons/search.svg";

interface IFilterSearchInputProps {
  searchString: string;
  onChangeSearchValue: (value: string) => void;
}

const FilterSearchInput: React.FC<IFilterSearchInputProps> = ({
  searchString,
  onChangeSearchValue,
}) => {
  const changeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSearchValue(event.target.value);
  };

  const { row, col, col6 } = gridStyles;
  const { field, field__element, field__iconLeft, field__input } = fieldStyles;

  return (
    <div className={row}>
      <div className={`${col} ${col6}`}>
        <div className={field}>
          <div className={field__element}>
            <img src={searchIcon} alt="иконка" className={field__iconLeft} />
            <input
              className={field__input}
              placeholder="Введите название репозитория"
              type="text"
              value={searchString}
              onChange={changeSearchValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSearchInput;
