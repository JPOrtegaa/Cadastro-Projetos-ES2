new Vue({
    el: '#tabela',
    template: `  
    <div class="container-fluid">
        <table class="table table-hover table-bordered align-middle m-0 text-center">
          <thead class="table-light">
            <tr style="width:100%">   
                <th style="width:10%;">ID</th>
                <th style="width:40%;">Nome</th>
                <th style="width:25%;">Especialidade</th>
                <th style="width:25%;">Opções</th>
            </tr>
          </thead>

          <tbody >
            <tr v-for="(item, index) in itens">
                <td>{{ item.id }}</td>
                <td>{{ item.nome }}</td>
                <td>{{ item.especialidade }}</td>
                <td>
                  <a :href="item.linkVisualizacao">
                    <button type="button" class="btn btn-primary m-0" >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                      </svg>
                      Visualizar
                    </button>
                  </a>
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
        itens:[]
      }
    },
    mounted:async function(){
      await this.getItens();
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
              id: data[i].idProfissional,
              nome: data[i].nomeProfissional,
              especialidade: data[i].especialidadeProfissional,
              linkEdicao: `/profissional/editar/${data[i].id}`,
              linkExclusao: `/profissional/remover/${data[i].id}`,
              linkVisualizacao: `/profissional/visualizar/${data[i].id}`
            }

            self.itens.push(obj);
          }
        });
      },
      
      }
  })