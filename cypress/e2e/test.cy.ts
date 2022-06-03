import Cypress from "cypress"

describe('Navigating to a page and not getting some data', () => {

    it('simulates a network failure when retrieving projects on an employee profile', () => {
        cy.intercept(
            'GET',
            'https://consulting-projects.academy-faculty.repl.co/api/projects*',
            { forceNetworkError: true }
        ).as('getNetworkFailure')

        cy.on('window:alert', (a) => expect(a).to.contains('get the projects'))

        cy.visit('/employees/3ece4f9f06bdaf25dcdca53b')

    })
})


describe('The proper use of session storage and retrieval', () => {
    const testText = 'Temi!'
    it('writes text to the filter bar', () => {
        cy.visit('/')
        cy.get('input').eq(0).clear().type(testText)
    })

    it('refreshes the page', () => {
        cy.reload()
    })

    it('it locates the text previously entered', () => {
        cy.get('input').eq(0).invoke('val').then((foundText) => {
            expect(foundText).to.match(new RegExp(testText))
        })
    })

})
