<template>

    
        <!-- Lista de exercicios -->
  <div class="flex flex-col">
                <h1 class="text-center">Escolha um exercício abaixo para adicionar ao seu treino</h1>
                <br/>
               
                    <br/>
                    <!-- LISTA de EXERCICIOS NO TREINO -->
                    <ul >
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8 rounded-md shadow-md 
      bg-at-green relative">
                            <li @click="setExercicioMarcado(exercicio)" v-for="(exercicio, index) in listaExerciciosDB" :key="index">
                             {{exercicio.nome}}
                            <img :src="exercicio.imgUrl" alt="">
                            <small>{{exercicio.descricao}}</small>
                        </li>  
                        </div>                 
                    </ul> 
                    <button
        v-if="exercicioMarcado"
        @click="adicionarExercicio"
        type="button"
        class="btn-add animate__backInLeft py-2 px-6 rounded-sm self-start text-sm text-white
        bg-at-light-green duration-200 border-solid border-2 border-transparent
        hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        >
        Add exercício selecionado
      </button>
             
    </div>
    
  
                
</template>

<script>
import 'animate.css'
import {useRoute} from 'vue-router'
import store from '../store/index';
import {computed} from 'vue'
import { v4 as uuidv4 } from 'uuid';
import {supabase} from '../supabase/init'

export default {

    setup(){
        
        const route = useRoute();
        const listaExerciciosDB = computed(() => store.state.listaExerciciosDB)
        const exercicioMarcado = computed(() => store.state.exercicioMarcado)
        const setExercicioMarcado = store.methods.setExercicioMarcado
        const lista = store.methods.getListaDeExercicios
        const idTreino = route.params.treinoId;

        /* const onload = ()=>{
            lista()
        } */

    const adicionarExercicio = async() =>{
          

          try {
            alert(`O exercício "${exercicioMarcado.value.nome}" será adicionado ao seu treino!`)
            const { error } = await supabase
                .from('Exercicio')
                .insert([
                    { id: uuidv4(), nome: exercicioMarcado.value.nome, foto: exercicioMarcado.value.imgUrl
                        , descricao: exercicioMarcado.value.descricao, fk_idTreino: idTreino}
                ])
                
                if(error) throw error
                setExercicioMarcado(null)
            
          } catch (error) {
            console.warn(error)
          }

          
        }
        lista()
    
        return {listaExerciciosDB, exercicioMarcado, setExercicioMarcado, adicionarExercicio, idTreino}
    }



}
</script>

<style>


.btn-add{
  
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 9999;
  border: none;
  outline: none;
  background-color: red;
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 10px;
  animation: swing; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 4s; /* don't forget to set a duration! */
}
li{cursor: pointer;}

.btn-add:hover {
  background-color: #555;
}


.text-center{
    font: 1.3rem bold;
    border: 1px black solid;
}

</style>