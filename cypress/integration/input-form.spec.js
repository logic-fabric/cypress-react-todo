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
});
