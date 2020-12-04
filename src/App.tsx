import { useState, useEffect } from "react";
import "./App.css";

import RepositoryList from "./components/RepositoryList";
import FilterSearchInput from "./components/filters/FilterSearchInput";
import FilterLicenseType from "./components/filters/FilterLicenseType";
import FilterMessage from "./components/filters/FilterMessage";
import Loader from "./components/Loader";

import {
  EMPTY_SEARCH_RESULT,
  ERROR_TEXT,
  LANGUAGE_PARAMETER,
} from "./constants";
import gridStyles from "./styles/Grid.module.css";
import sectionStyles from "./styles/Section.module.css";
import getDateMonthAgoISO from "./utils/getDateMonthAgoISO";

let timer: any;

const App = () => {
  const [searchStringParameter, setSearchStringParameter] = useState("");
  const [licenseNameParameter, setLicenseNameParameter] = useState("0");
  const [licenses, setLicenses] = useState([]);
  const [repositories, setRepositories] = useState([]);

  const [isFetchRepositories, setIsFetchRepositories] = useState(false);
  const [isFetchRepositoriesError, setIsFetchRepositoriesError] = useState(
    false
  );
  const [fetchRepositoriesErrorText, setFetchRepositoriesErrorText] = useState(
    ""
  );

  const getValidUrl = (searchString: string, license: string) => {
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
    setIsFetchRepositoriesError(false);
    setFetchRepositoriesErrorText("");
    const url = getValidUrl(searchStringParameter, licenseNameParameter);
    let response = await fetch(url);
    if (response.ok) {
      let repositoryList = await response.json();
      setRepositories(repositoryList.items);
    } else {
      setIsFetchRepositoriesError(true);
      setFetchRepositoriesErrorText(ERROR_TEXT);
    }
    setIsFetchRepositories(false);
  };

  const fetchLicense = async () => {
    let response = await fetch("https://api.github.com/licenses");
    if (response.ok) {
      let licenseList = await response.json();
      setLicenses(licenseList);
    }
  };

  useEffect(() => {
    fetchLicense();
  }, []);

  useEffect(() => {
    setIsFetchRepositories(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      fetchRepositoryList();
    }, 1000);
  }, [searchStringParameter, licenseNameParameter]);

  const changeSearchValue = (value: string) => {
    setSearchStringParameter(value);
  };

  const changeLicenseType = (value: string) => {
    setLicenseNameParameter(value);
  };

  const { layout } = gridStyles;
  const { section } = sectionStyles;
  const isSearchNoResult = repositories.length === 0 && !isFetchRepositories;

  return (
    <>
      <div className={layout}>
        <div className={section}>
          <form>
            <FilterSearchInput
              searchString={searchStringParameter}
              onChangeSearchValue={changeSearchValue}
            />

            {licenses.length && (
              <FilterLicenseType
                licenses={licenses}
                selectedLicense={licenseNameParameter}
                onChangeLicenseType={changeLicenseType}
              />
            )}
          </form>
        </div>
        <div className={section} style={{ minHeight: "500px" }}>
          {repositories.length !== 0 && !isFetchRepositories && (
            <RepositoryList repositories={repositories} />
          )}
          {isFetchRepositories && <Loader />}
          {isSearchNoResult && <FilterMessage message={EMPTY_SEARCH_RESULT} />}
          {isFetchRepositoriesError && (
            <FilterMessage message={fetchRepositoriesErrorText} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
