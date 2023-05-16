/* eslint jest/expect-expect: 0 */

describe('Phonebook', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3002/')
  })

  it('front page can be opened', function() {
    cy.contains('Phonebook')
    cy.contains('Add a new')
    cy.contains('Numbers')
  })

})