import { circleMainSelector, circleSelector, inputSelector } from "../../utils/constants";

describe('Queue test', function () {
    beforeEach(function () {
        cy.visit('queue');
    });

    it('Check add button logic', function () {
        cy.contains('Очередь');
        cy.get(inputSelector).type('8');
        cy.contains('Добавить').should('not.be.disabled');
        cy.get(inputSelector).clear();
        cy.contains('Добавить').should('be.disabled');
    });



    it('Check add visual', function () {
        cy.get(inputSelector).type('8');
        cy.contains('Добавить').click();
        cy.contains(circleSelector,'0').as('Zero');
        cy.get('@Zero').children(circleMainSelector).invoke('attr','class').should('contain', 'changing');
        cy.get('@Zero').children(circleMainSelector).invoke('attr','class').should('contain', 'default');

        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('10');
        cy.contains('Добавить').click();
        cy.contains(circleSelector,'1').children(circleMainSelector).invoke('attr','class').should('contain', 'changing');
        cy.contains(circleSelector,'1').children(circleMainSelector).invoke('attr','class').should('contain', 'default');
        cy.get('@Zero').should('contain', 'head');
        cy.contains(circleSelector,'1').should('contain', 'tail');

        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('11');
        cy.contains('Добавить').click();
        cy.contains(circleSelector,'2').children(circleMainSelector).invoke('attr','class').should('contain', 'changing');
        cy.contains(circleSelector,'2').children(circleMainSelector).invoke('attr','class').should('contain', 'default');
        cy.get('@Zero').should('contain', 'head');
        cy.contains(circleSelector,'2').should('contain', 'tail');

        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('8');
        cy.contains('Удалить').click();
        cy.get('@Zero').should('not.contain', 'head');
        cy.contains(circleSelector,1).should('contain', 'head');

    });

    it('Check delete visual', function () {
        cy.get(inputSelector).type('8');
        cy.contains('Добавить').click();
        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('10');
        cy.contains('Добавить').click();

        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('8');
        cy.contains('Удалить').click();
        cy.contains(circleSelector,'1').children(circleMainSelector).invoke('attr','class').should('contain', 'changing');
        cy.contains(circleSelector,'1').children(circleMainSelector).invoke('attr','class').should('contain', 'default');
        cy.contains(circleSelector,'0').should('not.contain', 'head');
        cy.contains(circleSelector,'1').should('contain', 'head');
    });

    it('Check clear Queue', function () {
        cy.get(inputSelector).type('8');
        cy.contains('Добавить').click();
        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('10');
        cy.contains('Добавить').click();
        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('11');
        cy.contains('Добавить').click();
        cy.contains('Очистить').click();
        cy.get('[data-testid="circle-text"]').should('have.text', '');
    });


}); 