import { circleMainSelector, inputSelector } from "../../utils/constants";

describe('Fibonacci test', function () {
    beforeEach(function () {
        cy.visit('fibonacci');
    });

    it('Check button logic', function () {
        cy.contains('Последовательность Фибоначчи');
        cy.get(inputSelector).type('8');
        cy.contains('Развернуть').should('not.be.disabled');
        cy.get(inputSelector).clear();
        cy.contains('Развернуть').should('be.disabled');
    });



    it('Check visual', function () {
        const result = [1,1,2,3,5,8,13,21,34];
        cy.get(inputSelector).type('8');
        cy.wait(2000);
        cy.get('button').contains('Развернуть').click();

        cy.wait(10000);
        cy.get(circleMainSelector).each(($el, index, $list)=>{
            cy.wrap($el).contains(result[index]);
        })

    });


}); 