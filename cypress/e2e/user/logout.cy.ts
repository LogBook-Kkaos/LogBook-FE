describe('Logout', () => {
  before(() => {
    // 로그인 정보를 세션 스토리지에 설정
    sessionStorage.setItem('accessToken', 'test_access_token');
    sessionStorage.setItem('refreshToken', 'test_refresh_token');
    sessionStorage.setItem('email', 'test@example.com');
    sessionStorage.setItem('userName', 'Test User');
    sessionStorage.setItem('department', 'HR');
  });

  beforeEach(() => {
    // 로그아웃 API 요청의 가상 응답 설정
    cy.intercept('DELETE', '/api/users/logout', {
      statusCode: 200,
      body: {
        message: 'Logout successful',
      },
    });

    // 로그인 상태로 시작
    cy.visit('/dashboard', {
      onBeforeLoad: (win) => {
        win.sessionStorage.setItem('accessToken', 'test_access_token');
        win.sessionStorage.setItem('refreshToken', 'test_refresh_token');
        win.sessionStorage.setItem('email', 'test@example.com');
        win.sessionStorage.setItem('userName', 'Test User');
        win.sessionStorage.setItem('department', 'HR');
      },
    });
  });

  it('logs out the current user', () => {
    // UserDropdown 클릭
    cy.get('[data-testid="user-avatar"]')
      .click();

    // 로그아웃 버튼 클릭
    cy.get('[data-testid="logout-button"]')
      .click();

    // 페이지가 로그인 페이지로 리다이렉트 되었는지 확인
    cy.url()
      .should('eq', 'http://localhost:3000/pages/login/');


    // 세션 스토리지에서 로그인 정보가 제거되었는지 확인
    cy.window()
      .then((win) => {
        expect(win.sessionStorage.getItem('accessToken')).to.be.null;
        expect(win.sessionStorage.getItem('refreshToken')).to.be.null;
        expect(win.sessionStorage.getItem('email')).to.be.null;
        expect(win.sessionStorage.getItem('userName')).to.be.null;
        expect(win.sessionStorage.getItem('department')).to.be.null;
      });
  });
});
