const RepositoryListItem = ({name, url, rating}) => {
  return <a style={{display: 'block', marginBottom: '10px',}} href={url}
            target="_blank">{name} ({rating.toLocaleString('ru')})</a>
};

export default RepositoryListItem;