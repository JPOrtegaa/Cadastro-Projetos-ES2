import { EventBus } from '../eventBus.js';
new Vue({
    el:'#caixaLateralBotoes',
    template:
        `
        <div class="col-2 lateral">
            <button type="button" class="btn btn-secondary mb-5 mt-5 btnLateral" @click="voltar"><i class="bi bi-arrow-left-circle"></i> Voltar</button>
            <button type="button" class="btn btn-success mb-3 mt-4 btnLateral" @click="confirmar"><i class="bi bi-check-circle"></i> Confirmar</button>
            <button type="button" class="btn btn-danger mb-2 mt-2 btnLateral" @click="excluir"><i class="bi bi-trash3"></i> Excluir</button>
        </div>
    
        `,
    data(){
        return {

        }
    },
    methods:{
        voltar(){
            window.location.href = "/"
        },
        confirmar(){
            // Emite um sinal para formularioProfissional.js verificar se os campos estão válidos
            EventBus.$emit('confirmarCriacaoEdicaoProfissional');
        },
        excluir(){
            if (confirm("Deseja excluir?") == true){
                EventBus.$emit('excluirProfissional');
            }
        }
    }





})