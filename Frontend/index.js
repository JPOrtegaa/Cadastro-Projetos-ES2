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
        res.sendFile(path.join(__dirname, 'public', './time/time.html'));
    else 
        res.send(`Ação "${acao}" não suportada.`); 
});

app.get('/time/adicionar', async(req, res) => {
     res.sendFile(path.join(__dirname, 'public', './time/time.html'));
});


app.get('/profissional/:acao/:id', async(req, res) => {
    const acao = req.params.acao;
    if(acao == 'adicionar' || acao == 'remover' || acao == 'editar' || acao == 'visualizar')
        res.sendFile(path.join(__dirname, 'public', './profissional/profissional.html'));
    else 
        res.send(`Ação "${acao}" não suportada.`); 
}); 

app.get('/profissional/adicionar', async(req, res) => {
     res.sendFile(path.join(__dirname, 'public', './profissional/profissional.html'));
});


app.get('/listarProjetos', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/projeto/listaProjetos.html'));
});

app.get('/projeto/:acao/:id', async(req, res) => {
    const acao = req.params.acao;
    console.log(acao)
    if(acao == 'adicionar' || acao == 'remover' || acao == 'editar' || acao == 'visualizar')
        res.sendFile(path.join(__dirname, 'public', './projeto/projeto.html'));
    else 
        res.send(`Ação "${acao}" não suportada.`); 
});

app.get('/projeto/adicionar', async(req, res) => {
     res.sendFile(path.join(__dirname, 'public', './projeto/projeto.html'));
});



// Listagens
app.get('/profissional/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_PROFISSIONAIS
    axios.get(url).then(async (response) => {
        res.send(response.data);
      });
});


app.get('/time/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_TIMES
    axios.get(url).then(async (response) => {
        res.send(response.data);
      });
});

app.get('/projeto/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_PROJETOS
    axios.get(url).then(async (response) => {
        res.send(response.data);
      });
});

app.get('/projeto/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_PROJETOS
    axios.get(url).then(async (response) => {
        res.send(response.data);
      });
});


app.get('/genero/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_GENEROS
    axios.get(url).then(async (response) => {
        res.send(response.data);
      });
});

app.get('/raca/listar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_LISTAR_RACAS
    axios.get(url).then(async (response) => {
        res.send(response.data);
      });
});






// GETS
app.get('/profissional/:id', async(req, res) => {
    const id = req.params.id;
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_PROFISSIONAL + "/" + id
    axios.get(url).then(async (response) => {
        res.send(response.data);
      });
});

app.get('/time/:id', async(req, res) => {
    const id = req.params.id;
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_TIME + "/" + id
    axios.get(url).then(async (response) => {
        res.send(response.data);
      });
});

app.get('/projeto/:id', async(req, res) => {
    const id = req.params.id;
    console.log(id)
    let url = URL_BASE_BACKEND + URL_BACKEND_GET_PROJETO + "/" + id
    axios.get(url).then(async (response) => {
        res.send(response.data);
      });
});


// PUTS
app.put('/profissional/atualizar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_PUT_PROFISSIONAL;
    let jsonBody = req.body.corpoDaRequisicao;
    console.log(jsonBody)

    try {
        const response = await axios.put(url, jsonBody);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/time/atualizar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_PUT_TIME;
    let jsonBody = req.body.corpoDaRequisicao;

    console.log(jsonBody)
    
    try {
        const response = await axios.put(url, jsonBody);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/projeto/atualizar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_PUT_PROJETO;
    let jsonBody = req.body.corpoDaRequisicao;
    console.log(jsonBody)

    try {
        const response = await axios.put(url, jsonBody);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// POSTS
app.post('/profissional/inserir', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_POST_PROFISSIONAL;
    console.log(req.body)
    let jsonBody = req.body.corpoDaRequisicao;
    console.log(jsonBody)
    try {
        const response = await axios.post(url, jsonBody);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/time/inserir', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_POST_TIME;
    let jsonBody = req.body.corpoDaRequisicao;
    console.log(jsonBody)
    try {
        const response = await axios.post(url, jsonBody);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/projeto/inserir', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_POST_PROJETO;
    let jsonBody = req.body.corpoDaRequisicao;
    console.log(jsonBody)
    try {
        const response = await axios.post(url, jsonBody);
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



// DELETES
app.delete('/profissional/deletar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_DELETE_PROFISSIONAL
    let jsonBody = req.body.source;

    try {
        const response = await axios.delete(url, { data: jsonBody});
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/time/deletar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_DELETE_TIME 
    let jsonBody = req.body.source;

    try {
        const response = await axios.delete(url, { data: jsonBody});
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete('/projeto/deletar', async(req, res) => {
    let url = URL_BASE_BACKEND + URL_BACKEND_DELETE_PROJETO
    let jsonBody = req.body.source;

    try {
        const response = await axios.delete(url, { data: jsonBody});
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// Rotas que o servidor frontend vai usar para se comunicar com o backend

// BACKEND
let URL_BASE_BACKEND = "http://localhost:8080";

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
