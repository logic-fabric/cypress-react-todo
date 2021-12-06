const BASE_URL = "http://localhost:3030";

describe("GIVEN a InputForm component", () => {
  it("THEN it should focus input on load", () => {
    cy.visit(BASE_URL);
  });
});
