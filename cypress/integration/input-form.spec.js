describe("GIVEN a TodoForm component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("THEN it should focus input on load", () => {
    cy.focused().should("have.class", "new-todo");
  });

  it("THEN it should accepts input", () => {
    const TYPED_TEXT = "Buy milk";

    cy.get(".new-todo").type(TYPED_TEXT).should("have.value", TYPED_TEXT);
  });

  context("WHEN submitting the form", () => {
    beforeEach(() => {
      cy.server();
    });

    it("THEN it should add a new todo to the list", () => {
      const TYPED_TEXT = "Buy eggs";

      cy.route("POST", "/api/todos", {
        name: TYPED_TEXT,
        id: 1,
        isComplete: false,
      });

      cy.get(".new-todo")
        .type(TYPED_TEXT)
        .type("{enter}")
        .should("have.value", "");

      cy.get(".todo-list li")
        .should("have.length", 1)
        .and("contain", TYPED_TEXT);
    });

    it("THEN it should display an error message on a failed submission", () => {
      cy.server();
      cy.route({
        url: "/api/todos",
        method: "POST",
        status: 500,
        response: {},
      });

      cy.get(".new-todo").type("this input cause a fail").type("{enter}");
      cy.get(".todo-list li").should("not.exist");
      cy.get(".error").should("be.visible");
    });
  });
});
