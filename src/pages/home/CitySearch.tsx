import React from "react";
import { useFluentForm } from "react-fluent-form";
import AsyncSelect from "react-select/async";

import { useDebounce } from "../../custom-components/hooks/useDebounce";
import { citySearchFormConfig } from "../../form-config/CitySearchFormConfig";
import { CityForecast } from "../../models/CityForecastResponse";
import { City } from "../../models/CitySearchResponse";

interface CitySearchProps {
  queryFunction: (cityName: string) => Promise<void>;
  citySearch: (search: string) => Promise<City[]>;
  cityForecast: (city: City) => Promise<CityForecast>;
}

export const CitySearch: React.FC<CitySearchProps> = ({
  queryFunction,
  citySearch,
  cityForecast
}) => {
  const { values, fields, handleSubmit } = useFluentForm(citySearchFormConfig);

  const handleSubmitSuccess = () => {
    // queryFunction(values.city!.name);
    console.log(cityForecast(values.city!));
    console.log(values.city);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSuccess)}
      className="flex items-center"
    >
      <div className="w-full m-1">
        <AsyncSelect<City>
          placeholder="Search for City..."
          cacheOptions
          loadOptions={useDebounce(citySearch)}
          getOptionLabel={(city) => city.name}
          getOptionValue={(city) => city.name}
          onChange={fields.city.onChange as any}
          value={fields.city.value}
        />
      </div>
      <button className="btn" type="submit">
        Search
      </button>
    </form>
  );
};
