/// <reference types="cypress" />
//#region Classes, elementos e bibliotecas
const faker = require('faker-br')
import Home from "../support/pages/home/index"
import Deliver from "../support/pages/deliver/index"
const elHome = require('../support/pages/home/elements').ELEMENTS
const elDeliver = require('../support/pages/deliver/elements').ELEMENTS
//#endregion


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
        
        Home.acessarHomeBugerEats(`${Cypress.env('urlBase')}`)
        Deliver.acessarTelaCadastro()
        Deliver.preencherDadosUsuario({
            nomeCompleto: _fakerNomeCompleto,
            cpf: _fakerCpf,
            email: _fakerEmail,
            telefone: _fakerTelefone
        })
        Deliver.preencherEnderecoUsuario({
            cep: _fakerCep,
            numero: _fakerNumero,
            complemento: _fakerComplemento
        })
        Deliver.selecionarMetodoEntrega()
        Deliver.efetuarUploadCnh({
            caminhoArquivo: 'cypress/support/imagens/cnh.jpg',
            nomeArquivo: 'cnh.jpg'
        })
        Deliver.validarCadastroSucesso()
    });
});