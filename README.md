# QA Cypress Web

Projeto de testes automatizados com Cypress para o aplicativo Buger Eats.

## Estrutura do Projeto

```
qa-cypress-web/
├── cypress/
│   ├── e2e/              # Testes end-to-end
│   ├── fixtures/         # Dados de teste
│   └── support/         # Comandos e Page Objects
│       ├── pages/       # Page Objects
│       └── utilidades.js
├── cypress.config.js    # Configuração do Cypress
└── package.json         # Dependências do projeto
```

## Pré-requisitos

- Node.js (v18 ou superior)
- NPM ou Yarn

## Instalação

```bash
npm install
```

## Executar Testes

### Modo interativo (abrir Cypress)

```bash
npm run open
```

### Executar todos os testes (headless)

```bash
npm run testes
```

### Executar suite específica de cadastro

```bash
npm run suite
```

## Tecnologias

- **Cypress** v15.14.1 - Framework de automação de testes
- **Faker-br** - Geração de dados falsos para testes
- **cypress-mochawesome-reporter** - Geração de relatórios

## Relatórios

Os relatórios HTML são gerados automaticamente após cada execução em:

```
logs/index.html
```