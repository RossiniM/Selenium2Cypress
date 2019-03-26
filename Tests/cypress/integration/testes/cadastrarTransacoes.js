describe('Feature de inserir transações', () => {

    context('Criação de uma transação', () => {
        before(function () {
            cy.visit('/index.html')
        })
        it('Inserção de transacoes', () => {
            cy.get('form').within($form => {
                cy.focused().should('have.id', 'data')
                cy.get('#data').type('2019-02-01')
                cy.get('#quantidade').type(15).should('have.value', '15')
                cy.get('#valor').type(87).should('have.value', '87')
            })
            cy.get('.form > .btn').click()
            cy.get('.alert')
                .should('have.class', 'alert-info')
                .should('contain', 'Negociação adicionada com sucesso')
        })
        it('Verificação das transacoes', () => {

            cy.get('tbody > tr > :nth-child(1)')
                .contains(/\d{1,2}\/\d{1,2}\/\d{4}/)
                .should('contain', '1/2/2019')
            cy.get('tbody > tr > :nth-child(2)').should('contain', 15)
            cy.get('tbody > tr > :nth-child(3)').should('contain', 87)
        })
    })


    context('Criação de várias transações', () => {
        before(function () {
            cy.visit('/index.html')
        })
        beforeEach(function(){
            cy.fixture('/transacoes.json').as('transacoes')
        })
        it('Inserção de várias transações', () => {
            cy.get('@transacoes').each(transacao => {
                cy.get('form').within($form => {
                    cy.focused().should('have.id', 'data')
                    cy.get('#data').clear().type(transacao.data)
                    cy.get('#quantidade').clear()
                        .type(transacao.quantidade)
                        .should('have.value', transacao.quantidade.toString())
                    cy.get('#valor').clear()
                        .type(transacao.valor)
                        .should('have.value', transacao.valor.toString())
                })
                cy.get('.form > .btn').click()
                cy.get('.alert')
                    .should('have.class', 'alert-info')
                    .should('contain', 'Negociação adicionada com sucesso')
            })
        })
        it('Verificação de transacoes', () => {
            cy.get('@transacoes').then(transacoes => {
                cy.verificaTabela(transacoes,'#negociacoesView')
            })
        })
    })
})


























