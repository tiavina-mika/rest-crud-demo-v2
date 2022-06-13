import { useState } from "react";
import PersonForm from "./PersonForm";

const Persons = ({ persons, onDelete, onConfirmUpdate }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const toggleEditForm = () => setShowEditForm((prev) => !prev);

  const handleSubmit = (id) => (values) => {
    onConfirmUpdate(id, values);
  };

  return (
    <div>
      <h4>List of persons</h4>
      <div>
        {persons.map((person) => (
          <div key={person.id}>
            {/* header */}
            <div>
              <div className="flexRow">
                <span>{person.name}</span>
                <span>{person.number}</span>
              </div>
              <div className="flexRow">
                <button type="button" onClick={() => onDelete(person.id)}>
                  Delete
                </button>
                <button type="button" onClick={toggleEditForm}>
                  Update
                </button>
              </div>
            </div>
            {/* form */}
            {showEditForm && (
              <div>
                <PersonForm
                  person={person}
                  onSubmit={() => handleSubmit(person.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;
