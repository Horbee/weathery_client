import { ComponentPropsMapper, Field } from 'react-fluent-form'
import { ActionMeta } from 'react-select'

import { Nullable } from '../../utils/Nullable'

export interface ReactSingleSelectProps<T> {
  field: ReactSingleSelectPropsInternal<T>;
}

interface ReactSingleSelectPropsInternal<T> {
  value: Nullable<T>;
  onChange:
    | ((value: Nullable<T>, actionMeta: ActionMeta<T>) => void)
    | undefined;
}

export class ReactSingleSelect<T> extends Field<
  Nullable<T>,
  ReactSingleSelectPropsInternal<Nullable<T>>
> {
  public mapToComponentProps: ComponentPropsMapper<
    Nullable<T>,
    ReactSingleSelectPropsInternal<Nullable<T>>
  > = ({ value, setValue, setTouched }) => ({
    value,
    onChange: setValue,
    onBlur: () => setTouched(),
  });
}
