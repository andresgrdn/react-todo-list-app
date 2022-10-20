import React from "react"
import './styles/Todo.css'

const Todo = ({ todo, toggleTodo }) => {
  function handleToggleTodo() {
    toggleTodo(todo.id)
  }

  return (
    <label className="Todo">
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={handleToggleTodo}
      />
      {todo.name}
    </label>

  )
}

export default Todo;