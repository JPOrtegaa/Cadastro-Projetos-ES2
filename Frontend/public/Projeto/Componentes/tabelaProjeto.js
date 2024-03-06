import { EventBus } from '../../eventBus.js';
new Vue({
    el: '#tabela',
    template: `  
    <div class="container-fluid">
        <table class="table table-hover table-bordered align-middle m-0 text-center">
          <thead class="table-light">
            <tr style="width:100%">   
                <th style="width:20%;">ID</th>
                <th style="width:50%;">Nome</th>
                <th style="width:30%;">Opções</th>
            </tr>
          </thead>

          <tbody >
            <tr v-for="(item, index) in itens">
                <td>{{ item.id }}</td>
                <td>{{ item.nome }}</td>
                <td> 
                  <a :href="item.linkEdicao">
                    <button type="button" class="btn btn-warning m-0" >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                      Editar
                    </button>
                  </a>

                  <a :href="item.linkExclusao">
                    <button class="btn btn-danger" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>

                      Excluir

                    </button>
                  </a>



                </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,

    data(){
      return {
        itens:[],
        numResultados: '',
        ordem: '',
        ordenacaoSelecionada:'',
        itensPorPagina: '',
        tipo: '',
        itensSelecionados:[]
      }
    },
    mounted:async function(){
      let urlParams = new URLSearchParams(window.location.search);
      await this.getItens();

      // Atualiza o textinho antes da tabela que mostra ao usuário a quantidade de itens por págia e a ordem em que estão sendo exibidos
      this.itensPorPagina  = urlParams.get("contagem");
      let ordem = urlParams.get("ordem");
      switch (ordem){
          case '-id': this.ordenacaoSelecionada = 'ID decrescente'; break;
          case '+id': this.ordenacaoSelecionada = 'ID crescente'; break;
          case '-name': this.ordenacaoSelecionada = 'Título decrescente'; break;
          case '+name': this.ordenacaoSelecionada = 'Título crescente'; break;
      }

    },

    methods:{
      async getItens() {

        let url = "http://localhost:3000/getTesteProfissionais"

        // Armazena 'this' em uma variável para uso dentro da função de callback
        let self = this;

        axios.get(url).then(async (response) => {
          let data = response.data;

          for (let i = 0; i < data.length; i++) {
            let obj = {
              id: data[i].id,
              nome: data[i].nome,
              linkEdicao: `/projeto/editar/${data[i].id}`,
              linkExclusao: `/projeto/remover/${data[i].id}`
            }

            self.itens.push(obj);
          }
          EventBus.$emit('atualizarNumResultados', data.length);
        });
      },
      }
  })