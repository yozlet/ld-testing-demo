// Test a page element controlled by the LaunchDarkly JavaScript SDK,
// which runs in the browser.
//
// When the page loads, the LaunchDarkly SDK will initialize and fetch
// flag values from the LaunchDarkly cloud service, then update the page.
// The delay between the page loading and the SDK initialization could
// cause test failures, so we need the test to wait until the SDK has
// initialized and executed the code under test.
//
// The technique we've employed in this test is to wait for the SDK
// to send flag evaluation event messages back to the LaunchDarkly
// cloud service. We use `cy.intercept` and `cy.wait` to watch for
// the event messages and pause until they're complete.

describe('Header color', () => {

    context('Color is green', () => {
    beforeEach(() => {
        cy.setCookie('TESTFLAG_set-heading-color', "green")
        cy.intercept('https://events.launchdarkly.com/**').as('ldevent')
        cy.visit('http://localhost:3000')
        cy.wait('@ldevent')
    })

    it('should have the green class set', () => {
        cy.get('h1').should('have.class', 'green')
    })
    })

    context('Color is red', () => {
    beforeEach(() => {
        cy.setCookie('TESTFLAG_set-heading-color', "red")
        cy.intercept('https://events.launchdarkly.com/**').as('ldevent')
        cy.visit('http://localhost:3000')
        cy.wait('@ldevent').then(() => {debugger;})
    })

    it('should have the red class set', () => {
        cy.get('h1').should('have.class', 'red')
    })
    })
})
