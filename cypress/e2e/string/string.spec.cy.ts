
describe('String reverse test', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/recursion');
    });

    it('Check button logic', function () {
        cy.contains('Строка');
        cy.get('[data-testid="input"]').type('hello');
        cy.contains('Развернуть').should('not.be.disabled');
        cy.get('[data-testid="input"]').clear();
        cy.contains('Развернуть').should('be.disabled');
    });

    it('Check visual', function () {
        const word1 = 'hello';
        const styles1 = ['default','default','default','default','default']
        cy.get('[data-testid="input"]').type(word1);
        cy.get('button').contains('Развернуть').click();
        cy.get('[data-testid="circle-main"]').each(($el, index, $list)=>{
            cy.wrap($el).contains(word1[index]);
            cy.wrap($el).invoke('attr','class').should('contain', styles1[index]);
        })

        const word2 = 'oellh';
        const styles2 = ['changing','default','default','default','changing'];

        cy.get('[data-testid="circle-main"]').each(($el, index, $list)=>{
            cy.wrap($el).contains(word2[index]);
            cy.wrap($el).invoke('attr','class').should('contain', styles2[index]);
        });

        const word3 = 'oellh';
        const styles3 = ['changing','default','default','default','changing'];

        cy.get('[data-testid="circle-main"]').each(($el, index, $list)=>{
            cy.wrap($el).contains(word3[index]);
            cy.wrap($el).invoke('attr','class').should('contain', styles3[index]);
        })
    });


}); 