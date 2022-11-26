describe('Issue create', () => {

    describe('Issue details editing', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
                cy.visit(url + '/board');
                cy.contains('This is an issue of type: Task.').click();
            });

            it('Should create an issue and validate it successfully', () => {
                cy.get('[data-testid="modal:issue-create"]').within(() => {
                    cy.get('[data-testid="select:type"]').click('bottomRight');
                    cy.get('[data-testid="select-option:Story"]')
                        .trigger('mouseover')
                        .trigger('click');

                    cy.get('input[name="title"]').type('TEST_TITLE');
                    cy.get('.ql-editor').type('TEST_DESCRIPTION');
                    cy.get('[data-testid="select:userIds"]').click('bottomRight');
                    cy.get('[data-testid="select-option:Lord Gaben"]').click();

                    cy.get('button[type="submit"]').click();
                });

                cy.get('[data-testid="modal:issue-create"]').should('not.exist');
                cy.contains('Issue has been successfully created.').should('not.exist');

                cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
                    cy.get('[data-testid="list-issue"]')
                        .should('have.length', '5')
                        .first()
                        .find('p')
                        .should('have.class', 'sc-kfGgVZ')
                        .contains('TEST_TITLE');
                    cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
                    cy.get('[data-testid="icon:story"]').should('be.visible');
                });
            });

            it('Should validate title is required field if missing', () => {
                cy.get('[data-testid="modal:issue-create"]').within(() => {
                    cy.get('[data-testid="select:reporterId"]').children().then(() => {
                        cy.get('button[type="submit"]').click();
                    })
                    cy.get('[data-testid="form-field:title"]').scrollIntoView().should('contain', 'This field is required');
                });
            });
        });
    });
});