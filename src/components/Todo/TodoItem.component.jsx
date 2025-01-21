import { useState } from "react";
import PropTypes from "prop-types";

const TodoItem = ({ index, todo, onUpdateTodo, onDeleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title || "");
  const [editedDescription, setEditedDescription] = useState(
    todo.description || ""
  );
  const [editedDeadline, setEditedDeadline] = useState(todo.deadline || "");
  const [isComplete, setIsComplete] = useState(todo.isComplete || false);

  const handleUpdate = () => {
    onUpdateTodo(index, {
      ...todo,
      title: editedTitle,
      description: editedDescription,
      deadline: editedDeadline,
    });
    setIsEditing(false);
  };

  const handleStatusChange = (e) => {
    onUpdateTodo(index, {
      ...todo,
      isComplete: e.target.checked,
    });
    setIsComplete(e.target.checked);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={isComplete}
        onChange={handleStatusChange}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="date"
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
          />
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <p>{todo.description}</p>
          <small>Deadline: {todo.deadline}</small>
        </>
      )}
      <button onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={() => onDeleteTodo(index)}>Delete</button>
    </li>
  );
};

TodoItem.propTypes = {
  index: PropTypes.number.isRequired,
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
