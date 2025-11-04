describe("Blog navigation", () => {
  const baseUrl = "http://localhost:4321";

  it("navigates into a blog article and back to the listing", () => {
    cy.visit(`${baseUrl}/blog`);
    cy.get('a[aria-label^="Read more"]').first().click();
    cy.contains("a", "Go Back").click();
    cy.location("pathname").should("eq", "/blog");
    cy.contains("h1", "Blog Articles").should("be.visible");
  });
});
