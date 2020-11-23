import gridStyles from '../../styles/Grid.module.css';
import fieldStyles from '../../styles/Field.module.css';
import searchIcon from '../../icons/search.svg'

const FilterSearchInput = ({searchString, onChangeSearchValue}) => {
  let timer;

  const changeSearchValue = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeSearchValue(e.target.value);
    }, 1500);
  };

  const {row, col, col6} = gridStyles;
  const {field, field__element, field__iconLeft, field__input} = fieldStyles;

  return (
    <div className={row}>
      <div className={`${col} ${col6}`}>
        <div className={field}>
          <div className={field__element}>
            <img src={searchIcon} className={field__iconLeft}/>
            <input className={field__input} placeholder="Введите название репозитория" type="text" value={searchString} onChange={changeSearchValue}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSearchInput;