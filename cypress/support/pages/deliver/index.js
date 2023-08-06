/// <reference types="cypress" />

const el = require('./elements').ELEMENTS
const elHome = require('../home/elements').ELEMENTS

class Deliver {

    acessarTelaCadastro() {
        cy.get(elHome.txtBotaoCadastro).should('be.visible').and('have.text', 'Cadastre-se para fazer entregas').click()
        cy.get(el.txtTituloDeliver).should('be.visible').and('contain.text', 'Cadastre-se para')
    }

    preencherDadosUsuario({ nomeCompleto, cpf, email, telefone }) {
        cy.get(el.inputNomeCompleto).should('be.visible').type(nomeCompleto)
        cy.get(el.inputCpf).should('be.visible').type(cpf)
        cy.get(el.inputEmail).should('be.visible').type(email)
        cy.get(el.inputTelefone).should('be.visible').type(telefone)
    }

    preencherEnderecoUsuario({ cep, numero, complemento }) {
        cy.get(el.inputCep).should('be.visible').type(cep)
        cy.get(el.btnBuscarCep).click()
        cy.get(el.inputNumero).should('be.visible').type(numero)
        cy.get(el.inputComplemento).should('be.visible').type(complemento)
    }

    selecionarMetodoEntrega(metodoEntrega) {
        switch (metodoEntrega) {
            case 'Moto':
                cy.get(el.btnMoto).eq(0).should('be.visible').and('have.text', metodoEntrega).and('be.visible').click()
                cy.get(el.classSelecionada).should('be.visible')
                break
            case 'Bicicleta':
                cy.get(el.btnMoto).eq(1).should('be.visible').and('have.text', metodoEntrega).and('be.visible').click()
                cy.get(el.classSelecionada).should('be.visible')
                break
            case 'Van/Carro':
                cy.get(el.btnMoto).eq(2).should('be.visible').and('have.text', metodoEntrega).and('be.visible').click()
                cy.get(el.classSelecionada).should('be.visible')
                break
        }
    }

    efetuarUploadCnh({ caminhoArquivo, nomeArquivo }) {
        cy.get(el.txtCnh).should('have.text', 'Foto da sua CNH')
        cy.get(el.inputFile)
            .invoke('show')
            .selectFile(caminhoArquivo)
            .then(($input) => {
                console.log($input)
                const files = $input[0].files
                expect(files[0].name).to.eq(nomeArquivo)
            })
        cy.get('.button-success')
            .should('be.visible')
            .and('have.text', 'Cadastre-se para fazer entregas')
            .click()
    }

    validarCadastroSucesso() {
        cy.get(el.txtTituloPopup).should('be.visible').and('have.text', 'Aí Sim...')
        cy.get(el.btnFecharPopup).should('be.visible').click()
        cy.get(elHome.txtTituloHome).should('be.visible').and('have.text', 'Seja um parceiro entregador pela Buger Eats')
    }
}

export default new Deliver()