import TodoItem from "./TodoItem.component";
import { PropTypes } from "prop-types";

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  const groupedTodos = todos.reduce((groups, todo) => {
    const deadline = todo.deadline || "No Deadline";
    if (!groups[deadline]) {
      groups[deadline] = [];
    }
    groups[deadline].push(todo);
    return groups;
  }, {});

  const sortedDeadlines = Object.keys(groupedTodos).sort((a, b) => {
    if (a === "No Deadline") return 1;
    if (b === "No Deadline") return -1;
    return new Date(b) - new Date(a);
  });

  return (
    <div className="w-full">
      {sortedDeadlines.length !== 0 ? (
        sortedDeadlines.map((deadline, index) => (
          <div key={deadline}>
            <h3
              className={`font-bold text-gray-900 ${
                index === 0 ? "pt-0" : "pt-12"
              } pb-4`}
            >
              {deadline}
            </h3>
            <ul>
              {groupedTodos[deadline].map((todo, index) => (
                <TodoItem
                  key={`${deadline}-${index}`}
                  index={todos.indexOf(todo)}
                  todo={todo}
                  onUpdateTodo={onUpdateTodo}
                  onDeleteTodo={onDeleteTodo}
                />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No todos</p>
      )}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
