import React from "react";

interface IFilterMessageProps {
  message: string;
}

const FilterMessage: React.FC<IFilterMessageProps> = ({ message }) => {
  return (
    <div className="row">
      <div className="col col-12">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default FilterMessage;
