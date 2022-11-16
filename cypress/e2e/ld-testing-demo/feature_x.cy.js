describe('Testing feature x', () => {

  context('Feature is enabled', () => {
    beforeEach(() => {
      cy.setCookie('TESTFLAG_enable-feature-x', "true")
      cy.visit('http://localhost:3000')
    })

    it('should report the feature as enabled', () => {
      cy.get('p#x').should('contain', 'Yay')
    })
  })

  context('Feature is disabled', () => {
    beforeEach(() => {
      cy.setCookie('TESTFLAG_enable-feature-x', "false")
      cy.visit('http://localhost:3000')
    })

    it('should report the feature as disabled', () => {
      cy.get('p#x').should('contain', 'Nope')
    })
  })
})