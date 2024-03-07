import { URL_BASE, URL_GET_TIME, URL_PUT_TIME, URL_POST_TIME,URL_DELETE_TIME, URL_GET_LISTAR_PROFISSIONAIS } from '../../constantes.js';
import { EventBus } from '../../eventBus.js';
new Vue({
    el:'#formularioTime',
    template:
        `
        <div class="col-12 offset-2">
            <div class="conteudo mt-3">

                <div v-if="disable == true" class="mb-3 col-2">
                    <label class="form-label">ID</label>
                    <input type="number" class="form-control" v-model="idTime" id="idTime" :disabled="disable" >
                </div>

                <div class="mb-3">
                    <label class="form-label">Nome</label>
                    <input type="text" class="form-control" v-model="nomeTime" id="nomeTime" placeholder="Nome do Time" :disabled="disable" >
                </div>

                <div class = "row mt-3">
                    <div class="col-7">
                    
                        <table class="table table-hover mt-4 table-bordered align-middle m-0 text-center" :disabled="disable" >
                            <thead class="table-light">
                                <tr style="width:100%">   
                                    <th style="width:65%;">Nome</th>
                                    <th style="width:35%;">Opções</th>
                                </tr>
                            </thead>

                            <tbody >
                                <tr v-for="(item, index) in listaProfissionaisDoTime">
                                    <td>{{ item }}</td>
                                    <td>
                                        <button @click="removeProfissional(index)" :hidden="disable" class="btn btn-danger" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                        Excluir
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>



                    <div class="col-5">
                        <label class="form-label">Profissional</label>
                        <select @change="adicionarProfissional" class="form-select" v-model="profissionalSelecionado" id="listaDeTodosOsProfissionais" :disabled="disable" >
                        <option v-for="profissional in listaDeTodosOsProfissionais" :value="profissional">{{ profissional }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    
        `,
    data(){
        return {
            idTime:'',
            nomeTime:'',
            listaProfissionaisDoTime:[],
            listaDeTodosOsProfissionais:[ "Profissional 1", "Profissional 2", "Profissional 3"],
            profissionalSelecionado: '',
            disable: false
        }
    },
    mounted:async function(){
        let tipo = window.location.pathname.split("/")[2]
        await this.getId();
        if(tipo == 'visualizar')
            this.disable = true;


        if( tipo == 'editar' || tipo == 'cadastrar')
            await this.getTodosProfissionais();


        if( tipo != 'adicionar')
            await this.getInfo();


        EventBus.$on('confirmarCriacaoEdicao',() => {
            if(this.validarCampos()){
                this.enviarRequisicaoCriacaoEdicao();
            }
        });

        EventBus.$on('excluir',() => {
            this.excluirTime();
        });
    },
    async getId(){
        let id = window.location.pathname.split("/")[window.location.pathname.split("/").length-1]
        this.idTime = id;
    },
    methods:{
        async getInfo(){
            // Só para testes

            let url = URL_BASE + URL_GET_TIME + "/" + this.idTime

            // Armazena 'this' em uma variável para uso dentro da função de callback
            let self = this;

            axios.get(url).then(async (response) => {
            let data = response.data;
            //self.idTime = data.id
            self.nomeTime = data.nome
            self.listaProfissionaisDoTime = data.profissionais
            });
        },

        adicionarProfissional(){
            if( !(this.listaProfissionaisDoTime.includes(this.profissionalSelecionado))){
                this.listaProfissionaisDoTime.push(this.profissionalSelecionado)
            }
            else{
                alert("Profissional já está no time!")
            }
        },

        removeProfissional(index){
            this.listaProfissionaisDoTime.splice(index,1);
        },

        async getTodosProfissionais(){
            let url = URL_BASE + URL_GET_LISTAR_PROFISSIONAIS

            // Armazena 'this' em uma variável para uso dentro da função de callback
            let self = this;
        

            axios.get(url).then(async (response) => {
            let data = response.data;
                for(let i = 0; i < data.length; i++){
                    self.listaDeTodosOsProfissionais.push(data[i].nomeProfissional)
                }
            });
        },

        validarCampos(){
            let valido = true;  

            if (!this.nomeTime || this.nomeTime.trim() == ""){
                $("#nomeTime").addClass("invalido");
                valido = false;
            }
            if (this.listaProfissionaisDoTime.length  < 1){
                $("#listaProfissionaisDoTime").addClass("invalido");
                valido = false;
            }

            if(valido){
                return true;
            }
                
            return false
        },

        async enviarRequisicaoCriacaoEdicao(){
            let tipo = window.location.pathname.split("/")[2]
            let corpoDaRequisicao = {};
            if(tipo == 'editar'){
                corpoDaRequisicao.idTime = this.idTime;
            }

            corpoDaRequisicao.nomeTime = this.nomeTime;
            corpoDaRequisicao.profissionais = this.listaProfissionaisDoTime;

            let url = ""

            if(tipo == 'editar'){
                url = URL_BASE + URL_PUT_TIME
                const corpoJSON = JSON.stringify(corpoDaRequisicao);
                console.log(corpoJSON)

                try {
                    const response = await axios.put(url, {corpoDaRequisicao});
                    if (response.status == 200){ alert("Salvo com sucesso!"); }
                } catch (error) { alert('Erro ao salvar alterações: ' + error); }
            }

            else if(tipo == "adicionar"){
                url = URL_BASE + URL_POST_TIME
                const corpoJSON = JSON.stringify(corpoDaRequisicao);
                try {
                    const response = await axios.post(url, {corpoJSON});
                    if (response.status == 200){ alert("Salvo com sucesso!"); }
                } catch (error) {
                    alert('Erro ao salvar alterações: ' + error);
                  }
            }
        },

        async excluirTime(){
            const url = URL_BASE + URL_DELETE_TIME + "/" + this.idTime

            axios.delete(url)
            .then(response => {
                alert(response);
            })
            .catch(error => {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } 

                else if (error.request) {
                  console.log(error.request);
                } 

                else {
                  console.log('Error', error.message);
                }
            });
        }
    }
        


})