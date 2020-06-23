import React from "react";
import { useFluentForm } from "react-fluent-form";

import { citySearchFormConfig } from "../../form-config/CitySearchFormConfig";

interface CitySearchProps {
  queryFunction: (city: string) => Promise<void>;
}

export const CitySearch: React.FC<CitySearchProps> = ({ queryFunction }) => {
  const { values, fields, handleSubmit, reset, validity } = useFluentForm(
    citySearchFormConfig
  );

  const handleSubmitSuccess = () => {
    queryFunction(values.city);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSuccess)}
      className="flex items-center"
    >
      <div className="w-full m-1">
        <input
          type="text"
          className="input"
          placeholder="Search for City..."
          {...fields.city}
        />
      </div>
      <button className="btn" type="submit" disabled={!validity.city}>
        Search
      </button>
    </form>
  );
};
