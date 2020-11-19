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

  return (
    <div className={gridStyles.row}>
      <div className={`${gridStyles.col} ${gridStyles.col6}`}>
        <div className={fieldStyles.field}>
          <div className={fieldStyles.field__element}>
            <img src={searchIcon} className={fieldStyles.field__iconLeft}/>
            <input className={fieldStyles.field__input} placeholder="Введите название репозитория" type="text" value={searchString} onChange={changeSearchValue}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSearchInput;