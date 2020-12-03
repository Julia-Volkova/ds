import React from "react";

interface IRepositoryListItemProps {
  repository: {
    name: string;
    html_url: string;
    stargazers_count: number;
  };
}

const RepositoryListItem: React.FC<IRepositoryListItemProps> = ({
  repository: { name, html_url, stargazers_count },
}) => {
  return (
    <a
      style={{ display: "block", marginBottom: "10px" }}
      href={html_url}
      target="_blank"
    >
      {name} ({stargazers_count.toLocaleString("ru")})
    </a>
  );
};

export default RepositoryListItem;
