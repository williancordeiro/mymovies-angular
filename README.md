# My Movies Angular

O **My Movies** é um projeto desenvolvido por alunos da **UTFPR Guarapuava** para possibilitar aos seus usuários avaliar filmes que já foram assistidos ou que ainda pretendem assistir. Além da avaliação, é possível adicionar filmes aos favoritos e criar listas personalizadas por tipo, gênero ou da forma que o usuário desejar.

O projeto utiliza uma arquitetura moderna com Angular e TailwindCSS para oferecer uma experiência fluida e responsiva.

## 🚀 Tecnologias Utilizadas

- [**Angular 21+**](https://angular.dev/) (Signals, Modern Component API)
- [**TailwindCSS 4**](https://tailwindcss.com/) (Estilização)
- [**Vitest**](https://vitest.dev/) (Testes unitários)
- [**Docker**](https://www.docker.com/) & [**Docker Compose**](https://docs.docker.com/compose/) (Containerização e Nginx)
- [**Bash Script**](https://www.gnu.org/software/bash/manual/) (`run`) (Automação de tarefas)

## 🛠️ Pré-requisitos

- Node.js (versão 20+)
- Yarn
- Docker e Docker Compose

## ⚙️ Configuração Inicial

Antes de executar o projeto, é necessário configurar as variáveis de ambiente e o proxy:

1. **Variáveis de Ambiente:**
   - Renomeie o arquivo `.env.example` para `.env`.
   - Edite o `.env` e adicione o endereço da API no campo correspondente.

2. **Proxy de Desenvolvimento:**
   - Renomeie o arquivo `proxy.conf.example.json` para `proxy.conf.json`.
   - Edite o `proxy.conf.json` e altere o endereço da API no campo `target`.

## 💻 Desenvolvimento Local

Para rodar o projeto em ambiente de desenvolvimento:

1. **Instale as dependências:**
   ```bash
   ./run yarn
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   yarn start
   ```
   O projeto estará disponível em `http://localhost:4200`.

## 🐳 Execução com Docker

O projeto utiliza Docker Compose para orquestrar o build e o servidor Nginx.

1. **Suba os containers (modo detached):**
   ```bash
   ./run up -d
   ```
   A aplicação será compilada no container `angular` e servida pelo `nginx` em `http://localhost`.

2. **Para parar os containers:**
   ```bash
   ./run down
   ```

## 📜 Script de Automação (`run`)

O arquivo `./run` facilita a execução de comandos comuns:

- `./run yarn`: Instala as dependências do projeto localmente.
- `./run up -d`: Sobe o ambiente Docker Compose em segundo plano.
- `./run down`: Para os containers do Docker Compose.
- `./run angular:console`: Acessa o terminal do container Angular.
- `./run nginx:console`: Acessa o terminal do container Nginx.

## 🧪 Testes

Para rodar os testes unitários com Vitest:
```bash
yarn test
```

---
Desenvolvido por **Alunos da UTFPR Guarapuava**:
- [Willian Cordeiro](https://github.com/williancordeiro)
- [Felipe Fadel](https://github.com/FelipeFadel)
- [Tiago Sampaio Cordeiro](https://github.com/tiago-sampaio-cordeiro)
