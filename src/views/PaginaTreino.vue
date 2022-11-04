<template>
    <!-- Página serve para editar valores do treino específico que o usuario clicou - ID -->
    <div class="max-w-screen-sm mx-auto px-4 py-10">
    
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 rounded-md shadow-md bg-light-grey"
    >
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <div v-if="dataLoaded">
      <!-- informações do treino -->
      <div
        class="flex flex-col items-center p-8 rounded-md shadow-md 
      bg-light-grey relative"
      >
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <div
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
        bg-success shadow-lg"
            @click="editMode"
          >
            <img class="h-3.5 w-auto" src="../assets/images/pencil-light.png" alt="" />
          </div>
         

          <div
            @click="deletaTreino"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
        bg-alert shadow-lg"
          >
          <img class="h-3.5 w-auto" src="../assets/images/trash-light.png" alt="" />
          </div>          
          <div
            @click="getData"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
        bg-white shadow-lg"
          >
          <img class="h-3.5 w-auto"  src="../assets/images/reload.svg" alt="" />
          </div>          
          
          <div   onclick="history.back()"
              class="h-7 w-7 rounded-full bg-white flex justify-center items-center cursor-pointer shadow-lg"
              
            >
              <img class="h-3.5 w-auto " src="../assets/images/voltar.svg" alt="" />
            </div>
        </div>

        <img
          class="h-24 w-auto"
          src="@/assets/images/img-treino.jpg"
          alt=""
        />

       
        <span
          class="mt-6 py-1.5 px-5 text-xl text-white bg-at-light-green
        rounded-lg shadow-md"
        >
          {{ data.nomeTreino }}
        </span>

        </div>
       

      <!-- exercicios -->
      <div
        class="mt-10 p-8 rounded-md flex flex-col item-center
      bg-light-grey shadow-md" v-for="(item, index) in dadosExercicios"
            :key="index"
      >
      
        <div class="flex flex-col gap-y-4 w-full">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-col"
            
          >
            <div v-if="dadosExercicios" class="flex flex-2 flex-col md:w-1/3">
              <img :src="item.foto">
              
                <p class="bg-success m-1 text-white text-center"  v-if="idFinalizado.includes(item.idexercicio)">Concluído!</p>
                <p class="bg-success m-1 text-white text-center"  v-if="duracaoExercicio.has(item.idexercicio)">Tempo: {{(duracaoExercicio.get(item.idexercicio)/60).toFixed(0)}} min {{duracaoExercicio.get(item.idexercicio)%60}}s</p>
                <router-link  :to="{ name: 'ExercicioEmExecucao', params: { exercicioId: item.idexercicio } }"
                class="bg-alert text-white text-center" v-if="!edit && dadosExercicios.length>0 && !idFinalizado.includes(item.idexercicio)" >INICIAR</router-link>
              
              <label for="" class="mb-1 text-sm text-at-light-green">
                
              </label>
              
              <p class="name">{{ item.nomeexercicio }}</p >
            </div>
            <div class="flex flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-at-light-green">
                Séries
              </label>
              <input
                v-if="edit"
                id="sets"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="number"
                v-model="item.serie"
              />
              <p v-else>{{ item.serie }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-at-light-green">
                Repetiçoes
              </label>
              <input
                v-if="edit"
                id="reps"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="number"
                v-model="item.repeticoes"
              />
              <p v-else>{{ item.repeticoes }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                Carga (Kg)
              </label>
              <input
                v-if="edit"
                id="weight"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="number"
                v-model="item.carga"
              />
              <p v-else>{{ item.carga }}</p>
              <button v-if="edit" @click="salvaEdicao(index)">Salvar</button>
            </div>
           
            <p v-if="edit"
              @click="deletaExercicio(index)"
              class="absolute h-3 rounded w-auto m-left-5 cursor-pointer text-alert">Excluir</p>
          </div>
            <div>

            </div>
            
          </div>
        </div>
        <div v-if="edit"
            class="h-7 m-3 w-7 rounded-full flex justify-center items-center cursor-pointer
        bg-success shadow-lg"
            @click="editMode"
          >
            <img class="h-3.5 w-auto" src="../assets/images/pencil-light.png" alt="" />
          </div>
        <AdicionarExercicio v-if="edit"></AdicionarExercicio>
        
  </div>
  </div>
</template>

<script>

import {supabase} from '../supabase/init'
import { useRoute, useRouter} from 'vue-router';
import store from '../store/index';
import { ref, computed } from 'vue';
import AdicionarExercicio from '../components/AdicionarExercicio.vue';

export default {
  components: { AdicionarExercicio },
    setup() {
        // variaveis
        const data = ref(null);
        const dadosExercicios = ref([]);
        const dataLoaded = ref(null);
        const errorMsg = ref(null);
        const statusMsg = ref(null);
        const route = useRoute();
        const router = useRouter();
        const user = computed(() => store.state.user);
        const edit = ref(null);

        // pega o id da rota corrente      
        const currentId = route.params.treinoId;
        let idFinalizado = computed(() => store.state.idFinalizado);
        let duracaoExercicio = computed(() => store.state.duracaoExercicio);

        
        //muda para modo edição:
        const editMode = () => {
            edit.value = !edit.value;
        };
       
          // Pegar dados da tabela Exercicios
        const getData = async () => {
            let { data: treinoexercicio } = await supabase
                .from("treinoexercicio")
                .select("*").eq("idTreino", currentId);
            data.value = treinoexercicio[0];
            dadosExercicios.value = treinoexercicio; // todo os itens do array
           
            dataLoaded.value = true;

         
            };
        //Salva as edições feitas nos exercicios
        const salvaEdicao = async (index) => {
            try {
                const { error } = await supabase
                    .from("Exercicio").update({ serie: dadosExercicios.value[index].serie, repeticoes: dadosExercicios.value[index].repeticoes, carga: dadosExercicios.value[index].carga })
                    .eq("id", dadosExercicios.value[index].idexercicio);
                if (error)
                    throw error;
                edit.value = false;
                statusMsg.value = "success";
                setTimeout(() => {
                    statusMsg.value = false;
                }, 4000);
            }
            catch (error) {
                errorMsg.value = `Erro: ${error.message}`;
                setTimeout(() => {
                    errorMsg.value = false;
                }, 3000);
            }
        };
        //pega os dados do database
        getData()

         // delete Treino

         const deletaTreino = async() =>{
          try {
            
              for(let i = 0;i<=dadosExercicios.value.length -1;i++){
                const { error } = await supabase.from('Exercicio').delete().eq('id', dadosExercicios.value[i].idexercicio)
                
              console.log(error)
              }
              const { error } = await supabase.from('Treino').delete().eq('id', currentId)
              if(error) throw error;
              router.push({name:'Home'})
            
          } catch (error) {
            errorMsg.value = `Erro: ${error.message}`
            setTimeout(() =>{
              errorMsg.value = false
            }, 3000)
          }
        }

        //Deleta Exercicio

        const deletaExercicio = async(index) =>{
          try {
            
              const { error } = await supabase.from('Exercicio').delete().eq('id', dadosExercicios.value[index].idexercicio)

              //corrige o erro de renderizar treino vazio
              if(dadosExercicios.value[index].idexercicio == null){
                deletaTreino()
              }
              //pega os dados do database
              getData()
                
              if(error) throw error;
            
          } catch (error) {
            errorMsg.value = `Erro: ${error.message}`
            setTimeout(() =>{
              errorMsg.value = false
            }, 3000)
          }
        }

       return { statusMsg, user, router, data, dataLoaded, errorMsg,
           dadosExercicios, edit, editMode, salvaEdicao,
            deletaTreino, deletaExercicio, idFinalizado, duracaoExercicio, getData
            };
    }
    
}
</script>

<style scoped>

  .name{
    
    font: 18px bold;
  }


</style>