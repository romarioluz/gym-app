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
    <table class="border-collapse border border-slate-500">

  <thead>
    <tr>
      <th colspan="3">Veja a interpretação do IMC</th>
    </tr>
    <tr class="table-calc-blue">
      <th class="border border-slate-600">IMC</th>
      <th class="border border-slate-600">Classificação</th>
      <th class="border border-slate-600">Obesidade <small>(grau)</small></th>
    </tr>
  </thead>

  <tbody>						
    
    
    <tr id="result_calc_0">
      <td class="border border-slate-700">Menor que 18,5</td>
      <td class="border border-slate-700">Magreza</td>
      <td class="border border-slate-700" style="text-align: center">0</td>
    </tr>
    
    <tr >
      <td class="border border-slate-700">Entre 18,5 e 24,9</td>
      <td class="border border-slate-700">Normal</td>
      <td class="border border-slate-700" style="text-align: center">0</td>
    </tr>
    
    <tr id="result_calc_2">
      <td class="border border-slate-700">Entre 25,0 e 29,9</td>
      <td class="border border-slate-700">Sobrepeso</td>
      <td class="border border-slate-700" style="text-align: center">I</td>
    </tr>
    
    <tr id="result_calc_3">
      <td class="border border-slate-700">Entre 30,0 e 39,9</td>
      <td class="border border-slate-700">Obesidade</td>
      <td class="border border-slate-700" style="text-align: center">II</td>
    </tr>
    

    <tr id="result_calc_4">
      <td class="border border-slate-700">Maior que 40,0</td>
      <td class="border border-slate-700">Obesidade Grave</td>
      <td class="border border-slate-700" style="text-align: center">III</td>
    </tr>
    
    
  </tbody>
  
</table>
<small> Fonte: https://www.programasaudefacil.com.br/calculadora-de-imc</small>
        
        
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
table{
  align-self: center;
}

th{
  background-color: #7c3aed;
  font: 1rem;
  color: white;
}
td{
  background-color: #f5f3ff;
  font: 1rem;
  width:200px
  
}
table{
  width: 500px;
}
</style>