import { createForm, field } from 'react-fluent-form'
import * as yup from 'yup'

import { City } from '../models/CitySearchResponse'
import { Nullable } from '../utils/Nullable'

interface CitySearchForm {
  city: Nullable<City>;
}

export const citySearchFormConfig = createForm<CitySearchForm>()({
  city: field.singleSelect<City>(null),
}).withValidation({
  city: yup.object().required(),
});
