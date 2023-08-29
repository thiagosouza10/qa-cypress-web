/// <reference types="cypress" />

import Home from "../support/pages/home/index"
import Deliver from "../support/pages/deliver/index"
import Utilidades from "../support/utilidades"
const elDeliver = require('../support/pages/deliver/elements').ELEMENTS


describe('Cadastro de entregador para Buger Eats', () => {

    beforeEach(() => {
        Home.acessarHomeBugerEats(`${Cypress.env('urlBase')}`)
        Deliver.acessarTelaCadastro()
    });

    it('Deve cadastrar entregador para o método de entrega Moto', () => {

        const _dadosUsuario = Utilidades.gerarDadosFakerUsuario()
        const _dadosEndereco = Utilidades.gerarDadosFakerEndereco()
        
        Deliver.preencherDadosUsuario({
            nomeCompleto: _dadosUsuario.nomeCompleto,
            cpf: _dadosUsuario.cpf,
            email: _dadosUsuario.email,
            telefone: _dadosUsuario.telefone
        })
        Deliver.preencherEnderecoUsuario({
            cep: _dadosEndereco.cep,
            numero: _dadosEndereco.numero,
            complemento: _dadosEndereco.complemento
        })
        Deliver.selecionarMetodoEntrega('Moto')
        Deliver.efetuarUploadCnh({
            caminhoArquivo: 'cypress/support/imagens/cnh.jpg',
            nomeArquivo: 'cnh.jpg'
        })
        Deliver.validarCadastroSucesso()
    });

    it('Deve cadastrar entregador para o método de entrega Van/Carro', () => {

        const _dadosUsuario = Utilidades.gerarDadosFakerUsuario()
        const _dadosEndereco = Utilidades.gerarDadosFakerEndereco()
        
        Deliver.preencherDadosUsuario({
            nomeCompleto: _dadosUsuario.nomeCompleto,
            cpf: _dadosUsuario.cpf,
            email: _dadosUsuario.email,
            telefone: _dadosUsuario.telefone
        })
        Deliver.preencherEnderecoUsuario({
            cep: _dadosEndereco.cep,
            numero: _dadosEndereco.numero,
            complemento: _dadosEndereco.complemento
        })
        Deliver.selecionarMetodoEntrega('Van/Carro')
        Deliver.efetuarUploadCnh({
            caminhoArquivo: 'cypress/support/imagens/cnh.jpg',
            nomeArquivo: 'cnh.jpg'
        })
        Deliver.validarCadastroSucesso()
    });

    it('Não deve efetuar cadastro selecionando 2 métodos de entrega Van/Carro e Moto', () => {

        const _dadosUsuario = Utilidades.gerarDadosFakerUsuario()
        const _dadosEndereco = Utilidades.gerarDadosFakerEndereco()
        
        Deliver.preencherDadosUsuario({
            nomeCompleto: _dadosUsuario.nomeCompleto,
            cpf: _dadosUsuario.cpf,
            email: _dadosUsuario.email,
            telefone: _dadosUsuario.telefone
        })
        Deliver.preencherEnderecoUsuario({
            cep: _dadosEndereco.cep,
            numero: _dadosEndereco.numero,
            complemento: _dadosEndereco.complemento
        })
        Deliver.selecionarMetodoEntrega('Van/Carro')
        Deliver.selecionarMetodoEntrega('Moto')
        Deliver.efetuarUploadCnh({
            caminhoArquivo: 'cypress/support/imagens/cnh.jpg',
            nomeArquivo: 'cnh.jpg'
        })
        cy.get(elDeliver.txtMensagemErroMetodoEntrega).should('be.visible').and('have.text', 'Oops! Selecione apenas um método de entrega')
    });
});