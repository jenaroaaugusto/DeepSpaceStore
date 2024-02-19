import OptionsPage from "../shareds/OptionsPage.vue";

describe('AppBar component', () => {
    before(() => {
      cy.mount(OptionsPage);
    });
  
    it('renders correctly', () => {
      cy.get('v-app-bar').should('be.visible');
      cy.get('v-app-bar-title').should('contain', 'Deep Space Store');
    });
  });