import { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "../shared";

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
    <li className="border-b border-gray-200 p-4 flex items-top space-x-4 w-full">
      {!isEditing && (
        <input
          type="checkbox"
          className="h-6 w-6 accent-emerald-400 hover:accent-emerald-500"
          checked={isComplete}
          onChange={handleStatusChange}
        />
      )}
      {isEditing ? (
        <div className="flex-grow flex flex-col gap-2">
          <Input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Title"
          />
          <Input
            type="date"
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
          />
          <textarea
            className="w-full h-[120px] px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
      ) : (
        <div className="flex-grow">
          <div>
            <span className="font-semibold">{todo.title}</span>
            <small>Due to: {todo.deadline}</small>
          </div>
          <p>{todo.description}</p>
        </div>
      )}
      <div className="m-0 flex flex-col">
        <button
          className="px-4 py-1 w-[60px] text-base font-normal text-cyan-500 rounded hover:text-cyan-600 transition"
          onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className="px-4 py-1 text-base font-normal text-red-500 rounded hover:text-red-600 transition"
          onClick={() => onDeleteTodo(index)}
        >
          Delete
        </button>
      </div>
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
