import ingredients from "../fixtures/ingredient.json";

describe("modal-ingredient", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open modal card about ingredients", () => {
    cy.get("[data-testid=cardIngredient]").first().click();

    cy.get("[data-testid=modalCard]").should("exist");
    cy.get("[data-testid=ingredientDetails]").should("be.visible");

    cy.get("[data-testid=cardIngredient] h3")
      .first()
      .should("have.text", ingredients.data[0].name);
    cy.get("[data-testid=ingredientDetails] h2")
      .first()
      .should("have.text", ingredients.data[0].name);
  });
});
