/// <reference types="cypress" />

const faker = require('faker-br')

class Utilidades {

    gerarDadosFakerUsuario() {
        const _fakerCpf = faker.br.cpf()
        const _fakerNomeCompleto = `${faker.name.firstName()} ${faker.name.lastName()}`
        const _fakerEmail = faker.internet.email()
        const _fakerTelefone = faker.phone.phoneNumber()
        return {
            cpf: _fakerCpf,
            nomeCompleto: _fakerNomeCompleto,
            email: _fakerEmail,
            telefone: _fakerTelefone
        }
    }

    gerarDadosFakerEndereco() {
        let _fakerCep = faker.address.zipCodeValidByState()
        //A função match() retorna um array contendo todas as correspondências encontradas
        // e o método join('') combina todos os dígitos encontrados em uma única string, eliminando quaisquer espaços ou outros caracteres não numéricos.
        let _fakerNumero = faker.address.streetAddress().match(/\d+/g).join('')
        let _fakerComplemento = `Apto: ${faker.random.number({ min: 1, max: 300 })} Bloco: ${faker.random.number({ min: 1, max: 2 })}`
        return {
            cep: _fakerCep,
            numero: _fakerNumero,
            complemento: _fakerComplemento
        }
    }
}

export default new Utilidades()