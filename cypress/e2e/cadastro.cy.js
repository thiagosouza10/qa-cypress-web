/// <reference types="cypress" />

const faker = require('faker-br')


describe('Cadastro de entregador para Buger Eats', () => {

    it('Deve cadastrar entregador para o método de entrega Moto', () => {

        //Faker para cadastrar dados do usuário
        let _fakerCpf = faker.br.cpf()
        let _fakerNomeCompleto = `${faker.name.firstName()} ${faker.name.lastName()}`
        let _fakerEmail = faker.internet.email()
        let _fakerTelefone = faker.phone.phoneNumber()

        //Faker para cadastrar endereço
        let _fakerCep = faker.address.zipCodeValidByState()
        //A função match() retorna um array contendo todas as correspondências encontradas e o método join('') combina todos os dígitos encontrados em uma única string, eliminando quaisquer espaços ou outros caracteres não numéricos.
        let _fakerNumero = faker.address.streetAddress().match(/\d+/g).join('') 
        let _fakerComplemento = `Apto: ${faker.random.number({min: 1, max: 300})} Bloco: ${faker.random.number({min: 1, max: 2})}`;
        
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
        cy.get('input[placeholder="Nome completo"]').should('be.visible').type(_fakerNomeCompleto)
        cy.get('input[placeholder="CPF somente números"]').should('be.visible').type(_fakerCpf)
        cy.get('input[placeholder="E-mail"]').should('be.visible').type(_fakerEmail)
        cy.get('input[placeholder="Whatsapp"').should('be.visible').type(_fakerTelefone)

        //Preenche endereço do usuário
        cy.get('input[placeholder="CEP"]').should('be.visible').type(_fakerCep)
        cy.get('input[value="Buscar CEP"]').click()
        cy.get('input[placeholder="Número"]').should('be.visible').type(_fakerNumero)
        cy.get('input[placeholder="Complemento"]').should('be.visible').type(_fakerComplemento)

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