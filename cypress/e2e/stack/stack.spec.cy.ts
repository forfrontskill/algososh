const { wait } = require("@testing-library/user-event/dist/utils");

describe('Stack test', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000/stack');
    });

    it('Check add button logic', function () {
        cy.contains('Стек');
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Добавить').should('not.be.disabled');
        cy.get('[data-testid="input"]').clear();
        cy.contains('Добавить').should('be.disabled');
    });



    it('Check add visual', function () {
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Добавить').click();
        cy.get('[data-testid="circle-main"]').invoke('attr','class').should('contain', 'changing');
        cy.get('[data-testid="circle-main"]').invoke('attr','class').should('contain', 'default');
        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('10');
        cy.contains('Добавить').click();
        cy.contains('[data-testid="circle-main"]','10').invoke('attr','class').should('contain', 'changing');
        cy.contains('[data-testid="circle-main"]','10').invoke('attr','class').should('contain', 'default');
    });

    it('Check delete visual', function () {
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Добавить').click();
        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('10');
        cy.contains('Добавить').click();
        cy.contains('Удалить').click();
        cy.contains('[data-testid="circle-main"]','10').should('not.exist');
        cy.contains('[data-testid="circle-main"]','8').invoke('attr','class').should('contain', 'changing');
        cy.contains('[data-testid="circle-main"]','8').invoke('attr','class').should('contain', 'default');
    });

    it('Check clear stack', function () {
        cy.get('[data-testid="input"]').type('8');
        cy.contains('Добавить').click();
        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('10');
        cy.contains('Добавить').click();
        cy.get('[data-testid="input"]').clear();
        cy.get('[data-testid="input"]').type('11');
        cy.contains('Добавить').click();
        cy.contains('Очистить').click();
        cy.contains('[data-testid="circle-main"]').should('not.exist');
    });


}); 