import ToolbarPage from "../shareds/ToolbarPage.vue";

describe('AppBar component', () => {
    before(() => {
      cy.mount(ToolbarPage);
    });
  
    it('renders correctly', () => {
      cy.get('v-app-bar').should('be.visible');
      cy.get('v-app-bar-title').should('contain', 'Deep Space Store');
    });
  
    // it('navigates to home on title click', () => {
    //   cy.intercept('POST', '/api/navigation/home').as('goToHome'); // Assuming home route is called through an API call
    //   cy.get('v-app-bar-title').click();
    //   cy.wait('@goToHome').its('request.body').should('deep.equal', { resetStates: true }); // Verify data sent with navigation
    // });
  
    // it('opens ShopModal on cart icon click', () => {
    //   cy.get('v-btn').click();
    //   cy.get('ShopModal').should('be.visible');
    // });
  
    // it('updates cart badge count based on props', () => {
    //   cy.get('v-badge').should('contain', '0'); // Initial state
    //   cy.get('v-app-bar').invoke('prop', 'productsNumber', 5); // Simulate prop change
    //   cy.get('v-badge').should('contain', '5');
    // });
  
    // Add more tests based on your specific requirements, such as accessibility checks, state interactions, and styling checks.
  });