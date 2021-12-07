describe("GIVEN a TodoList component", () => {
  beforeEach(() => {
    cy.initAndVisit();
  });

  it("THEN it displays properly compted items", () => {
    cy.get(".todo-list li")
      .filter(".completed")
      .should("have.length", 1)
      .and("contain", "Eggs")
      .find(".toggle")
      .should("be.checked");
  });

  it("THEN it shows the quantity of remaining todos in the footer", () => {
    cy.get(".todo-count").should("contain", 3);
  });

  it("THEN it is possible to remove a Todo", () => {
    cy.route({
      url: "/api/todos/1",
      method: "DELETE",
      status: 200,
      response: {},
    });

    cy.get(".todo-list li").as("todoLines");

    cy.get("@todoLines").first().find(".destroy").invoke("show").click();
    cy.get("@todoLines").should("have.length", 3).and("not.contain", "Milk");
  });
});
