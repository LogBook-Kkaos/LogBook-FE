describe("Form content test", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/create-release-note");
  });

  it("fills out the form", () => {
    cy.get('#release_note_title')
      .type("릴리즈 노트 1")
      .should("have.value", "릴리즈 노트 1");

    cy.get('#creator_id')
      .type("윤주은")
      .should("have.value", "윤주은");

    cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input')
      .type("v1.2.3")
      .should("have.value", "v1.2.3");

    cy.get('.MuiSelect-select')
      .click();
    cy.get('.MuiList-root').contains('진행중').click();


    cy.get('#is_important')
      .click()
      .should("be.checked");

    cy.get('#is_public')
      .click()
      .should("be.checked");


    cy.get('#release_note_content')
      .type("Fixed a bug")
      .should("have.value", "Fixed a bug");
  });
});
