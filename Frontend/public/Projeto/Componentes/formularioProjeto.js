import { EventBus } from '../../eventBus.js';
new Vue({
    el:'#formularioProjeto',
    template:
        `
        <div class="col-10 offset-2">
            <div class="conteudo mt-4">

                <div v-if="disable == true" class="mb-3 col-2">
                    <label class="form-label">ID</label>
                    <input type="number" class="form-control" v-model="idProjeto" id="idProjeto" :disabled="disable" >
                </div>

                <div class="row mb-3">
                    <div class=" col-6">
                        <label class="form-label">Nome do projeto</label>
                        <input type="text" class="form-control" v-model="nomeProjeto" id="nomeProjeto" placeholder="Nome do projeto" :disabled="disable" >
                    </div>

                    <div class=" col-6">
                        <label class="form-label">Nome do Cliente</label>
                        <input type="text" class="form-control" v-model="nomeCliente" id="nomeCliente" placeholder="Nome do cliente" :disabled="disable" >
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Objetivo</label>
                    <textarea class="form-control" rows=5 v-model="objetivo" id="objetivo" placeholder="Objetivo" :disabled="disable" ></textarea>
                </div>

                <div class="row mb-3">
                    <div class="col-4">
                        <label class="form-label">Data de inicio</label>
                        <input type="date" class="form-control" v-model="dataInicio" id="dataInicio" :disabled="disable" >
                    </div>

                    <div class="col-4">
                        <label class="form-label">Data de termino</label>
                        <input type="date" class="form-control" v-model="dataFim" id="dataFim" :disabled="disable" >
                    </div>

                    <div class="mb-3 col-4">
                        <label class="form-label">Valor do projeto</label>
                        <input type="number" class="form-control" v-model="valor" id="valor" :disabled="disable" >
                    </div>
                </div>
                <div class="mb-3 col-7">
                    <label class="form-label">Time responsável</label>
                    <select class="form-select" v-model="timeResponsavel" id="timeResponsavel" :disabled="disable" >
                        <option v-for="responsavel in timeResponsavel">{{ responsavel }}</option>
                    </select>
                </div>
            </div>
        </div>
    
        `,
    data(){
        return {
            idProjeto:'',
            nomeProjeto:'',
            nomeCliente:'',
            objetivo:'',
            dataInicio:'',
            dataFim:'',
            valor:'',
            timeResponsavel:'',
            disable: false
        }
    },
    mounted:async function(){
        let tipo = window.location.pathname.split("/")[2]
        if(tipo == 'visualizar')
            this.disable = true;

        if( tipo != 'adicionar')
            await this.getInfo();


        EventBus.$on('confirmarCriacaoEdicao',() => {
            if(this.validarCampos()){
                this.enviarRequisicaoCriacaoEdicao();
            }
        });

        EventBus.$on('excluir',() => {
            this.excluirProjeto();
        });
    },
    methods:{
        async getInfo(){
            // Só para testes
            let id = 8
            let url = `/projeto/getProjeto/${id}`

            // Armazena 'this' em uma variável para uso dentro da função de callback
            let self = this;

            axios.get(url).then(async (response) => {
                let data = response.data;
                self.idProjeto = data.id;
                self.nomeProjeto = data.nome;
                self.nomeCliente = data.nomeCliente;
                self.objetivo = data.objetivo;
                self.dataInicio = data.dataInicio;
                self.dataFim = data.dataFim;
                self.valor = data.valor;
                self.timeResponsavel = data.timeResponsavel
            });
        },


        validarCampos(){
            let valido = true;

            if (!this.nomeProjeto || this.nomeProjeto.trim() == ""){
                $("#nomeProjeto").addClass("invalido");
                valido = false;
            }
            if (!this.nomeCliente || this.nomeCliente.trim() ==  ""){
                $("#nomeCliente").addClass("invalido");
                valido = false;
            }
            if (!this.objetivo || this.objetivo.trim() ==  ""){
                $("#objetivo").addClass("invalido");
                valido = false;
            }
            if (!this.dataInicio || this.dataInicio == ""){
                $("#dataInicio").addClass("invalido");
                valido = false;
            }
            if (!this.dataFim || this.dataFim == ""){
                $("#dataFim").addClass("invalido");
                valido = false;
            }
            if (!this.valor || this.valor.trim() ==  ""){
                $("#valor").addClass("invalido");
                valido = false;
            }
            if (!this.timeResponsavel || this.timeResponsavel == ""){
                $("#timeResponsavel").addClass("invalido");
                valido = false;
            }

            if(this.dataFim < this.dataInicio){
                $("#dataInicio").addClass("invalido");
                $("#dataFim").addClass("invalido");
                valido = false;
                alert("A data final não pode ser anterior à inicial")
            }

            if(valido){
                return true;
            }
                
            return false
        },

        async enviarRequisicaoCriacaoEdicao(){
            const corpoDaRequisicao = {
                nomeProjeto : this.nome,
                nomeCliente : this.nomeCliente,
                objetivo : this.objetivo,
                dataInicio : this.dataInicio,
                dataFim : this.dataFim,
                valor : this.valor,
                timeResponsavel : this.timeResponsavel
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

        async excluirProjeto(){
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