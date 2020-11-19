import RepositoryListItem from "./RepositoryListItem";

const RepositoryList = ({repositories}) => {
  return (
    <>
      {repositories.map(({name, id, html_url, stargazers_count}) => <RepositoryListItem key={id} name={name} url={html_url} rating={stargazers_count}/>)}
    </>
  );
};

export default RepositoryList;