import {useState, useEffect} from 'react';
import './App.css';

import RepositoryList from "./components/RepositoryList";
import FilterSearchInput from "./components/filters/FilterSearchInput";
import FilterLicenseType from "./components/filters/FilterLicenseType";
import FilterMessage from "./components/filters/FilterMessage";
import Loader from "./components/Loader";

import {EMPTY_SEARCH_RESULT, LANGUAGE_PARAMETER} from './constants'
import gridStyles from './styles/Grid.module.css'
import sectionStyles from './styles/Section.module.css'
import getDateMonthAgoISO from './utils/getDateMonthAgoISO';


const App = () => {
  const [searchStringParameter, setSearchStringParameter] = useState(null);
  const [licenseNameParameter, setLicenseNameParameter] = useState(0);
  const [licenses, setLicenses] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [isFetchRepositories, setIsFetchRepositories] = useState(false);
  const [isRepositoriesFiltered, setIsRepositoriesFiltered] = useState(false);
  const [isFetchRepositoriesError, setIsFetchRepositoriesError] = useState(false);
  const [fetchRepositoriesErrorText, setFetchRepositoriesErrorText] = useState(null);

  const getValidUrl = (searchString, license) => {
    let url = `https://api.github.com/search/repositories?sort=stars&q=created:>=${getDateMonthAgoISO()}+language:${LANGUAGE_PARAMETER}`;

    if (searchString && +license !== 0) {
      url += `+${searchString}+in:name+license:${license}`;
      return url;
    } else if (+license !== 0) {
      url += `+license:${license}`;
    } else if (searchString) {
      url += `+${searchString}+in:name`;
    }
    return url;
  };

  const fetchRepositoryList = async () => {
    setIsFetchRepositories(false);
    setIsFetchRepositoriesError(false);
    setFetchRepositoriesErrorText(null);
    const url = getValidUrl(searchStringParameter, licenseNameParameter);
    setIsFetchRepositories(true);

    let response = await fetch(url);
    if (response.ok) {
      let repositoryList = await response.json();
      setRepositories(repositoryList.items);
      setIsFetchRepositories(false);
    } else {
      setIsFetchRepositoriesError(true);
      setFetchRepositoriesErrorText(`Произошла ошибка. Мы уже работаем над ее устранением`)
    }
  };

  const fetchLicense = async () => {
    let response = await fetch('https://api.github.com/licenses');
    if (response.ok) {
      let licenseList = await response.json();
      setLicenses(licenseList);
    }
  }

  useEffect(() => {
    fetchLicense();
  }, []);

  useEffect(() => {
    fetchRepositoryList();
  }, [searchStringParameter, licenseNameParameter]);

  const changeSearchValue = (value) => {
    setSearchStringParameter(value);
    setIsRepositoriesFiltered(value.length && licenseNameParameter !== '0');
  };

  const changeLicenseType = (value) => {
    setLicenseNameParameter(value);
    setIsRepositoriesFiltered(value !== '0');
  };

  return (
    <>
      <div className={gridStyles.layout}>
        <div className={sectionStyles.section}>
          <form>
            <FilterSearchInput onChangeSearchValue={changeSearchValue}/>

            {licenses.length &&
            <FilterLicenseType licenses={licenses} selectedLicense={licenseNameParameter}
                               onChangeLicenseType={changeLicenseType}/>}
          </form>
        </div>
        <div className={sectionStyles.section} style={{minHeight: '500px'}}>
          {repositories.length !== 0 && !isFetchRepositories && <RepositoryList repositories={repositories}/>}
          {isFetchRepositories && <Loader/>}
          {repositories.length === 0 && isRepositoriesFiltered && <FilterMessage message={EMPTY_SEARCH_RESULT}/>}
          {isFetchRepositoriesError && <FilterMessage message={fetchRepositoriesErrorText}/>}
        </div>
      </div>
    </>
  );
};

export default App;
