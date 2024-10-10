describe("modal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid=cardIngredient]").first().click();
    cy.get("[data-testid=modalCard]").should("exist");
  });

  it("should close with button", () => {
    cy.get("[data-testid=close-button]").click();

    cy.get("[data-testid=modalCard]").should("not.exist");
  });

  it("should close with overlay", () => {
    cy.get("[data-testid=overlay]").trigger("click", { force: true });

    cy.get("[data-testid=modalCard]").should("not.exist");
  });

});
