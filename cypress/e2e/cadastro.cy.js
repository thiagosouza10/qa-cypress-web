/// <reference types="cypress" />


describe('Cadastro de entregador para Buger Eats', () => {

    it('Deve cadastrar entregador para o método de entrega Moto', () => {

        //Acessa aplicação Buger-eats
        cy.visit('https://buger-eats.vercel.app/')
        cy.get('main > h1').should('be.visible').and('have.text', 'Seja um parceiro entregador pela Buger Eats')

        //Acessa a tela de cadastro
        cy.get('a > strong')
            .should('be.visible')
            .and('have.text', 'Cadastre-se para fazer entregas')
            .and('be.visible').click()
        cy.get('form > h1').should('be.visible').and('contain.text', 'Cadastre-se para')

        //Preenche os dados do usuário
        cy.get('input[placeholder="Nome completo"]').should('be.visible').type('Thiago de Souza')
        cy.get('input[placeholder="CPF somente números"]').should('be.visible').type('31054155544')
        cy.get('input[placeholder="E-mail"]').should('be.visible').type('thiago.souza@entregas.com.br')
        cy.get('input[placeholder="Whatsapp"').should('be.visible').type('11971712020')

        //Preenche endereço do usuário
        cy.get('input[placeholder="CEP"]').should('be.visible').type('09110160')
        cy.get('input[value="Buscar CEP"]').click()
        cy.get('input[placeholder="Número"]').should('be.visible').type('1000')
        cy.get('input[placeholder="Complemento"]').should('be.visible').type('Apartamento 10')

        //Selecionar o método de entrega
        cy.get('li > span').eq(0).should('be.visible').and('have.text', 'Moto').and('be.visible').click()
        cy.get('li[class="selected"]').should('be.visible')

        //Upload imagem da CNH
        cy.get('.dropzone > p').should('have.text', 'Foto da sua CNH')
        cy.get('input[type="file"]')
            .invoke('show')
            .selectFile('cypress/support/imagens/cnh.jpg')
            .then(($input) => {
                console.log($input)
                const files = $input[0].files
                expect(files[0].name).to.eq('cnh.jpg')
            })
        cy.get('.button-success')
            .should('be.visible')
            .and('have.text', 'Cadastre-se para fazer entregas')
            .click()

        //Asserção do teste
        cy.get('#swal2-title').should('be.visible').and('have.text', 'Aí Sim...')
        cy.get('button[class="swal2-confirm swal2-styled"]').should('be.visible').click()
        cy.get('main > h1').should('be.visible').and('have.text', 'Seja um parceiro entregador pela Buger Eats')
    });
});