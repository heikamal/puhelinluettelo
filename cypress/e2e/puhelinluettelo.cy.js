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

  it('can view a name and a number from the database', function() {
    cy.contains('Heikki Malkavaara 123-0513287')
  })

})