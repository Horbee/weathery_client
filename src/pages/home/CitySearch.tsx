import { useEffect } from 'react'
import { useFluentForm } from 'react-fluent-form'
import AsyncSelect from 'react-select/async'

import { useDebounce } from '../../custom-components/hooks/useDebounce'
import { citySearchFormConfig } from '../../form-config/CitySearchFormConfig'
import { City } from '../../models/CitySearchResponse'

interface CitySearchProps {
  citySearch: (search: string) => Promise<City[]>;
  cityForecast: (city: City) => Promise<void>;
}

// TODO: save last search's options as default values

export const CitySearch: React.FC<CitySearchProps> = ({
  citySearch,
  cityForecast,
}) => {
  const { values, fields, handleSubmit } = useFluentForm(citySearchFormConfig);

  const handleSubmitSuccess = async () => {
    await cityForecast(values.city!);
  };

  useEffect(() => {
    if (values.city) {
      handleSubmitSuccess();
    }
    // eslint-disable-next-line
  }, [values.city]);

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
    </form>
  );
};
