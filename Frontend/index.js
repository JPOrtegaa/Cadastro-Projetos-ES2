const express = require('express');
const path = require('path');
const axios = require('axios')
var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors())

// Rotas para servir paginas HTML
app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/listarProfissionais', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/Profissional/listaProfissionais.html'));
});

app.get('/listarTimes', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/Time/listaTimes.html'));
});

app.get('/time/:acao/:id', async(req, res) => {
    const acao = req.params.acao;
    if(acao == 'adicionar' || acao == 'remover' || acao == 'editar' || acao == 'visualizar')
        res.sendFile(path.join(__dirname, 'public', './Time/time.html'));
    else 
        res.send(`Ação "${acao}" não suportada.`); 
});

app.get('/time/adicionar', async(req, res) => {
     res.sendFile(path.join(__dirname, 'public', './Time/time.html'));
});

app.get('/profissional/:acao/:id', async(req, res) => {
    const acao = req.params.acao;
    if(acao == 'adicionar' || acao == 'remover' || acao == 'editar' || acao == 'visualizar')
        res.sendFile(path.join(__dirname, 'public', './Profissional/profissional.html'));
    else 
        res.send(`Ação "${acao}" não suportada.`); 
}); 

app.get('/profissional/adicionar', async(req, res) => {
     res.sendFile(path.join(__dirname, 'public', './Profissional/profissional.html'));
});

app.get('/listarProjetos', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/Projeto/listaProjetos.html'));
});

app.get('/projeto/:acao/:id', async(req, res) => {
    const acao = req.params.acao;
    if(acao == 'adicionar' || acao == 'remover' || acao == 'editar' || acao == 'visualizar')
        res.sendFile(path.join(__dirname, 'public', './Projeto/projeto.html'));
    else 
        res.send(`Ação "${acao}" não suportada.`); 
});

app.get('/projeto/adicionar', async(req, res) => {
     res.sendFile(path.join(__dirname, 'public', './Projeto/projeto.html'));
});




// Conexão com o Back-end

// Rotas para listagens
app.get('/profissional/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_PROFISSIONAIS
    listarItem(url,res);
});

app.get('/time/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_TIMES
    listarItem(url,res);
});

app.get('/projeto/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_PROJETOS
    listarItem(url,res);
});

app.get('/projeto/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_PROJETOS
    listarItem(url,res);
});

app.get('/genero/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_GENEROS
    listarItem(url,res);
});

app.get('/raca/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_RACAS
    listarItem(url,res);
});

function listarItem(url,res){
    axios.get(url).then(async (response) => {
        res.send(response.data);
      });
}

// Rotas para requisições GETS
app.get('/profissional/:id', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_PROFISSIONAL + "/" + req.params.id
    getItem(url,res)
});

app.get('/time/:id', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_TIME + "/" + req.params.id
    getItem(url,res)
});

app.get('/projeto/:id', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_PROJETO + "/" + req.params.id
    getItem(url,res)
});


function getItem(url,res){
    axios.get(url).then(async (response) => {
        res.send(response.data);
    });
}


// Rotas para requisições PUTS
app.put('/profissional/atualizar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_PUT_PROFISSIONAL;
    await putItem(url,req.body.corpoDaRequisicao,res)
});

app.put('/time/atualizar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_PUT_TIME;
    await putItem(url,req.body.corpoDaRequisicao,res)
});

app.put('/projeto/atualizar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_PUT_PROJETO;
    await putItem(url,req.body.corpoDaRequisicao,res)
});


async function putItem(url,jsonBody, res){
    try {
        const response = await axios.put(url, jsonBody);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Rotas para requisições POSTS
app.post('/profissional/inserir', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_POST_PROFISSIONAL;
    await postItem(url,req.body.corpoDaRequisicao, res)
});

app.post('/time/inserir', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_POST_TIME;
    await postItem(url,req.body.corpoDaRequisicao, res)
});

app.post('/projeto/inserir', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_POST_PROJETO;
    await postItem(url,req.body.corpoDaRequisicao, res)
});

async function postItem(url, jsonBody, res){
    try {
        const response = await axios.post(url, jsonBody);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

// Rotas para requisições DELETES
app.delete('/profissional/deletar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_DELETE_PROFISSIONAL
    await deleteItem(url,req.body.source,res)
});

app.delete('/time/deletar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_DELETE_TIME 
    await deleteItem(url,req.body.source,res)
});

app.delete('/projeto/deletar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_DELETE_PROJETO
    await deleteItem(url,req.body.source,res)
});

async function deleteItem(url,jsonBody,res){
    try {
        const response = await axios.delete(url, { data: jsonBody});
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// Rotas que o servidor frontend vai usar para se comunicar com o backend

// BACKEND
let URL_BASE_BACKEND = process.env.NODE_FRONTEND_APP_URL;

// Profissional
let URL_BACKEND_GET_PROFISSIONAL = "/profissional"
let URL_BACKEND_GET_LISTAR_PROFISSIONAIS = "/profissional/listar"
let URL_BACKEND_PUT_PROFISSIONAL = "/profissional/atualizar"
let URL_BACKEND_DELETE_PROFISSIONAL = "/profissional/deletar"
let URL_BACKEND_POST_PROFISSIONAL = "/profissional/inserir"


let URL_BACKEND_GET_LISTAR_RACAS = "/raca/listar"
let URL_BACKEND_GET_LISTAR_GENEROS = "/genero/listar"

// Times
let URL_BACKEND_GET_TIME = "/time"
let URL_BACKEND_GET_LISTAR_TIMES = "/time/listar"
let URL_BACKEND_PUT_TIME = "/time/atualizar"
let URL_BACKEND_DELETE_TIME = "/time/deletar"
let URL_BACKEND_POST_TIME = "/time/inserir"

// Projetos
let URL_BACKEND_GET_PROJETO = "/projeto"
let URL_BACKEND_GET_LISTAR_PROJETOS = "/projeto/listar"
let URL_BACKEND_PUT_PROJETO = "/projeto/atualizar"
let URL_BACKEND_DELETE_PROJETO = "/projeto/deletar"
let URL_BACKEND_POST_PROJETO = "/projeto/inserir"