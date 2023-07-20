// formReleaseNote.spec.js
describe("FormReleaseNote test", () => {
  beforeEach(() => {
    cy.visit("/create-release-note");

  });

  it("checks title input functionality", () => {
    cy.get("#release_note_title")
      .clear()
      .type("New Release Note Title")
      .should("have.value", "New Release Note Title");
  });

  it("checks save and delete buttons visibility", () => {
    cy.get("button[type='submit']").contains("저장").should("be.visible");
    cy.get('[data-testid="delete-button"]').contains("삭제").should("be.visible");
  });

  it("adds and deletes a change item", () => {

    cy.once('uncaught:exception', () => false);

    cy.get('[data-testid="add_textfield_button"]')
      .contains("변경사항 추가")
      .click();

    cy.get("#release_note_content_0").should("exist");

  });

  it("checks if checkboxes are toggled", () => {
    cy.get("#is_important").check().should("be.checked");
    cy.get("#is_public").uncheck().should("not.be.checked");
  });

  // 추가적인 테스트 케이스를 작성하여 완전한 테스트를 구성할 수 있습니다.
});
