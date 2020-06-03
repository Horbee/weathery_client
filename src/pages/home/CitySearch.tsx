import React from "react";
import { Button, Form } from "react-bootstrap";
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
    <Form
      onSubmit={handleSubmit(handleSubmitSuccess)}
      className="flex-justify-even"
    >
      <Form.Group controlId="formBasicEmail" className="w-100 m-1">
        <Form.Control
          type="text"
          placeholder="Search for City..."
          {...fields.city}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!validity.city}>
        Search
      </Button>
    </Form>
  );
};
