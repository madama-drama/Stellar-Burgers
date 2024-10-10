import order from '../fixtures/order.json'

describe("modal-order", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open modal card about order", () => {
    cy.auth("qwertyuiop@yandex.ru", "password");
    cy.get("button").contains("Оформить заказ").click();
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "order",
    });

    cy.get("[data-testid=modalCard]").should("exist");
    cy.get("[data-testid=orderDetails]").should("be.visible");

    cy.get("[data-testid=number]").should('have.text', order.order.number)
  });
});
