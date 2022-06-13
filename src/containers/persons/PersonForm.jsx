import React, { useEffect, useState } from "react";

const PersonForm = ({ onSave, person }) => {
  const [values, setValues] = useState({
    name: "",
    number: 0
  });

  useEffect(() => {
    if (!person) return;
    setValues((prev) => ({
      ...prev,
      name: person.name,
      number: person.number
    }));
  }, [person]);

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = () => {
    onSave(values);
  };

  return (
    <div>
      <h2>{person ? "Edit " + person.name : "Add a new person"}</h2>
      <form onSubmit={onSubmit}>
        <div>
          name:
          <input name="name" value={values.name} onChange={handleChange} />{" "}
          <br />
        </div>
        <div>
          number:
          <input name="number" value={values.number} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
