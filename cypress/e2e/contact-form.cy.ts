beforeEach(() => {
  cy.intercept("POST", "/api/recaptcha.json", {
    statusCode: 200,
    body: { success: true, score: 0.9 },
  }).as("recaptcha");

  cy.intercept("POST", "/api/sendEmail.json", {
    statusCode: 200,
    body: { message: "Email sent successfully", data: { id: "test" } },
  }).as("sendEmail");
});

it("home page contact form", () => {
  const page = cy.visit("http://localhost:4321");

  page.get("h1").should("contain.text", "Ryan");

  const contactForm = "#form";
  const nameInput = "#name";
  const emailInput = "#email";
  const messageInput = "#message";
  const submitButton = "#form-button";
  const formSuccessDialog = "#form-dialog-success";

  cy.get(nameInput).type("Ryan");
  cy.get(emailInput).type("@gmail.com");
  cy.get(messageInput).type(
    "Hi there, what a great porfolio site! I'd love to work with you",
  );
  cy.get(submitButton).click();
  cy.get(emailInput).clear();
  cy.get(emailInput).type("ryan@gmail.com");
  cy.get(submitButton).click();
  cy.get(formSuccessDialog).should("be.visible");
  cy.get(formSuccessDialog).should("be.visible");
  cy.get(contactForm).should("have.attr", "inert", "true");
});
