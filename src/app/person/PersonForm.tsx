import React from 'react';
import GenericForm from '@/base/components/GenericForm';
import { Person } from '@/types/individual/Person';

const PersonForm: React.FC = () => {
  const fields = [
    { name: 'full_name', label: 'Nome Completo', type: 'text' },
    { name: 'age', label: 'Idade', type: 'number' },
    { name: 'birthdate', label: 'Data de Nascimento', type: 'date' },
    { name: 'sex', label: 'Sexo', type: 'text' },
    { name: 'phone', label: 'Telefone', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'national_id', label: 'CPF', type: 'text' },
    { name: 'house_id', label: 'ID da Casa', type: 'number' },
    { name: 'marital_status', label: 'Estado Civil', type: 'text' },
    { name: 'occupation', label: 'Ocupação', type: 'text' },
    { name: 'nationality', label: 'Nacionalidade', type: 'text' },
  ];

  const handleSubmit = (data: Person) => {
    console.log(data); // Replace with actual submission logic (e.g., API call)
  };

  return (
    <GenericForm<Person> fields={fields} onSubmit={handleSubmit} />
  );
};

export default PersonForm;
