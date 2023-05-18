/* eslint jest/expect-expect: 0 */

describe('Frontend', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    cy.visit('http://localhost:3003/')
  })

  it('front page can be opened', function() {
    cy.contains('Phonebook')
    cy.contains('Add a new')
    cy.contains('Numbers')
  })

  it('can add a valid name and number', function() {
    cy.get('#nameField').type('Sopu Järvinen')
    cy.get('#numberField').type('040-5653247')
    cy.get('#add-button').click()
    cy.contains('Sopu Järvinen 040-5653247')
  })

  it('can delete a number', function() {
    cy.get('#nameField').type('Sopu Järvinen')
    cy.get('#numberField').type('040-5653247')
    cy.get('#add-button').click()

    cy.contains('delete').click()
    cy.contains('Sopu Järvinen deleted')
  })

})