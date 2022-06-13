import clsx from "clsx";
import { useEffect, useState } from "react";

import FilterForm from "./containers/persons/FilterForm";
import PersonForm from "./containers/persons/PersonForm";
import Persons from "./containers/persons/Persons";
import {
  removePerson,
  createPerson,
  editPerson,
  getPersonByName
} from "./services/persons";
import { getPersons } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "error",
    message: ""
  });

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const result = await getPersons();
        setPersons(result);
        setLoading(false);
      } catch (error) {
        setAlert((prev) => ({
          ...prev,
          message: error.message || "Something went wrong"
        }));
      }
    };
    init();
  }, []);

  // creation
  const handleCreatePerson = async (values) => {
    const person = await createPerson(values);
    setPersons((prev) => {
      return [
        ...prev,
        {
          id: persons[persons.length - 1].id++,
          ...person
        }
      ];
    });
  };

  // deletion
  const handleDeletePerson = async (id) => {
    setLoading(true);
    const person = await removePerson(id);
    const newPersons = persons.filter((p) => p.id !== person.id);
    setPersons(newPersons);
    setLoading(false);
  };

  // update
  const handleConfirmUpdatePerson = async (id, values) => {
    if (!values.name) return;

    const person = await getPersonByName(values.name);
    // edit only the number field if the person's name exists
    if (person) {
      setAlert((prev) => ({
        ...prev,
        type: "warning",
        message: "Person with that name already exists"
      }));
      setLoading(true);
      const newValues = { number: values.number };
      const updatedPerson = await editPerson(id, newValues);
      const newPersons = [...persons];
      newPersons.map((person) => {
        if (person.id === id) {
          return {
            ...person,
            ...updatedPerson
          };
        }
        return person;
      });
      setPersons(newPersons);
      setLoading(false);
      // create a new person if there is there is no persons with the same name
    } else {
      handleCreatePerson(values);
    }
  };

  // search
  const handleSearchPerson = (value) => {
    // if no input value
    if (!value) return;

    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );

    // if input but no result
    if (filteredPersons.length > 0) {
      setPersons(filteredPersons);
      return;
    }

    setPersons([]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {alert.message && (
        <div className={"alert-" + alert.type}>{alert.message}</div>
      )}
      <FilterForm onSearch={handleSearchPerson} />

      <PersonForm onSave={handleCreatePerson} />
      {/* ---------- loading  ---------- */}
      {loading ? (
        <div>...Loading</div>
      ) : // ---------- list  ---------- //
      persons.length > 0 ? (
        <Persons
          persons={persons}
          onDelete={handleDeletePerson}
          onConfirmUpdate={handleConfirmUpdatePerson}
        />
      ) : (
        // ---------- no result  ---------- //
        <div>No Result</div>
      )}
    </div>
  );
};

export default App;
