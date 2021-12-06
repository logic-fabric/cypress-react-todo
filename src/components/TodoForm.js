import React from "react";

export default (props) => (
  <form onSubmit={props.handleTodoSubmit}>
    <input
      className="new-todo"
      type="text"
      placeholder="What needs to be done?"
      value={props.currentTodo}
      onChange={props.handleNewTodoChange}
      autoFocus
    />
  </form>
);
