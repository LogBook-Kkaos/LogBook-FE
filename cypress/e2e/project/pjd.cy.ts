/// <reference types="Cypress" />

describe('ProjectTable', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/project-detail'); // 프로젝트에서 설정한 페이지 URL
  });

  it('renders successfully', () => {
    // 첫 번째 테이블 셀의 내용을 확인함 (번호)
    cy.get('table tbody tr:first-child th:first-child').contains(4);

    // v 1.2.1 버전이 첫 번째 행에 있는지 확인
    cy.get('table tbody tr:first-child td')
      .eq(0)
      .contains('v 1.2.1');

    // 첫 번째 행의 상태 태그가 "진행중" 인지 확인
    cy.get('table tbody tr:first-child td')
      .eq(2)
      .contains('진행중');

    // 첫 번째 행의 날짜가 "2023.06.30" 인지 확인
    cy.get('table tbody tr:first-child td')
      .eq(3)
      .contains('2023.06.30');
  });
});
