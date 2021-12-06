describe("GIVEN the app that inititializes", () => {
  it("THEN it loads togos on page load", () => {
    cy.initAndVisit();

    cy.get(".todo-list li").should("have.length", 4);
  });

  it("THEN it displays an error if todos loading fails", () => {
    cy.server();
    cy.route({
      url: "/api/todos",
      method: "GET",
      status: 500,
      response: {},
    });
    cy.visit("/");

    cy.get(".todo-list li").should("not.exist");
    cy.get(".error").should("be.visible");
  });
});
