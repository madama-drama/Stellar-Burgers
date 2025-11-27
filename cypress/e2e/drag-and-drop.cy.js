import ingredients from "../fixtures/ingredients.json";

describe("drag and drop", () => {
  beforeEach(() => {
    cy.visit("");

    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients",
    });
  });

  it("should successfuly relocate buns", () => {
    cy.drag_n_drop(0);
    cy.get("[data-testid=bun-in-container]").should("be.visible");
    cy.get(".constructor-element__text")
      .eq(0)
      .should("have.text", `${ingredients.data[0].name} (верх)`);
    cy.get(".constructor-element__text")
      .eq(1)
      .should("have.text", `${ingredients.data[0].name} (низ)`);
  });

  it("should successfuly relocate ingredients", () => {
    const elementSelector = "[data-testid=dragElement-in-container]";
    const titleSelector = elementSelector + " .constructor-element__text";

    cy.drag_n_drop(0);
    cy.drag_n_drop(1);
    cy.get(elementSelector).eq(0).should("be.visible");
    cy.get(titleSelector).eq(0).should("have.text", ingredients.data[1].name);

    cy.drag_n_drop(2);
    cy.get(elementSelector).eq(1).should("be.visible");
    cy.get(titleSelector).eq(1).should("have.text", ingredients.data[2].name);

    cy.get(elementSelector).eq(0).trigger("dragstart");
    cy.get(elementSelector).eq(1).trigger("drop");
    cy.get(titleSelector).eq(0).should("have.text", ingredients.data[2].name);
  });
});
