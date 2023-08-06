/// <reference types="cypress" />

const faker = require('faker-br')

class Utilidades {

    gerarDadosFakerUsuario() {
        const _fakerCpf = faker.br.cpf()
        const _fakerNomeCompleto = `${faker.name.firstName()} ${faker.name.lastName()}`
        const _fakerEmail = faker.internet.email()
        // Telefone está sendo gerado dessa forma para poder mostrar array no projeto
        const _dddsValidos = ['11', '21', '31', '41', '48', '61']
        const _dddEstado = faker.random.arrayElement(_dddsValidos);
        const _numeroTelefone = faker.random.number({ min: 10000000, max: 99999999 });
        const _fakerTelefone = `(${_dddEstado})9${_numeroTelefone}`;
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