﻿# Re Significa
###### Esse documento auxiliará no desenvolvimento da Aplicação

### Dados do projeto
**Empresa:** SSTEC \
**Nome do app:** Re Significa\
**Site:** \
**Site Temp:** \
**Endpoint:** https://re-significa.herokuapp.com/ \
**Tecnologias de desenvolvimento:** [Angular 11](https://angular.io/docs) | [Node js](https://nodejs.org/en/docs/) | (Input - [Typescript](https://www.typescriptlang.org/docs/home.html)) -> (Output -- [Javascript](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript))

### Requisitos
- [VS Code](https://code.visualstudio.com/ "Visual Studio Code") - Recomendado
- [Node LTS](https://nodejs.org/en/ "Node Js") - Obrigatório
- [Cmder](https://cmder.net/ "Cmder") - Recomendado
- [Postman](https://www.getpostman.com/downloads/ "Postman") - Recomendado

### Dependencias
- [Nodemon](https://www.npmjs.com/package/nodemon "Nodemon")
- [Express](https://expressjs.com/ "Express")
- [Express Validator](https://express-validator.github.io/docs/ "Express Validator")
- [BCrypt](https://www.npmjs.com/package/bcrypt/ "BCrypt")
- [Body Parser](https://www.npmjs.com/package/body-parser/ "Body Parser")
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser/ "Cookie Parser")
- [Cors](https://adonisjs.com/docs/4.1/cors/ "Cors")
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken/ "Jsonwebtoken")
- [Sequelize](https://sequelize.org/v5/ "Sequelize")
- [Inversify](http://inversify.io/ "Inversify")
- [AutoMapper](https://automapper.netlify.app/docs/guides/getting-started/ "@nartc/automapper")
- [Cli-Color](https://github.com/medikoo/cli-color "cli-color")

### Instalação Requisitos
- Via Executavel.

### Instalação Dependencias
- Via NPM ou YARN.

### Estrutura dos arquivos do Backend
**/** - Arquivos de códigos da aplicação.\
**presentation/app.ts** - Arquivo inicial.\
**presentation/config.json** - Arquivo com configurações do projeto como configurações de banco de dados.\
**presentation/controllers/** - Controllers da aplicação.\
**application/autoMappers/** - Automappers da aplicação.\
**application/commons/** - Arquivos comuns a toda aplicação.\
**application/interfaces/** -Interfaces dos services da aplicação.\
**application/models/** - Models da aplicação.\
**application/services/** - Services da aplicação.\
**domain/entities/** -Entities da aplicação.\
**domain/interfaces/** - Interfaces dos repositories da aplicação.\
**infrastructure/crosscutting/ioc/** - Configurações da inversão de controle da aplicação.\
**infrastructure/crosscutting/ioc/inversify.config.ts** - Arquivo responsável pela injeção de dependencias.\
**infrastructure/data/** - Configurações do banco, persistência de dados e etc.\
**infrastructure/data/context/** - Configurações do banco de dados da aplicação.\
**infrastructure/data/extensions/** - Extensões da aplicação.\
**infrastructure/data/repositories/** - Repositories da aplicação.\
**gitignore** - Configura arquivos a serem ignorados pelo git.\
**package.json** - Arquivo de dependências e detalhes da aplicacação.\
**tsconfig.json** - Arquivo com configurações do transpile da aplicação.\
**README.md** - Leia-me com instruções.

### Nomeação dos arquivos e componentes
  - Os arquivos que contém código ts devem ser nomeados com a extensão .ts.

### GitFlow
O [GitFlow](https://medium.com/trainingcenter/utilizando-o-fluxo-git-flow-e63d5e0d5e04) Workflow é um design de fluxo de trabalho Git que define um modelo de ramificação projetado em torno da versão do projeto. Isso fornece uma estrutura robusta para gerenciar projetos maiores.\
[Saiba mais](https://datasift.github.io/gitflow/IntroducingGitFlow.html) sobre o GitFlow.\
[Explicação da ferramenta git-flow](https://fjorgemota.com/git-flow-uma-forma-legal-de-organizar-repositorios-git/) se for usar ela.

![](https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fraw.githubusercontent.com%2FVoronenko%2Fgitflow-release%2Fmaster%2Fimages%2Fgit-workflow-release-cycle-4maintenance.png&f=1)

### Versionamento Semântico
O Versionamento Semântico são regras que formalizam de forma prática e eficiente o incremento de versões de software. O versionamento do re-significa deve basedado na versão 2 do Versionament Semântico utilizando as regras 2, 3, 4, 6, 7, 8, 9 e 11 encontradas no [site do samver.org](https://semver.org/lang/pt-BR/).

### Commits Semânticos
Para uma melhor navegação pelos commits, possibilitando um entendimento melhor e mais rápido, e consequentemente melhorando a manutenção do sistema, utilizamos um [padrão](https://gist.github.com/eltonea/a717e3c786686b674f4ebe2475ca3313) na escrita do commit similar ao proposto por http://karma-runner.github.io/3.0/dev/git-commit-msg.html.
As linhas das mensagens de commit não devem exceder 72 caracteres. Essa convenção permite uma boa leitura dos commits na maiorias dos terminais.

**Formato da mensagem de commit:**\
\<tipo\>\(<escopo>\): \<assunto\>\
\<linha em branco\>\
\<mensagem\>\
\<linha em branco\>\
\<rodapé\>

**Exemplo:**
```sh
chore(tslint): instalar dependência tslint

A dependência tslint é um utilitário de linting para TypeScript.
Auxilia o desenvolvedor a escrever o código em um padrão
preestabelecido.

BREAKING CHANGE:
Quanto ao foo.bar, foo.baz deve ser utilizado ao invés disso.
```

**\<tipo\>:**
  - **feat** - nova funcionalidade/recurso (features)
  - **fix** - correção de bug
  - **perf** - uma mudança de código que melhora a performance
  - **docs** - alterações na documentação
  - **style** - formatação, falta de ponto e vírgula, etc; não afetam o significado do código
  - **refactor** - refatoração do código, não corrige um bug nem adiciona um recurso; por exemplo, renomear variável
  - **test** - adição ou correção de testes
  - **chore** - atualizando tasks do Grunt, Webpack, etc; mudanças que não modificam o src/

**\<escopo\>:** Opcional, principalmente se a alteração for global.\
Exemplos: init, runner, watcher, config, web-server, proxy, etc.

**\<assunto\>:** Deve ser escrito na forma imperativa, ou se preferir, de uma forma que complete a frase "Se aplicado, este commit irá ".

**\<corpo\>:** Deve conter descrições mais precisas do que está contido no commit, mostrando as razões ou consequências geradas pela alteração, assim como instruções futuras.

**\<rodapé\>:** É dedicado para notas e avisos importantes, como fechamento de issue e se existem mudanças radicais que quebrem funcionalidades. No caso de mudanças de quebras (BREAKING CHANGE) deve ser indicado “BREAKING CHANGE:” seguido com a explicação que leva a inclusão dessa marcação.

