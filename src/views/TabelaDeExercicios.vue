<template>
    <div class="content">   
 
     
    <table class="rTable">
     <th>Data</th>
     <th>Exercício</th>
     <th>Carga</th>
     <th>Repetições</th>
     <th>Séries</th>
     <th>Duração (m)</th>
 
     <tr v-for="(ele, index) in dados" :key="index">
     <td>{{dateTime(ele.data)}}</td>
     <td>{{ele.nome}}</td>
     <td>{{ele.carga}}</td>
     <td>{{ele.repeticoes}}</td>
     <td>{{ele.serie}}</td>
     <td>{{(ele.duracao/60).toFixed(0)}} m {{ele.duracao%60}}s</td>
     </tr>
    
    </table>
 </div>
   
 </template>
 
 <script>

 
 import store from '../store/index';
 import { computed, ref} from 'vue';
 import {supabase} from '../supabase/init'
 import moment from 'moment';
 export default {
 
setup(){
    const user = computed(() => store.state.user);
     const userId = user.value.id
     let dados = ref(null)

     const dateTime =(valor)=> {
       return moment(valor).format('DD/MM/YYYY');
     }
   

 
     const getData = async () =>{
         let { data: Avaliacao, error } = await supabase.from('ExercicioFeito').select("*").eq('id_usuario', userId)
         dados.value = Avaliacao
 
     if(error) throw error
 
 }
 
  getData()
 
 

    return{dateTime, getData, dados}
}}
 
 
 
 
 </script>
 
 
 <style scoped>

*{margin:0; padding: 0; box-sizing: border-box;}

.content{display:flex; margin: auto;}

.rTable{width: 100%; text-align: center;}
    .rTable thead{background: black; font-weight: bold; color:#fff;}
    .rTable tbody tr:nth-child(2n){background: #ccc;}
    .rTable th , .rTable td{padding: 7px 0;}

@media screen and (max-width: 480px){
    .content{width: 94%;}

    .rTable thead{display:none;}
    .rTable tbody td{display: flex; flex-direction: column; }
}

@media only screen and (min-width: 1200px){
    .content{width:100%;}
    .rTable tbody tr td:nth-child(1){width:10%;}
    .rTable tbody tr td:nth-child(2){width:30%;}
    .rTable tbody tr td:nth-child(3){width:20%;}
    .rTable tbody tr td:nth-child(4){width:10%;}
    .rTable tbody tr td:nth-child(5){width:30%;}
}
 
 </style>