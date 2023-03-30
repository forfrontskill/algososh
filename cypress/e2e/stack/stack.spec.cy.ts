const { wait } = require("@testing-library/user-event/dist/utils");
import { circleMainSelector, inputSelector } from "../../utils/constants";

describe('Stack test', function () {
    beforeEach(function () {
        cy.visit('stack');
    });

    it('Check add button logic', function () {
        cy.contains('Стек');
        cy.get(inputSelector).type('8');
        cy.contains('Добавить').should('not.be.disabled');
        cy.get(inputSelector).clear();
        cy.contains('Добавить').should('be.disabled');
    });



    it('Check add visual', function () {
        cy.get(inputSelector).type('8');
        cy.contains('Добавить').click();
        cy.get(circleMainSelector).invoke('attr','class').should('contain', 'changing');
        cy.get(circleMainSelector).invoke('attr','class').should('contain', 'default');
        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('10');
        cy.contains('Добавить').click();
        cy.contains(circleMainSelector,'10').invoke('attr','class').should('contain', 'changing');
        cy.contains(circleMainSelector,'10').invoke('attr','class').should('contain', 'default');
    });

    it('Check delete visual', function () {
        cy.get(inputSelector).type('8');
        cy.contains('Добавить').click();
        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('10');
        cy.contains('Добавить').click();
        cy.contains('Удалить').click();
        cy.contains(circleMainSelector,'10').should('not.exist');
        cy.contains(circleMainSelector,'8').invoke('attr','class').should('contain', 'changing');
        cy.contains(circleMainSelector,'8').invoke('attr','class').should('contain', 'default');
    });

    it('Check clear stack', function () {
        cy.get(inputSelector).type('8');
        cy.contains('Добавить').click();
        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('10');
        cy.contains('Добавить').click();
        cy.get(inputSelector).clear();
        cy.get(inputSelector).type('11');
        cy.contains('Добавить').click();
        cy.contains('Очистить').click();
        cy.contains(circleMainSelector).should('not.exist');
    });


}); 