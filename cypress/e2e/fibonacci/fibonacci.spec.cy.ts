
describe('Fibonacci test', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/fibonacci');
    });

    it('Check button logic', function () {
        cy.contains('Последовательность Фибоначчи');
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Развернуть').should('not.be.disabled');
        cy.get('[data-testid="input"]').clear();
        cy.contains('Развернуть').should('be.disabled');
    });



    it('Check visual', function () {
        const result = [1,1,2,3,5,8,13,21,34];
        cy.get('[data-testid="input"]').type('8');
        cy.wait(2000);
        cy.get('button').contains('Развернуть').click();

        cy.wait(10000);
        cy.get('[data-testid="circle-main"]').each(($el, index, $list)=>{
            cy.wrap($el).contains(result[index]);
        })

    });


}); 