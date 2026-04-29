/// <reference types="cypress" />

const el = require('./elements').el

class Home {

    acessarHomeBugerEats(url) {
        cy.visit(url)
        cy.get(el.txtTituloHome).should('be.visible').and('have.text', 'Seja um parceiro entregador pela Buger Eats')
    }
}

export default new Home()