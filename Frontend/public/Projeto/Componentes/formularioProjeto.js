import { EventBus } from '../../eventBus.js';
import {URL_BASE, URL_GET_PROJETO, URL_POST_PROJETO, URL_DELETE_PROJETO, URL_GET_LISTAR_TIMES, URL_PUT_PROJETO} from "../../constantes.js";

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
                        <option v-for="responsavel in listaTimeResponsavel">{{ responsavel.nomeTime }}</option>
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
            listaTimeResponsavel: [],
            disable: false
        }
    },
    mounted:async function(){
        await this.getId();
        await this.getTimes();
        let tipo = window.location.pathname.split("/")[2]
        if(tipo == 'visualizar')
            this.disable = true;

        if( tipo != 'adicionar'){
            
            await this.getInfo();
        }

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
        async getId(){
            this.idProjeto = window.location.pathname.split("/")[window.location.pathname.split("/").length-1];
        },

        async getTimes(){
            let url = URL_BASE + URL_GET_LISTAR_TIMES;
            let self = this;

            axios.get(url).then(async (response) => {
                let data = response.data;
                for(let i = 0; i < data.length; i++){
                    self.listaTimeResponsavel.push(data[i])
                }
            });

        },

        async getInfo(){
            // Só para testes

            let url = URL_BASE + URL_GET_PROJETO + "/" + this.idProjeto

            // Armazena 'this' em uma variável para uso dentro da função de callback
            let self = this;

            axios.get(url).then(async (response) => {
                let data = response.data;
                console.log(data)
                //self.idProjeto = data.idProjeto;
                self.nomeProjeto = data.nomeProjeto;
                self.nomeCliente = data.nomeCliente;
                self.objetivo = data.objetivoProjeto;
                self.dataInicio = data.dataInicio;
                self.dataFim = data.dataTermino;
                self.valor = data.valorProjeto;
                self.timeResponsavel = data.time.nomeTime
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
            if (!this.valor || this.valor ==  ""){
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
            let tipo = window.location.pathname.split("/")[2]
            let corpoDaRequisicao = {
                nomeProjeto: this.nomeProjeto,
                nomeCliente: this.nomeCliente,
                objetivoProjeto: this.objetivo,
                dataInicio: this.dataInicio,
                dataTermino: this.dataFim,
                valorProjeto:  this.valor
            };

            let time;
            let p = 0;
            for(let i = 0; i < this.listaTimeResponsavel.length; i++){
                if(this.timeResponsavel == this.listaTimeResponsavel[i].nomeTime){
                    break;
                }
                p += 1;
            }

            time = this.listaTimeResponsavel[p]

            corpoDaRequisicao.time = time;


            let url = ""

            if(tipo == 'editar'){
                url = URL_BASE + URL_PUT_PROJETO
                corpoDaRequisicao.idProjeto = this.idProjeto;

                try {
                    const response = await axios.put(url, {corpoDaRequisicao});
                    if (response.status == 200){ alert("Salvo com sucesso!"); }
                } catch (error) { alert('Erro ao salvar alterações: ' + error); }
            }

            else if(tipo == "adicionar"){
                url = URL_BASE + URL_POST_PROJETO
                try {
                    const response = await axios.post(url, {corpoDaRequisicao});
                    if (response.status == 200){ 
                        alert("Criado com sucesso!");
                         window.location.href = "/listarProjetos"
                    }
                } catch (error) {
                    alert('Erro ao salvar alterações: ' + error);
                  }
            }
        },

        async excluirProjeto(){
            const url = URL_BASE + URL_DELETE_PROJETO 

            let corpoDaRequisicao = {
                idProjeto: this.idProjeto,
                nomeProjeto: this.nomeProjeto,
                nomeCliente: this.nomeCliente,
                objetivoProjeto: this.objetivo,
                dataInicio: this.dataInicio,
                dataTermino: this.dataFim,
                valorProjeto:  this.valor
            };

            let time;
            let p = 0;
            for(let i = 0; i < this.listaTimeResponsavel.length; i++){
                if(this.timeResponsavel == this.listaTimeResponsavel[i].nomeTime){
                    break;
                }
                p += 1;
            }

            time = this.listaTimeResponsavel[p]

            corpoDaRequisicao.time = time;


            try {
                const response = await axios.delete(url, {  data: {
                    source: corpoDaRequisicao
                  }});
                if (response.status == 200){ 
                    alert("Removido com sucesso!"); 
                    window.location.href = "/listarProjetos"
                }
            } catch (error) { alert('Erro ao salvar alterações: ' + error); }


        }
    }
        


})