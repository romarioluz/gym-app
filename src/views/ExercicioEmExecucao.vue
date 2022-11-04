<template>
  <div v-if="data">

    <div class="flex flex-col md:flex-row md:w-1/3">
      <img :src="data.foto">
      <label for="" class="mb-1 text-sm text-at-light-green">               
      </label>
      
        <div>
          <p class="text-center">{{stopwatch.isRunning.value ? 'Em execução' : 'Parado'}}:</p>
          <p class="h-10 m-3 py-3 rounded px-3 text-center text-xl text-white bg-alert shadow-md">0{{stopwatch.minutes}}:{{stopwatch.seconds}}</p>
            
        </div>
        <button v-if="!finalizado" class=" h-10 m-3 py-3 rounded px-3 text-center text-xs text-white bg-indigo shadow-md  " @click="stopwatch.start()">Iniciar</button>
        <button v-if="!finalizado" class="h-10 m-3 py-3 rounded px-3 text-center text-xs text-white bg-indigo shadow-md " @click="stopwatch.pause()">Pausa</button>
        <button v-if="!finalizado" class="h-10 m-3 py-3 rounded px-3 text-center text-xs text-white bg-indigo shadow-md " @click="stopwatch.reset()">Zerar</button>
        <button v-if="!finalizado" class="h-10 m-3 py-3 rounded px-3 text-center text-xs text-white bg-indigo shadow-md " @click="finalizaExercicio">Finzalizar</button>
        
      </div>
      <div class="flex flex-2 flex-col md:w-1/3">
        
      </div>
      <h1 class="text-xl text-center">{{ data.nome }}</h1 >
            <div class="flex text-center flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-at-light-green">
                Séries
              </label>
              
              <p class="text-center">{{ data.serie }}</p>
            </div>
            <div class="flex text-center flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-at-light-green">
                Repetiçoes
              </label>
              
              <p class="text-center">{{ data.repeticoes }}</p>
            </div>
            <div class="flex text-center flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                Carga (Kg)
              </label>
              <p class="text-center">{{ data.carga }}</p>
             
            </div>
            <button class="h-10 m-3 py-3 rounded px-3 text-center text-xs text-white bg-at-light-green shadow-md "
             onclick="history.back()"
             >Voltar</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStopwatch } from 'vue-timer-hook';
import {supabase} from '../supabase/init'
import { useRoute} from 'vue-router';
import store from '../store/index';
import { ref, computed } from 'vue';

export default {

 
  setup(){

    //variaveis
    let data = ref(null);
    //const dadosExercicios = ref([]);
    const dataLoaded = ref(null);
    const finalizado = ref(false)

    
    //const errorMsg = ref(null);
   // const statusMsg = ref(null);
    const route = useRoute();
    //const router = useRouter();
    const user = computed(() => store.state.user);
        //const edit = ref(null);

    

        // get current id of route      
      const currentId = route.params.exercicioId;

      // Pegar dados da tabela Exercicios
      const getData = async () => {
            let { data: exercicio } = await supabase
                .from("Exercicio")
                .select("*").eq("id", currentId);
            data.value = exercicio[0];
            console.log(data.value)
        
          /* dadosExercicios.value = treinoexercicio; // todo os itens do array */
           
            dataLoaded.value = true;
        };

        // Cronometro
        const autoStart = false;
        const stopwatch = useStopwatch(autoStart);

        //Finalizar exercicio
        const finalizaExercicio = async() =>{

          //tempo de treino em segundos
          let duracao = stopwatch.minutes.value*60 + stopwatch.seconds.value

          console.log(duracao)
          try {
            const { error } = await supabase
            .from('ExercicioFeito')
            .insert([
            {'nome': data.value.nome, 
            'serie': data.value.serie, 
            'carga': data.value.carga, 
            'repeticoes': data.value.repeticoes, 
            'duracao': duracao, 
            'id_usuario': user.value.id, 
            'id_exercicio': data.value.id,
            'grupoMuscular':data.value.grupoMuscular,
            }
  ])

            if(error) throw error 

            console.log("Exercicio finalizado com sucesso")
            finalizado.value = true
            stopwatch.pause()
            store.state.idFinalizado.push(currentId)
            store.state.duracaoExercicio.set(currentId, duracao)
          } catch (error) {

            console.warn(error)
            
          }
        }
        

        getData()

        
        
        return {getData, data, stopwatch, defineComponent, finalizaExercicio, finalizado
        }
  }

}
</script>

<style>

</style>