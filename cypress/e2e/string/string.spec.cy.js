describe('app works correctly with routes', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/recursion');
    });

    it('should open home page', function () {
        cy.contains('Строка');
        cy.get('[data-testid="input"]').type('hello');
        cy.get('button').should('not.be.disabled');
        cy.get('[data-testid="input"]').clear();
        cy.get('button').should('be.disabled');
    });

}); 