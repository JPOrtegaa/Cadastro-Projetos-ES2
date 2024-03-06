import { EventBus } from '../../eventBus.js';
new Vue({
    el:'#formularioTime',
    template:
        `
        <div class="col-12 offset-2">
            <div class="conteudo mt-3">
                <div class="mb-3">
                    <label class="form-label">Nome</label>
                    <input type="text" class="form-control" v-model="nomeTime" id="nomeTime" placeholder="Nome do Time">
                </div>

                <div class = "row mt-3">
                    <div class="col-7">
                    
                        <table class="table table-hover mt-4 table-bordered align-middle m-0 text-center">
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
                                        <button @click="removeProfissional(index)" class="btn btn-danger" type="button">
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
                        <select @change="adicionarProfissional" class="form-select" v-model="profissionalSelecionado" id="listaDeTodosOsProfissionais">
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
            profissionalSelecionado: ''
        }
    },
    mounted:async function(){
        let tipo = window.location.pathname.split("/")[2]
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
    methods:{
        async getInfo(){
            // Só para testes
            let id = 8
            let url = `/getTime/${id}`

            // Armazena 'this' em uma variável para uso dentro da função de callback
            let self = this;

            axios.get(url).then(async (response) => {
            let data = response.data;
            self.idTime = data.id
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
            let url = `/getProfissionais/`

            // Armazena 'this' em uma variável para uso dentro da função de callback
            let self = this;

            axios.get(url).then(async (response) => {
            let data = response.data;
                self.listaDeTodosOsProfissionais = data.profissionais;
            });
        },

        validarCampos(){
            let valido = true;

            if (this.nomeTime == ""){
                $("#nomeTime").addClass("invalido");
                valido = false;
            }

            if(valido){
                return true;
            }
                
            return false
        },

        async enviarRequisicaoCriacaoEdicao(){
            const corpoDaRequisicao = {
                nome:           this.nomeTime,
                profissionais:  this.listaProfissionaisDoTime
              };
          
            const corpoJSON = JSON.stringify(corpoDaRequisicao);
            
            const url = "URL_NO_BACKEND"

            try {
                const response = await axios.put(url, {
                    corpoJSON
                });
                
                if (response.status == 200){
                  alert("Salvo com sucesso!");
                }
    
            } catch (error) {
                alert('Erro ao salvar alterações: ' + error);
              }
        },

        async excluirTime(){
            const url = `URL_NO_BACKEND/${this.idTime}`;

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