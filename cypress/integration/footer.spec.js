describe("GIVEN the Footer component", () => {
  context("WHEN there is a single todo in the list", () => {
    it("THEN it displays a singular todo in count", () => {
      cy.initAndVisit([{ id: 1, name: "Buy Only One Egg", isComplete: false }]);

      cy.get(".todo-count").should("contain", "1 todo left");
    });
  });

  context("WHEN there are multiple todos in the list", () => {
    beforeEach(() => {
      cy.initAndVisit();
    });

    it("THEN it displays a plural todos in count", () => {
      cy.get(".todo-count").should("contain", "3 todos left");
    });

    it("THEN it is possible to filter active and completed todos", () => {
      const filters = [
        { link: /Active/i, expectedLength: 3 },
        { link: /Complete/i, expectedLength: 1 },
        { link: /All/i, expectedLength: 4 },
      ];

      cy.wrap(filters).each((filter) => {
        cy.contains(filter.link).click();

        cy.get(".todo-list li").should("have.length", filter.expectedLength);
      });
    });
  });
});
