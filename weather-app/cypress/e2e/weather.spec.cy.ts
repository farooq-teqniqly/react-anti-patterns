describe("Weather app", () => {
  it("Displays the title", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Weather App");
  });
});
