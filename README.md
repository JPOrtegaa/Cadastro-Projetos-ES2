
# Gerenciador de Projetos Full Stack

Este projeto é uma aplicação Web full stack desenvolvida para a matéria de Engenharia de Software II, da UNIOESTE, tendo como objetivo gerenciar projetos usando o framework de gerenciamento de equipes SCRUM.

## Funcionalidades
- Listar Profissionais, Times e Projetos.
- Adicionar Profissionais, Times e Projetos.
- Visualizar Profissionais, Times e Projetos.
- Editar Profissionais, Times e Projetos.
- Remover Profissionais, Times e Projetos.

## Principais Tecnologias Utilizadas

- Front-end: Node.js.
- Back-end: Spring Boot.
- Banco de Dados: MySQL.
- Outras tecnologias utilizadas: GitFlow, Docker e Docker Compose.



<a name="comoExecutar"></a>
## Como Executar
- Certfique-se de que o banco de dados MySQL está sendo executado e [Configurado como mostrado aqui.](#configuracaoBanco)
- Clone o repositório.
- Inicie o servidor back-end, cujo conteúdo se encontra na pasta "Backend".
    - Observe as [dependências do servidor back-end](#dependenciasBack).
    - O padrão utilizado para DAO com o banco de dados é user:**root**, password:**root** e database:**es2-projeto1-final**, caso tenha configurado diferente em seu banco de dados, deve-se alterar as classes DAO em **src/main/java/DAO** com as credenciais utilizadas.
    - A porta padrão definida para o back-end é **8080**.

- Inicie o servidor front-end, o conteúdo se encontra em "Frontend"
    - Observe as [dependências do servidor front-end](#dependenciasFront).
    - Certifique-se de estar dentro da pasta "Frontend" e instale as dependências com:
        - `npm install express`
        - `npm install cors`
        - `npm install axios`
    - Execute o servidor front-end com :
        - `node index.js`
    - A porta padrão definida para o front-end é **3000**.

- Acesse a aplicação através do navegador através link `localhost:3000`


<a name="dependenciasFront"></a>
## Dependências do servidor front-end
| Nome | Versão |
|---|---|
| Node.js  | 20.11.1 ou superior  |
| Express | 4.18.3 ou superior  |
| Cors  |  2.8.5 ou superior |
| Axios  | 1.6.7 ou superior  |


<a name="dependenciasBack"></a>
## Dependências do servidor back-end

| Nome | Versão |
|---|---|
| Java JDK  | 17  |
| MySql connector | 8.3.0  |
| Spring Boot Starter Web  |  3.2.3 |

## Dependências para banco de dados
| Nome | Versão |
|---|---|
| Banco de dados Mysql  | 8.0.36  |

<a name="configuracaoBanco"></a>
## Configuração do banco de dados

### Genero
| Nome | Tipo |
| ----------- | ----------- |
| (PK) idGenero | INT |
| nomeGenero | VARCHAR(45) |


### Raca
| Nome | Tipo |
| ----------- | ----------- |
| (PK) idRaca | INT |
| nomeRaca | VARCHAR(45) |

### Time
| Nome | Tipo |
| ----------- | ----------- |
| (PK) idTime | INT |
| nomeTime | VARCHAR(45) |


### Projeto
| Nome | Tipo |
| ----------- | ----------- |
| (PK) idProjeto | INT |
| nomeProjeto | VARCHAR(45) |
| nomeCliente | VARCHAR(45) |
| objetivoProjeto | VARCHAR(45) |
| dataInicio | DATE |
| dataTermino | DATE |
| valorProjeto | FLOAT |
| (FK) Time_idTime | INT |


### Profissional
| Nome | Tipo |
| ----------- | ----------- |
| (PK) idProfissional | INT |
| nomeProfissional | VARCHAR(45) |
| dataNascimento | DATE |
| especialidadeProfissional | VARCHAR(45) |
| enderecoProfissional | VARCHAR(45) |
| (FK) Genero_idGenero | INT |
| (FK) Raca_idRaca | INT |


### time_profissional
| Nome | Tipo |
| ----------- | ----------- |
| (FK) Time_idTime | INT |
| (FK) Profissional_idProfissional | INT |



