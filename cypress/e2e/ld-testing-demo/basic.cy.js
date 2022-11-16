it('should have the header text', () => {
    cy.visit('http://localhost:3000')
    cy.get('h1').should('have.text', 'My lovely app')
});
