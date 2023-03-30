describe('Queue test', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/queue');
    });

    it('Check add button logic', function () {
        cy.contains('Очередь');
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Добавить').should('not.be.disabled');
        cy.get('[data-testid="input"]').clear();
        cy.contains('Добавить').should('be.disabled');
    });



    it('Check add visual', function () {
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Добавить').click();
        cy.contains('[data-testid="circle"]','0').as('Zero');
        cy.get('@Zero').children('[data-testid="circle-main"]').invoke('attr','class').should('contain', 'changing');
        cy.get('@Zero').children('[data-testid="circle-main"]').invoke('attr','class').should('contain', 'default');

        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('10');
        cy.contains('Добавить').click();
        cy.contains('[data-testid="circle"]','1').children('[data-testid="circle-main"]').invoke('attr','class').should('contain', 'changing');
        cy.contains('[data-testid="circle"]','1').children('[data-testid="circle-main"]').invoke('attr','class').should('contain', 'default');
        cy.get('@Zero').should('contain', 'head');
        cy.contains('[data-testid="circle"]','1').should('contain', 'tail');

        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('11');
        cy.contains('Добавить').click();
        cy.contains('[data-testid="circle"]','2').children('[data-testid="circle-main"]').invoke('attr','class').should('contain', 'changing');
        cy.contains('[data-testid="circle"]','2').children('[data-testid="circle-main"]').invoke('attr','class').should('contain', 'default');
        cy.get('@Zero').should('contain', 'head');
        cy.contains('[data-testid="circle"]','2').should('contain', 'tail');

        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Удалить').click();
        cy.get('@Zero').should('not.contain', 'head');
        cy.contains('[data-testid="circle"]',1).should('contain', 'head');

    });

    it('Check delete visual', function () {
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Добавить').click();
        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('10');
        cy.contains('Добавить').click();

        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Удалить').click();
        cy.contains('[data-testid="circle"]','1').children('[data-testid="circle-main"]').invoke('attr','class').should('contain', 'changing');
        cy.contains('[data-testid="circle"]','1').children('[data-testid="circle-main"]').invoke('attr','class').should('contain', 'default');
        cy.contains('[data-testid="circle"]','0').should('not.contain', 'head');
        cy.contains('[data-testid="circle"]','1').should('contain', 'head');
    });

    it('Check clear Queue', function () {
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Добавить').click();
        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('10');
        cy.contains('Добавить').click();
        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('11');
        cy.contains('Добавить').click();
        cy.contains('Очистить').click();
        cy.get('[data-testid="circle-text"]').should('have.text', '');
    });


}); 