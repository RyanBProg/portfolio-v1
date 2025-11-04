describe("Projects page accordion behaviour", () => {
  const baseUrl = "http://localhost:4321";

  it("opens and closes the project accordion panels", () => {
    cy.visit(`${baseUrl}/projects`);

    const featuresButton1 = "#features-btn-article_1";
    const featuresContent1 = "#features-content-article_1";
    const featuresButton2 = "#features-btn-article_2";
    const featuresContent2 = "#features-content-article_2";
    const nextButton = "#next_button";
    const article1 = "#article_1";
    const article2 = "#article_2";

    cy.get(article1).should("have.attr", "aria-hidden", "false");
    cy.get(article2).should("have.attr", "aria-hidden", "true");

    cy.get(featuresButton1).should("have.attr", "aria-expanded", "false");
    cy.get(featuresContent1).should("have.attr", "aria-hidden", "true");

    cy.get(featuresButton1).click();
    cy.get(featuresButton1).should("have.attr", "aria-expanded", "true");
    cy.get(featuresContent1).should("have.attr", "aria-hidden", "false");

    cy.get(featuresButton1).click();
    cy.get(featuresButton1).should("have.attr", "aria-expanded", "false");
    cy.get(featuresContent1).should("have.attr", "aria-hidden", "true");

    cy.get(nextButton).click();
    cy.get(article1).should("have.attr", "aria-hidden", "true");
    cy.get(article2).should("have.attr", "aria-hidden", "false");

    cy.get(featuresButton2).click();
    cy.get(featuresButton2).should("have.attr", "aria-expanded", "true");
    cy.get(featuresContent2).should("have.attr", "aria-hidden", "false");

    cy.get(featuresButton2).click();
    cy.get(featuresButton2).should("have.attr", "aria-expanded", "false");
    cy.get(featuresContent2).should("have.attr", "aria-hidden", "true");
  });
});
