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

  context("WHEN there are active todos", () => {
    beforeEach(() => {
      cy.fixture("todos").each((todo) => {
        const newTodo = Cypress._.merge(todo, { isComplete: false });
        cy.request("POST", "/api/todos", newTodo);
      });

      cy.visit("/");
    });

    it("THEN the existing data are loaded from the DB", () => {
      cy.get(".todo-list li").should("have.length", 4);
    });

    it("THEN the user can delete all todos", () => {
      cy.server();
      cy.route("DELETE", "/api/todos/*").as("delete");

      cy.get(".todo-list li")
        .each(($elt) => {
          cy.wrap($elt).find(".destroy").invoke("show").click();
          cy.wait("@delete");
        })
        .should("not.exist");
    });

    it("THEN the user can toggle todos", () => {
      const clickAndWait = ($elt) => {
        cy.wrap($elt).as("item").find(".toggle").click();
        cy.wait("@update");
      };

      cy.server();
      cy.route("PUT", "/api/todos/*").as("update");

      cy.get(".todo-list li")
        .each(($elt) => {
          clickAndWait($elt);

          cy.get("@item").should("have.class", "completed");
        })
        .each(($elt) => {
          clickAndWait($elt);

          cy.get("@item").should("not.have.class", "completed");
        });
    });
  });
});
