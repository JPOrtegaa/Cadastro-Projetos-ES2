import { EventBus } from '../../eventBus.js';
import {URL_BASE, URL_GET_PROFISSIONAL, URL_PUT_PROFISSIONAL, URL_POST_PROFISSIONAL, URL_DELETE_PROFISSIONAL, URL_GET_LISTAR_GENEROS, URL_GET_LISTAR_RACAS} from "../../constantes.js"
new Vue({
    el:'#formularioProfissional',
    template:
        `
        <div class="col-10 offset-2">
            <div class="conteudo mt-3">
                <div v-if="disable == true" class="mb-3 col-2">
                    <label class="form-label">ID</label>
                    <input type="number" class="form-control" v-model="idProfissional" id="idProfissional" :disabled="disable" >
                </div>

                <div class="mb-3">
                    <label class="form-label">Nome</label>
                    <input type="text" class="form-control" v-model="nomeProfissional" id="nomeProfissional" placeholder="Nome do profissional" :disabled="disable">
                </div>

                <div class="mb-3">
                    <label class="form-label">Endereço</label>
                    <input type="text" class="form-control" v-model="enderecoProfissional" id="enderecoProfissional" placeholder="Endereço do profissional" :disabled="disable">
                </div>

                <div class="mb-3">
                    <label class="form-label">Data de nascimento</label>
                    <input type="date" class="form-control" v-model="dataNascimentoProfissional" id="dataNascimentoProfissional" :disabled="disable">
                </div>

                <div class="row mb-3">
                    <div class="col-6">
                        <label class="form-label">Gênero</label>
                        <select class="form-select" v-model="generoProfissional" id="generoProfissional" :disabled="disable">
                        <option v-for="genero in listaGeneros">{{genero.nome}}</option>
                        </select>
                    </div>


                </div>

                <div class="row mb-3">
                    <div class="col-6">
                        <label class="form-label">Raça</label>
                        <select class="form-select" v-model="racaProfissional" id="racaProfissional" :disabled="disable">
                            <option v-for="raca in listaRacas">{{raca.nome}}</option>
                        </select>
                    </div>



                </div>

                <div class="row mb-3">
                    <div class="col-6">
                        <label class="form-label">Especialidade</label>
                        <select class="form-select" v-model="especialidadeProfissional" id="especialidadeProfissional" :disabled="disable">
                            <option v-for="especialidade in listaEspecialidades">{{especialidade}}</option>
                        </select>
                    </div>

                    <div class="col-6" v-if="especialidadeProfissional == 'Outro'">
                        <label class="form-label">Especifique</label>
                        <input type="text" class="form-control" id="especialidadeProfissionalTexto" v-model="especialidadeProfissionalTexto" placeholder="Especifique" :disabled="disable">
                    </div>
                </div>
            </div>
        </div>

        `,
    data(){
        return {
            idProfissional:'',
            nomeProfissional:'',
            enderecoProfissional:'',
            dataNascimentoProfissional:'',
            generoProfissional:'',
            racaProfissional:'',
            especialidadeProfissional:'',
            especialidadeProfissionalTexto:'',
            idGenero:'',
            idRaca:'',
            disable: false,
            listaTime:'',
            listaGeneros: [],
            listaRacas: [],
            listaEspecialidades: ['Analista de Sistemas','Desenvolvedor','Administrador de banco de dados','Designer','Outro']
        }
    },
    mounted:async function(){
        let tipo = window.location.pathname.split("/")[2]
        await this.getGeneros();
        await this.getRacas();


        await this.getId();

        if(tipo == 'visualizar' || tipo == 'remover'){
            this.disable = true;
        }
            

        if( tipo != 'adicionar')
            await this.getInfo();



        EventBus.$on('confirmarCriacaoEdicao',() => {
            if(this.validarCampos()){
                this.enviarRequisicaoCriacaoEdicao();
            }
        });

        EventBus.$on('excluir',() => {
            this.excluirProfissional();
        });
    },
    methods:{
        async getGeneros(){
            let url = URL_BASE + URL_GET_LISTAR_GENEROS
            let self = this;
            axios.get(url).then(async (response) => {
                let data = response.data;
                for(let i = 0; i < data.length; i++){
                    let obj = {
                        id:data[i].idGenero,
                        nome:data[i].nomeGenero
                    }
                    self.listaGeneros.push(obj)
                }
            });
        },
        async getRacas(){
            let url =   URL_BASE + URL_GET_LISTAR_RACAS
            let self = this;
            axios.get(url).then(async (response) => {
                let data = response.data;
                for(let i = 0; i < data.length; i++){
                    let obj = {
                        id:data[i].idRaca,
                        nome:data[i].nomeRaca
                    }
                    self.listaRacas.push(obj)
                }
            });

        },

        async getId(){
            let id = window.location.pathname.split("/")[window.location.pathname.split("/").length-1]
            this.idProfissional = id;
        },


        async getInfo(){

        let url = URL_BASE + URL_GET_PROFISSIONAL + "/" + this.idProfissional
        
  
        // Armazena 'this' em uma variável para uso dentro da função de callback
        let self = this;

        axios.get(url).then(async (response) => {
            let data = response.data;

            console.log(data)
            //self.idProfissional = data.idProfissional
            self.nomeProfissional = data.nomeProfissional
            self.enderecoProfissional = data.enderecoProfissional
            self.dataNascimentoProfissional = data.dataNascimento
            self.listaTime = data.listaTime
            // Tratar esses campos
            let genero = data.generoProfissional.nomeGenero;
            self.idGenero = data.generoProfissional.idGenero
            self.generoProfissional = genero

            /*if (this.listaGeneros.includes(genero)){
                self.generoProfissional = genero
                self.generoProfissionalTexto = genero
            }

            else{
                self.generoProfissional = "Outro"
                self.generoProfissionalTexto = genero
            }*/

            let raca = data.racaProfissional.nomeRaca;
            self.idRaca = data.racaProfissional.idRaca
            self.racaProfissional = raca

            /*if (this.listaRacas.includes(raca)){
                self.racaProfissional = raca
                
            }
            else{
                self.racaProfissional = "Outro"
                self.racaProfissionalTexto = raca
            }*/

            let especialidade = data.especialidadeProfissional;
            if (this.listaEspecialidades.includes(especialidade)){
                self.especialidadeProfissional = especialidade
            }
            else{
                self.especialidadeProfissional = "Outro"
                self.especialidadeProfissionalTexto = especialidade
            }
        });
    },

        validarCampos(){
            let valido = true;

            if (!this.nomeProfissional || this.nomeProfissional.trim() == ""){
                $("#nomeProfissional").addClass("invalido");
                valido = false;
            }

            if (!this.enderecoProfissional || this.enderecoProfissional.trim() == ""){
                $("#enderecoProfissional").addClass("invalido");
                valido = false;
            }

            if (!this.dataNascimentoProfissional || this.dataNascimentoProfissional == ""){
                $("#dataNascimentoProfissional").addClass("invalido");
                valido = false;
            }

            if (!this.generoProfissional || this.generoProfissional.trim() == ""){
                $("#generoProfissional").addClass("invalido");
                valido = false;
            }

            if (!this.racaProfissional || this.racaProfissional.trim() == ""){
                $("#racaProfissional").addClass("invalido");
                valido = false;
            }

            if (!this.especialidadeProfissional  || this.especialidadeProfissional.trim() == ""){
                $("#especialidadeProfissional").addClass("invalido");
                valido = false;
            }

            if (this.especialidadeProfissional == "Outro"){
                if(!this.especialidadeProfissionalTexto  || this.especialidadeProfissionalTexto.trim() == ""){
                    $("#especialidadeProfissionalTexto").addClass("invalido");
                    valido = false;
                }
            }


            if(valido){
                return true;
            }
                
            return false
        },

        async enviarRequisicaoCriacaoEdicao(){
            let tipo = window.location.pathname.split("/")[2]
            let p = 0;
            for(let i = 0; i < this.listaGeneros.length; i++){
                if(this.listaGeneros[p].nome == this.generoProfissional)
                    break;
                else{
                    p +=1
                }
            }

            let idGenero = this.listaGeneros[p].id

            p = 0;
            for(let i = 0; i < this.listaRacas.length; i++){
                if(this.listaRacas[p].nome == this.racaProfissional)
                    break;
                else{
                    p +=1
                }
            }

            let idRaca = this.listaRacas[p].id

            let corpoDaRequisicao = {
                nomeProfissional: this.nomeProfissional,
                dataNascimento: this.dataNascimentoProfissional,
                enderecoProfissional: this.enderecoProfissional,
                generoProfissional:{
                    idGenero: idGenero,
                    nomeGenero: this.generoProfissional
                },
                racaProfissional:{
                    idRaca:idRaca,
                    nomeRaca:this.racaProfissional
                },
                especialidadeProfissional: this.especialidadeProfissional == "Outro" ? this.especialidadeProfissionalTexto.trim() : this.especialidadeProfissional,
                listaTimes: null
            };  

            if(tipo == 'editar'){
                corpoDaRequisicao.idProfissional = this.idProfissional;
            }
                

            let url = ""

            if(tipo == 'editar'){
                url = URL_BASE + URL_PUT_PROFISSIONAL

                try {
                    const response = await axios.put(url, {corpoDaRequisicao});
                    if (response.status == 200){ alert("Salvo com sucesso!"); }
                } catch (error) { alert('Erro ao salvar alterações: ' + error); }
            }
            
                
            else if(tipo == "adicionar"){
                url = URL_BASE + URL_POST_PROFISSIONAL
                try {
                    const response = await axios.post(url, {corpoDaRequisicao});
                    if (response.status == 200){
                         alert("Criado com sucesso!");
                         window.location.href = "/listarProfissionais"
                 }
                } catch (error) {
                    alert('Erro ao salvar alterações: ' + error);
                  }
            }
        },

        async excluirProfissional(){
            const url = URL_BASE + URL_DELETE_PROFISSIONAL
            let p = 0;
            for(let i = 0; i < this.listaGeneros.length; i++){
                if(this.listaGeneros[p].nome == this.generoProfissional)
                    break;
                else{
                    p +=1
                }
            }

            let idGenero = this.listaGeneros[p].id

            p = 0;
            for(let i = 0; i < this.listaRacas.length; i++){
                if(this.listaRacas[p].nome == this.racaProfissional)
                    break;
                else{
                    p +=1
                }
            }

            let idRaca = this.listaRacas[p].id

            let corpoDaRequisicao = {
                idProfissional: this.idProfissional,
                nomeProfissional: this.nomeProfissional,
                dataNascimento: this.dataNascimentoProfissional,
                enderecoProfissional: this.enderecoProfissional,
                generoProfissional:{
                    idGenero: idGenero,
                    nomeGenero: this.generoProfissional
                },
                racaProfissional:{
                    idRaca:idRaca,
                    nomeRaca:this.racaProfissional
                },
                especialidadeProfissional: this.especialidadeProfissional == "Outro" ? this.especialidadeProfissionalTexto.trim() : this.especialidadeProfissional,
                listaTimes: null
            };  

            try {
                const response = await axios.delete(url, {  data: {
                    source: corpoDaRequisicao
                  }});
                if (response.status == 200){ 
                    alert("Removido com sucesso!"); 
                    window.location.href = "/listarProfissionais"
                }
            } catch (error) { alert('Erro ao salvar alterações: ' + error); }



        }
    }
        


})