<template>

    <div v-if="dataLoaded" class="container mt-10 px-4">
     <!-- No Data -->
     
     <div  v-if="data.length === 0" class="w-full flex flex-col items-center">
        <h1 class="text-2xl">Está vazio...</h1>
        <router-link
        class="mt-6 py-2 px-6 rounded-sm  text-sm
        text-white bg-at-light-green duration-200 border-solid
        border-2 border-transparent hover:border-at-light-green hover:bg-white
        hover:text-at-light-green"
        :to="{ name: 'CriarAvaliacao' }"
        >Adicionar avaliação</router-link
        >
    </div>
    
    <!-- Data -->
    <div
    v-else
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    
    >
    <router-link
      class="mt-6 self-center h-10 text-center py-3 px-3 text-xs text-white bg-at-light-green shadow-md"
      :to="{ name: 'CriarAvaliacao' }"
      >Adicionar avaliação</router-link>
    
    <div
        class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
        v-for="(avaliacao, index) in data"
        :key="index"
      >
        <!-- Cardio Img -->
        <h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
         Data da Avaliação: {{ dateTime(avaliacao.data)}}
        </h1>
        <p
          class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md "
        >
          Altura: {{ avaliacao.altura }} m
        </p>
        <p
          class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md "
        >
          Peso: {{ avaliacao.peso }} Kg
        </p>
        <p
          class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md "
        >
          IMC: {{ avaliacao.imc.toFixed(1) }}
        </p>
        <p
          class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md "
        >
         Gordura Corporal: {{ avaliacao.gorduraCorporal }}%
        </p>

       
      </div>
    </div>
        
        
    </div>


</template>

<script>
    import { ref } from 'vue';
    import {supabase} from '../supabase/init'
    import moment from 'moment';
export default {
    name:"Avaliacao",
    setup(){
         //create data / vars
    const data = ref([])
    const dataLoaded = ref(null)

    const dateTime =(valor)=> {
      return moment(valor).format('DD/MM/YYYY');
    }

    const getData = async () =>{
      try {
       
        const {data: avaliacao, error} = await supabase.from("Avaliacao").select("*")
        if(error) console.log(error);
        data.value = avaliacao;
        dataLoaded.value = true;
       
        
      } catch (error) {
        console.warn(error.message)
      }
    };

    //run data function
    getData()

    return { data, dataLoaded, dateTime }

   },
}

</script>

<style>

</style>