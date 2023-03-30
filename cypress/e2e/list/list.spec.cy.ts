describe('Queue test', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/list');
    });

    it('Check add button logic', function () {
        cy.get('[data-testid="input-value"]').clear();
        cy.contains('Добавить в head').should('be.disabled');
        cy.contains('Добавить в tail').should('be.disabled');
        cy.get('[data-testid="input-value"]').type('8');
        cy.contains('Добавить в tail').should('not.be.disabled');
        cy.contains('Добавить в tail').should('not.be.disabled');
        cy.get('[data-testid="input-index"]').type('2');
        cy.contains('Добавить по индексу').should('not.be.disabled');
        cy.contains('Удалить по индексу').should('not.be.disabled');
        cy.get('[data-testid="input-value"]').clear();
        cy.contains('Добавить по индексу').should('be.disabled');
        cy.get('[data-testid="input-index"]').clear();
        cy.contains('Удалить по индексу').should('be.disabled');
    });

    it('Check default list', function(){
        cy.get('[data-testid="circle-main"]').should('have.length', 4);
    });

    it('Check add to head', function(){
        cy.get('[data-testid="input-value"]').type('11');
        cy.contains('Добавить в head').click();
        cy.contains('[data-testid="circle"]','11').should('contain', 'head');
    });

    it('Check add to tail', function(){
        cy.get('[data-testid="input-value"]').type('11');
        cy.contains('Добавить в tail').click();
        cy.contains('[data-testid="circle"]','11').should('contain', 'tail');
    });

    it('Check add by index', function(){
        cy.get('[data-testid="input-value"]').type('77');
        cy.get('[data-testid="input-index"]').type('2');
        cy.contains('Добавить по индексу').click();
        cy.wait(5000);
        cy.contains('[data-testid="circle"]','77').should('contain', '2');
    });

    it('Check delete from head', function(){
        cy.get('[data-testid="input-value"]').type('11');
        cy.contains('Добавить в head').click();
        cy.contains('Удалить из head').click();
        cy.contains('[data-testid="circle"]','11').should('not.exist');
    });

    it('Check delete from tail', function(){
        cy.get('[data-testid="input-value"]').type('11');
        cy.contains('Добавить в tail').click();
        cy.contains('Удалить из tail').click();
        cy.contains('[data-testid="circle"]','11').should('not.exist');
    });

    it('Check delete by index', function(){
        cy.get('[data-testid="input-index"]').type('2');
        cy.contains('Удалить по индексу').click();
        cy.wait(5000);
        cy.contains('[data-testid="circle"]','8').should('not.exist');
    });


}); 