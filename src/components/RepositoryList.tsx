import React from "react";

import RepositoryListItem from "./RepositoryListItem";

interface IRepositoryListProps {
  repositories: {
    id: number;
    stargazers_count: number;
    name: string;
    html_url: string;
  }[];
}

const RepositoryList: React.FC<IRepositoryListProps> = ({ repositories }) => {
  return (
    <>
      {repositories.map((repository) => (
        <RepositoryListItem key={repository.id} repository={repository} />
      ))}
    </>
  );
};

export default RepositoryList;
