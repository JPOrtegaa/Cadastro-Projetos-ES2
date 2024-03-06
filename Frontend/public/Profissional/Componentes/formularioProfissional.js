import { EventBus } from '../../eventBus.js';
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
                            <option>Masculino</option>
                            <option>Feminino</option>
                            <option>Outro</option>
                        </select>
                    </div>

                    <div class="col-6" v-if="generoProfissional == 'Outro'">
                        <label class="form-label">Especifique</label>
                        <input type="text" class="form-control" v-model="generoProfissionalTexto" id="generoProfissionalTexto" placeholder="Especifique o gênero" :disabled="disable">
                    </div>

                </div>

                <div class="mb-3">
                    <label class="form-label">Raça</label>
                    <select class="form-select" v-model="racaProfissional" id="racaProfissional" :disabled="disable">
                        <option>Opção 1</option>
                        <option>Opção 2</option>
                        <option>Opção 3</option>
                    </select>
                </div>

                <div class="row mb-3">
                    <div class="col-6">
                        <label class="form-label">Especialidade</label>
                        <select class="form-select" v-model="especialidadeProfissional" id="especialidadeProfissional" :disabled="disable">
                            <option>Analista de Sistemas</option>
                            <option>Desenvolvedor</option>
                            <option>Administrador de banco de dados</option>
                            <option>Designer</option>
                            <option>Outro</option>
                        </select>
                    </div>

                    <div class="col-6" v-if="especialidadeProfissional == 'Outro'">
                        <label class="form-label">Especifique</label>
                        <input type="text" class="form-control" id="especialidadeProfissionalTexto" v-model="especialidadeProfissionalTexto" placeholder="Especifique a especialidade">
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
            generoProfissionalTexto:'',
            racaProfissional:'',
            especialidadeProfissional:'',
            especialidadeProfissionalTexto:'',
            disable: true
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
            this.excluirProfissional();
        });
    },
    methods:{
        async getInfo(){
            // Só para testes
        let id = 8
        let url = `/getProfissional/${id}`

        // Armazena 'this' em uma variável para uso dentro da função de callback
        let self = this;

        axios.get(url).then(async (response) => {
          let data = response.data;
          self.idProfissional = data.id
          self.nomeProfissional = data.nome
          self.enderecoProfissional = data.endereco
          self.dataNascimento = data.dataNascimento

          // Tratar esses campos
          self.generoProfissional = data.genero
          self.racaProfissional = data.raca
          self.especialidadeProfissional = data.especialidade
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

            if (this.generoProfissional == "Outro"){
                if(!this.generoProfissionalTexto || this.generoProfissionalTexto.trim() == ""){
                    $("#generoProfissionalTexto").addClass("invalido");
                    valido = false;
                }
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
            const corpoDaRequisicao = {
                nome:           this.nomeProfissional,
                endereco:       this.enderecoProfissional,
                dataNascimento: this.dataNascimentoProfissional,
                genero:         this.generoProfissional == "Outro" ? this.generoProfissionalTexto.trim() : this.generoProfissional,
                raca:           this.racaProfissional,
                especialidade:  this.especialidadeProfissional == "Outro" ? this.especialidadeProfissionalTexto.trim() : this.especialidadeProfissional,
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

        async excluirProfissional(){
            const url = `URL_NO_BACKEND/${this.idProfissional}`;

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