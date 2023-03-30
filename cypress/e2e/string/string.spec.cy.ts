import { circleMainSelector, inputSelector } from "../../utils/constants";

describe('String reverse test', function () {
    beforeEach(function () {
        cy.visit('recursion');
    });

    it('Check button logic', function () {
        cy.contains('Строка');
        cy.get(inputSelector).type('hello');
        cy.contains('Развернуть').should('not.be.disabled');
        cy.get(inputSelector).clear();
        cy.contains('Развернуть').should('be.disabled');
    });

    it('Check visual', function () {
        const word1 = 'hello';
        const styles1 = ['default','default','default','default','default']
        cy.get(inputSelector).type(word1);
        cy.get('button').contains('Развернуть').click();
        cy.get(circleMainSelector).each(($el, index, $list)=>{
            cy.wrap($el).contains(word1[index]);
            cy.wrap($el).invoke('attr','class').should('contain', styles1[index]);
        })

        const word2 = 'oellh';
        const styles2 = ['changing','default','default','default','changing'];

        cy.get(circleMainSelector).each(($el, index, $list)=>{
            cy.wrap($el).contains(word2[index]);
            cy.wrap($el).invoke('attr','class').should('contain', styles2[index]);
        });

        const word3 = 'oellh';
        const styles3 = ['changing','default','default','default','changing'];

        cy.get(circleMainSelector).each(($el, index, $list)=>{
            cy.wrap($el).contains(word3[index]);
            cy.wrap($el).invoke('attr','class').should('contain', styles3[index]);
        })
    });


}); 