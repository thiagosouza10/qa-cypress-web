/// <reference types="cypress" />
//#region Classes, elementos e bibliotecas
import Home from "../support/pages/home/index"
import Deliver from "../support/pages/deliver/index"
import Utilidades from "../support/utilidades"
const elHome = require('../support/pages/home/elements').ELEMENTS
const elDeliver = require('../support/pages/deliver/elements').ELEMENTS
//#endregion


describe('Cadastro de entregador para Buger Eats', () => {

    it('Deve cadastrar entregador para o método de entrega Moto', () => {

        const _dadosUsuario = Utilidades.gerarDadosFakerUsuario()
        const _dadosEndereco = Utilidades.gerarDadosFakerEndereco()

        Home.acessarHomeBugerEats(`${Cypress.env('urlBase')}`)
        Deliver.acessarTelaCadastro()
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
        Deliver.selecionarMetodoEntrega()
        Deliver.efetuarUploadCnh({
            caminhoArquivo: 'cypress/support/imagens/cnh.jpg',
            nomeArquivo: 'cnh.jpg'
        })
        Deliver.validarCadastroSucesso()
    });
});