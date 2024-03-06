import { EventBus } from '../eventBus.js';
new Vue({
    el:'#caixaLateralBotoes',
    template:
        `
        <div class="col-2 lateral">
            <button type="button" class="btn btn-secondary mb-5 mt-5 btnLateral" @click="voltar"><i class="bi bi-arrow-left-circle"></i> Voltar</button>
            <button type="button" v-if="btnConfirma == true" class="btn btn-success mb-3 mt-4 btnLateral" @click="confirmar"><i class="bi bi-check-circle"></i> Confirmar</button>
            <button type="button" v-if="btnExclusao == true" class="btn btn-danger mb-2 mt-2 btnLateral" @click="excluir"><i class="bi bi-trash3"></i> Excluir</button>
        
            <button type="button" v-if="btnEditar == true" @click="editar" class="btn btn-warning btnLateral" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
              <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
            </svg>
            Editar
          </button>
        
            </div>
    
        `,
    data(){
        return {
            btnExclusao: false,
            btnConfirma: false,
            btnEditar: false
        }
    },
    mounted: function(){
        let tipo = window.location.pathname.split("/")[2]
            switch(tipo){
                case 'adicionar':
                    this.btnConfirma = true;
                    break;
                case 'editar':
                    this.btnConfirma = true;
                    this.btnExclusao = true;
                    break;
                case 'remover':
                    this.btnExclusao = true;
                    break;
                case 'visualizar':
                    this.btnEditar = true;
                    break;
            }
    },

    methods:{
        voltar(){
            let path = window.location.pathname.split('/')[1];
            let link = window.location.origin
            switch (path){
                case "time":
                    link += "/listarTimes";
                    break;
                case "profissional":
                    link += "/listarProfissionais";
                    break;
                case "projeto":
                    link += "/listarProjetos";
                    break;
            }
            window.location = link
        },
        confirmar(){
            // Emite um sinal para verificar se os campos estão válidos
            EventBus.$emit('confirmarCriacaoEdicao');
        },
        excluir(){
            if (confirm("Deseja excluir?") == true){
                EventBus.$emit('excluir');
            }
        },
        editar(){
            console.log(window.location)
            window.location.href = window.location.href.replace('visualizar','editar')
        }
    }





})