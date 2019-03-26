describe('Features de importar e apagar Negociações', () => {

    context('Importando as transações sem mock', () => {
        it('Importar Transacoes', () => {

            cy.visit('/index.html')
            cy.contains('Importar').click()
            cy.get('.alert')
                .should('have.class', 'alert-info')
                .and('contain', 'Negociações do período importadas')

        })
    })
    context('Importando as transações com mock', () => {

        const transacao1 ={"data": "2019-04-01", "quantidade": 13, "valor": 1500}
        const transacao2 ={"data": "2019-04-03", "quantidade": 16, "valor": 2000}

        it('Importar Transacoes', () => {
            cy.visit('/index.html')
            cy.fixture('/transacoes.json').as('transacoes')
            cy.server()

            cy.get('@transacoes').then(transacoes => {
                cy.route('GET', '/negociacoes/anterior',[transacao1])
                cy.route('GET', '/negociacoes/semana', transacoes)
                cy.route('GET', '/negociacoes/retrasada', [transacao2])
                cy.contains('Importar').click()
                cy.get('.alert')
                    .should('have.class', 'alert-info')
                    .and('contain', 'Negociações do período importadas')
            })
        })
        it('Verifica transacoes',()=> {
            cy.fixture('/transacoes.json').as('transacoes')
            cy.get('@transacoes').then(transacoes => {
                transacoes.push(transacao1, transacao2)
                cy.verificaTabela(transacoes, '#negociacoesView')
            })
        })
    })

    context('Apagar ', () => {
        it('Apagando as transições', () => {
            cy.contains('Apagar').click()
            cy.get('#negociacoesView').find('tr').its('length').then(rowNumbers => {
                assert.equal(rowNumbers, 2, "A tabela está vazia")
            })
        })
    })
})
