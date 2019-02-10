import * as constants from '../../../src/app/constants/_index';
import * as api from '../../../src/app/api/_index';

const userId = '3-3-user@example.com';
const password = '123123';

describe('3-3 login-verify-email (logged out, existing user, valid password)', () => {
  it(`should be able to login, redirect to ${
    constants.PATH_VERIFY_EMAIL_SENT
  }`, () => {
    cy.deletePack({
      user_ids: [userId]
    });
    cy.seedPack({
      users: [
        {
          user_id: userId,
          password: password,
          email_verified: false
        }
      ]
    });
    cy.basicVisit(constants.PATH_LOGIN);
    cy.get('[data-cy=loginEmailInput]').type(userId);
    cy.get('[data-cy=loginPasswordInput]').type(password);
    cy.get('[data-cy=loginSignInButton]').click();
    cy.loading();
    cy.url({ timeout: 15000 }).should(
      'include',
      constants.PATH_VERIFY_EMAIL_SENT
    );
  });
});
