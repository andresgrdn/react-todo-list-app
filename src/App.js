import React, { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import Layout from "./Layout"
import TodoList from "./TodoList"
import "./styles/reset.css"
import "./styles/vars.css"
import "./styles/App.css"

const LOCAL_STORAGE_KEY = 'todosApp.todos'

const App = () => {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(prevTodos => [...prevTodos, ...storedTodos])
  }, []) // Run when page is loaded only once

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos([...todos, { id: uuidv4(), name, complete: false }])
    todoNameRef.current.value = null
  }
  function handleClearTodos() {
    const notCompletedTodos = todos.filter(todo => !todo.complete)
    setTodos([...notCompletedTodos])
  }

  function toggleTodo(id) {
    // newTodos is a copy of todos state array
    const newTodos = [...todos]
    // todo is a newTodos element's reference
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  return (
    <Layout>
      <h1>Todo list</h1>
      <input ref={todoNameRef} type="text" placeholder="Write a task to add..." />
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={handleClearTodos}>Clear complete</button>
      <div className="uncompletedTodosCount">
        {todos.filter(todo => !todo.complete).length} task left to do
      </div>

      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </Layout>
  )
}

export default App