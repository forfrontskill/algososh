describe('app works correctly with routes', function () {
    beforeEach(function () {
        cy.visit('/');
    });

    it('should open home page', function () {
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('should open string', function () {
        cy.get('a[href*="/recursion"]').click();
        cy.contains('Строка');
    });

    it('should open fibonacci', function () {
        cy.get('a[href*="/fibonacci"]').click();
        cy.contains('Последовательность Фибоначчи');
    });

    it('should open sorting', function () {
        cy.get('a[href*="/sorting"]').click();
        cy.contains('Сортировка массива');
    });

    it('should open stack', function () {
        cy.get('a[href*="/stack"]').click();
        cy.contains('Стек');
    });

    it('should open queue', function () {
        cy.get('a[href*="/queue"]').click();
        cy.contains('Очередь');
    });

    it('should open list', function () {
        cy.get('a[href*="/list"]').click();
        cy.contains('Связный список');
    });

}); 