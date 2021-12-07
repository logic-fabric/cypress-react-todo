import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { deleteTodo, loadTodos, saveTodo, updateTodo } from "../lib/service";
import { filterTodos } from "../lib/utils";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTodo: "",
      todos: [],
      error: false,
    };
    this.handleNewTodoChange = this.handleNewTodoChange.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    loadTodos()
      .then(({ data }) => this.setState({ todos: data }))
      .catch(() => this.setState({ error: true }));
  }

  handleNewTodoChange(event) {
    this.setState({ currentTodo: event.target.value });
  }

  handleToggle(todoId) {
    const targetTodo = this.state.todos.find((todo) => todo.id === todoId);
    const updatedTodo = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete,
    };

    updateTodo(updatedTodo).then(({ data }) => {
      const todos = this.state.todos.map((todo) =>
        todo.id === data.id ? data : todo
      );
      this.setState({ todos: todos });
    });
  }

  handleDelete(todoId) {
    deleteTodo(todoId).then(() =>
      this.setState({
        todos: this.state.todos.filter((todo) => todo.id !== todoId),
      })
    );
  }

  handleTodoSubmit(event) {
    event.preventDefault();

    const newTodo = { name: this.state.currentTodo, isComplete: false };

    saveTodo(newTodo)
      .then(({ data }) =>
        this.setState({
          currentTodo: "",
          todos: this.state.todos.concat(data),
        })
      )
      .catch(() => this.setState({ error: true }));
  }

  render() {
    const remainingTodosQuantity = this.state.todos.filter(
      (todo) => !todo.isComplete
    ).length;

    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>

            {this.state.error ? <span className="error">Oh no!</span> : null}

            <TodoForm
              currentTodo={this.state.currentTodo}
              handleNewTodoChange={this.handleNewTodoChange}
              handleTodoSubmit={this.handleTodoSubmit}
            />
          </header>

          <section className="main">
            <Route
              path="/:filter?"
              render={({ match }) => (
                <TodoList
                  todos={filterTodos(match.params.filter, this.state.todos)}
                  handleToggle={this.handleToggle}
                  handleDelete={this.handleDelete}
                />
              )}
            />
          </section>

          <Footer remainingTodosQuantity={remainingTodosQuantity} />
        </div>
      </Router>
    );
  }
}
