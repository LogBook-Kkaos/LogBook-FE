/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/pages/login');
  });

  const registerUser = (email: string, password: string) => {
    cy.request({
      method: 'POST',
      url: '/api/pages/register',
      body: {
        email,
        password,
      },
    });
  };

  it('should display the login form correctly', () => {
    cy.get('input#email').should('exist');
    cy.get('input#auth-login-password').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should not log in with invalid credentials', () => {
    cy.get('input#email').type('testuser@example.com');
    cy.get('input#auth-login-password').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('#alert-dialog-title', 'ERROR: 404 USER_NOT_FOUND');
  });

  it('should log in with valid credentials', () => {
    const email = 'realuser@example.com';
    const password = 'correctpassword';
    registerUser(email, password);
    cy.get('input#email').type(email);
    cy.get('input#auth-login-password').type(password);
    cy.get('button[type="submit"]').click();
    // cy.url().should('eq', 'http://localhost:3000/dashboard');
  });

  // it('should navigate to the forgot password page', () => {
  //   cy.get('a').contains('비밀번호를 잊으셨나요?').click();
    
  //   // 어댑터에있는 실제 비밀번호 재설정 페이지 경로로 대체
  //   cy.url().should('include', '/forgot-password');
  // });
  
  it('should navigate to the register page', () => {
    cy.get('a').contains('회원가입').click();
    
    // 실제 회원가입 페이지 경로로 대체하십시오.
    cy.url().should('include', '/pages/register');
  });
});
