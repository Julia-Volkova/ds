import gridStyles from '../../styles/Grid.module.css';
import fieldStyles from '../../styles/Field.module.css';
import arrowIcon from "../../icons/arrow.svg";

const FilterLicenseType = ({licenses, selectedLicense, onChangeLicenseType}) => {
  return (
    <div className={gridStyles.row}>
      <div className={`${gridStyles.col} ${gridStyles.col6}`}>
        <div className={fieldStyles.field}>
          <div className={fieldStyles.field__element}>
            <select className={fieldStyles.field__select} name="" id="" value={selectedLicense}
                    onChange={(e) => onChangeLicenseType(e.target.value)}>
              <option value="0">Все виды лицензий</option>
              {licenses.map(({key, name}) => <option key={key} value={key}>{name}</option>)}
            </select>
            <img src={arrowIcon} className={fieldStyles.field__iconRight}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterLicenseType;