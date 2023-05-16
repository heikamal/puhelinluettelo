describe('Phonebook', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3002')
  })

  it('front page can be opened', function() {
    cy.contains('Phonebook')
    cy.contains('Add a new')
    cy.contains('Numbers')
  })

  it('add form functions', function() {
    cy.get('#nameField').type('Fiksu Niminen')
    cy.get('#numberField').type('050-5328734')
    cy.get('#add-button').click()
    cy.contains('Fiksu Niminen 050-5328734')
  })
})