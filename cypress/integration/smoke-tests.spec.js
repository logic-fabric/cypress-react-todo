describe("GIVEN a user", () => {
  beforeEach(() => {
    cy.request("GET", "/api/todos")
      .its("body")
      .each((todo) => cy.request("DELETE", `/api/todos/${todo.id}`));
  });

  context("WHEN there is no todo", () => {
    it("THEN the user can save new todos", () => {
      const ITEMS = [
        { text: "Buy milk", expectedLength: 1 },
        { text: "Buy eggs", expectedLength: 2 },
        { text: "Meet the postman", expectedLength: 3 },
      ];

      cy.visit("/");
      cy.server();
      cy.route("POST", "/api/todos").as("createTodo");

      cy.wrap(ITEMS).each((item) => {
        cy.focused().type(item.text).type("{enter}");
        cy.wait("@createTodo");
        cy.get(".todo-list li").should("have.length", item.expectedLength);
      });
    });
  });
});
