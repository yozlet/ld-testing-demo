// See heading_color.cy.js for explanation of the usage of `cy.intercept`
// and `cy.wait`.

describe('Test both feature X and heading color', () => {

    context('Color is green and feature X is disabled', () => {
        beforeEach(() => {
            cy.setCookie('TESTFLAG_set-heading-color', "green")
            cy.setCookie('TESTFLAG_enable-feature-x', "false")
            cy.intercept('https://events.launchdarkly.com/**').as('ldevent')
            cy.visit('http://localhost:3000')
            cy.wait('@ldevent')
        })

        it('should have the green class set', () => {
            cy.get('h1').should('have.class', 'green')
        })

        it('should report the feature as disabled', () => {
            cy.get('p#x').should('contain', 'Nope')
        })      
    })

    context('Color is red and feature X is enabled', () => {
        beforeEach(() => {
            cy.setCookie('TESTFLAG_set-heading-color', "red")
            cy.setCookie('TESTFLAG_enable-feature-x', "true")
            cy.intercept('https://events.launchdarkly.com/**').as('ldevent')
            cy.visit('http://localhost:3000')
            cy.wait('@ldevent').then(() => {debugger;})
        })

        it('should have the red class set', () => {
            cy.get('h1').should('have.class', 'red')
        })

        it('should report the feature as enabled', () => {
            cy.get('p#x').should('contain', 'Yay')
        })      
    })
})
