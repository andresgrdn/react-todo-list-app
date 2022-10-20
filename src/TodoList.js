import React from "react"
import Todo from "./Todo"
import "./styles/TodoList.css"

const TodoList = ({ todos, toggleTodo }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      })}
    </div>
  )
}

export default TodoList;