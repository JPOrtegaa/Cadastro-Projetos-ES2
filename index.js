const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000;
app.use(bodyParser.json());


app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/listarProfissionais', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/Profissional/listaProfissionais.html'));
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






//------------------------------------------------
// EXCLUIR ESSAS ROTAS  
// SAO APENAS PARA TESTE
app.get('/getTesteProfissionais', async(req, res) => {
    const corpoDaRequisicao = [{
        id:             "8",
        nome:           "Gabriel",
        endereco:       "End teste",
        dataNascimento: "sadsadsadas",
        genero:        "sdfsdfsdf",
        raca:           "sdfsdfsdf",
        especialidade:  "Desenvolvedor"
      }];
  
    const corpoJSON = JSON.stringify(corpoDaRequisicao);
    res.send(corpoJSON);
});

app.get('/getProfissional/:id', async(req, res) => {
    const corpoDaRequisicao = {
        id:             "8",
        nome:           "Gabriel",
        endereco:       "End teste",
        dataNascimento: "1995-10-20",
        genero:        "sdfsdfsdf",
        raca:           "sdfsdfsdf",
        especialidade:  "Desenvolvedor"
      };
  
    const corpoJSON = JSON.stringify(corpoDaRequisicao);
    res.send(corpoJSON);
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});