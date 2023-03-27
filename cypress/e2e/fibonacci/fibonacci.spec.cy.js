
describe('app works correctly with routes', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/fibonacci');
    });

    it('Check button logic', function () {
        cy.contains('Последовательность Фибоначчи');
        cy.get('[data-testid="input"]').type('8');
        cy.get('button').should('not.be.disabled');
        cy.wait(3000);
        cy.get('[data-testid="input"]').clear();
        cy.get('button').should('be.disabled');
    });



    it('Check visual', function () {
        const result = [1,1,2,3,5,8,13,21,34];
        cy.get('[data-testid="input"]').type(8);
        cy.wait(2000);
        cy.get('button').contains('Развернуть').click();

        cy.wait(10000);
        cy.get('[data-testid="circle-main"]').each(($el, index, $list)=>{
            cy.wrap($el).contains(result[index]);
        })

    });


}); 