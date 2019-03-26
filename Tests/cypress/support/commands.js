Cypress.Commands.add('verificaTabela', (referencia,tabelaNome) => {
    cy.get(tabelaNome).find('tr').its('length').then(
        size =>{
            for (let i = 1; i < size-1; i++){
                cy.get('tbody > :nth-child('+(i)+') > :nth-child(2)')
                    .should('contain', referencia[i-1].quantidade)
                cy.get('tbody > :nth-child('+(i)+') > :nth-child(3)')
                    .should('contain', referencia[i-1].valor)
            }
        })
})



